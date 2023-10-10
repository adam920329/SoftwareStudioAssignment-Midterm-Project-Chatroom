import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Box,
    Paper,
    Button,
} from '@material-ui/core'


var provider = new firebase.auth.GoogleAuthProvider();

class LogIn extends React.Component {
    constructor(props) {
        super(props);
    }

    chrome_notification = (txt) => {
        var notifyConfig = {
            body: txt,
        };

        if (Notification.permission === 'default' || Notification.permission === 'undefined') {
            Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                    // 使用者同意授權
                    var notification = new Notification("Notice", notifyConfig); // 建立通知
                }
            });
        } else {
            var notification = new Notification("Notice", notifyConfig);
        }
    }

    handleSignup = () => {
        var SignupEmail = document.getElementById('SignupEmail');
        var SignupPassword = document.getElementById('SignupPassword');
        var SignupName = document.getElementById('SignupName');
        var email = SignupEmail.value;
        var password = SignupPassword.value;
        var name = SignupName.value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((e) => {
                this.chrome_notification("Sucess Signup");
                SignupEmail.value = '';
                SignupPassword.value = '';
                SignupName.value = '';
                e.user.updateProfile({
                    displayName: name,
                })
                firebase.database().ref('/User_list').child(firebase.auth().currentUser.uid).update({
                    email: email,
                    displayName: name,
                    uid: firebase.auth().currentUser.uid,
                    channel: ["public"]
                });
            })
            .catch((error) => {
                this.chrome_notification('error: ' + error.message);
                SignupEmail.value = '';
                SignupPassword.value = '';
                SignupName.value = '';
            });
    }

    handleLogin = () => {
        var LoginEmail = document.getElementById('LoginEmail');
        var LoginPassword = document.getElementById('LoginPassword');
        var email = LoginEmail.value;
        var password = LoginPassword.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((e) => {
                // Signed in
                this.chrome_notification("Sucess Login");
                LoginEmail.value = '';
                LoginPassword.value = '';
                this.props.myWindowChange("Chatroom")
            })
            .catch((error) => {
                // Signed in
                this.chrome_notification('error: ' + error.message);
                LoginEmail.value = '';
                LoginPassword.value = '';
            });
    }

    handleGoogle = () => {
        console.log('signInWithPopup');
        firebase.auth().signInWithPopup(provider)
            .then((e) => {
                firebase.database().ref('/User_list/' + firebase.auth().currentUser.uid).once("value", (snapshot) => {
                    if (snapshot.exists()) {
                        this.chrome_notification("Sucess Login and welcome back");
                        this.props.myWindowChange("Chatroom")
                    } else {
                        this.chrome_notification("Sucess Login and first Login");
                        firebase.database().ref('/User_list').child(e.user.uid).update({
                            email: firebase.auth().currentUser.email,
                            displayName: firebase.auth().currentUser.displayName,
                            uid: firebase.auth().currentUser.uid,
                            channel: ["public"]
                        });
                        this.props.myWindowChange("Chatroom")
                    }
                })
            }).catch((error) => {
                this.chrome_notification('error: ' + error.message);
            });
    }


    render() {

        return (
            <Grid container direction="row" justifyContent="center" alignContent='center' style={{ height: "100vh" }} >
                <Grid item >


                    <div class="main">
                        <input type="checkbox" id="chk" aria-hidden="true" ></input>
                        <div class="signup">
                            <Grid>
                                <label for="chk" aria-hidden="true">Sign up</label>
                                <input id="SignupName" type="text" name="txt" placeholder="User name" required=""></input>
                                <input id="SignupEmail" type="email" name="email" placeholder="Email" required=""></input>
                                <input id="SignupPassword" type="password" name="pswd" placeholder="Password" required=""></input>
                                <button id="btnSignUp" onClick={() => {
                                    this.handleSignup();
                                }}>Sign up</button>
                            </Grid>
                        </div>

                        <div class="login">
                            <Grid>
                                <label for="chk" aria-hidden="true">Login</label>
                                <input id="LoginEmail" type="email" name="email" placeholder="Email" required=""></input>
                                <input id="LoginPassword" type="password" name="pswd" placeholder="Password" required=""></input>
                                <button id="btnLogin" onClick={() => {
                                    this.handleLogin();
                                }}>Login</button>
                                <button id="btngoogle" onClick={() => {
                                    this.handleGoogle();
                                }}>Login with Google</button>
                            </Grid>
                        </div>
                    </div>

                </Grid>
            </Grid>
        );
    }
}

/*function initApp() {
    var SignupEmail = document.getElementById('SignupEmail');
    var SignupPassword = document.getElementById('SignupPassword');
    var SignupName = document.getElementById('SignupName');
    var LoginEmail = document.getElementById('LoginEmail');
    var LoginPassword = document.getElementById('LoginPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignUp');

    // SIGN UP
    btnSignUp.addEventListener('click', function (e) {
        var email = SignupEmail.value;
        var password = SignupPassword.value;
        var name = SignupName.value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((e) => {
                console.log("sucess");
                SignupEmail.value = '';
                SignupPassword.value = '';
                SignupName.value = '';
            })
            .catch((e) => {
                console.log("failed");
                SignupEmail.value = '';
                SignupPassword.value = '';
                SignupName.value = '';
            });
    });

    btnLogin.addEventListener('click', function (e) {
        var email = LoginEmail.value;
        var password = LoginPassword.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((e) => {
                // Signed in
                console.log("sucess");
                LoginEmail.value = '';
                LoginPassword.value = '';
            })
            .catch((e) => {
                // Signed in
                console.log("failed");
                LoginEmail.value = '';
                LoginPassword.value = '';
            });
    });
}

window.onload = function () {
    initApp();
};*/

export default LogIn;