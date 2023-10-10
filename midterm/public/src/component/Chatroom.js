import {
    Grid,
    Divider,
} from '@material-ui/core'

import Channel from './Channel'
import Profile from './Profile'
import Chatbox from './Chatbox'


class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ChannelNow: 'public',
            ChannelName: 'public',
            Channellist: [],
            Chatlist: [],
        }
        this.handleChangetxt();
        this.handleChannellist();
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

    handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                // Signed in
                this.chrome_notification("Success Logout");
                this.props.myWindowChange("LogIn");
            })
            .catch(() => {
                // Signed in
                this.chrome_notification('error: ' + error.message);
            })
    }

    handleChannellist = () => {
        firebase.database().ref('/User_list/' + firebase.auth().currentUser.uid).once("value", (snapshot) => {
            this.setState({
                Channellist: snapshot.val().channel,
            })
        })
    }

    handleCreate = () => {
        var name = window.prompt("write your chatroom name");
        if (name != null) {

            var list = {
                chatlist: [],
                name: name,
            };
            var initdata = {
                username: "",
                txt: "",
            }

            firebase.database().ref('/Channel_list').push(list)
                .then((data) => {
                    firebase.database().ref('/Channel_list/' + data.key + "/chat_list").push(initdata);
                    var key = data.key;
                    firebase.database().ref('/User_list').child(firebase.auth().currentUser.uid).once("value", (snapshot) => {
                        var channel = [];
                        channel = snapshot.val().channel;
                        channel.push(key);
                        firebase.database().ref('/User_list').child(firebase.auth().currentUser.uid).update({
                            channel: channel
                        });
                    })
                    var templist = this.state.Channellist;
                    templist.push(key)
                    this.setState({
                        Channellist: templist,
                    })
                })
                .catch((error) => {
                    this.chrome_notification('error: ' + error.message);
                })
            this.handleChangetxt();
        }
    }

    handleinvite = () => {
        var name = window.prompt("write your friend email");
        if (name != null) {
            firebase.database().ref('/User_list').once("value", (snapshot) => {
                for (var data in snapshot.val()) {
                    this.handlefinduid(data, name);
                    console.log(find);
                }
            })
        };
    }
    handlefinduid = (data, name) => {
        firebase.database().ref('/User_list/' + data + '/email').once("value", (snapshot1) => {
            if (snapshot1.val() == name) {
                var uid = data;
                find = true;
                console.log(uid);
                firebase.database().ref('/User_list/' + uid + '/channel').once("value", (snapshot2) => {
                    var havejoin = false;
                    var channel = [];
                    channel = snapshot2.val();
                    for (var id = 0; id < channel.length; id++) {
                        if (this.state.ChannelNow == channel[id]) havejoin = true;
                    }

                    if (!havejoin) {
                        channel.push(this.state.ChannelNow);
                        firebase.database().ref('/User_list').child(uid).update({
                            channel: channel
                        });
                        this.chrome_notification("Success invited");

                        var data = {
                            txt: name + " join the chat room!",
                            username: "system"
                        }
                        firebase.database().ref('/Channel_list/' + this.state.ChannelNow + '/chat_list').push(data);
                        this.handleChangetxt();
                    } else {
                        this.chrome_notification("this person have been joined");
                    }
                })
            }
        })
    }




    handleChangeChannel = (dist, name) => {
        firebase.database().ref('/Channel_list/' + dist + '/chat_list').once("value", (snapshot) => {
            var chatlist = [];
            for (var message in snapshot.val()) {
                firebase.database().ref('/Channel_list/' + dist + '/chat_list/' + message).once("value", (snapshot) => {
                    chatlist.push(snapshot.val());
                    this.setState({
                        Chatlist: chatlist,
                    })
                })
            }
        })
        this.setState({
            ChannelNow: dist,
            ChannelName: name,
        })
    }

    handleChangetxt = () => {
        firebase.database().ref('/Channel_list/' + this.state.ChannelNow + '/chat_list').once("value", (snapshot) => {
            var chatlist = [];
            for (var message in snapshot.val()) {
                firebase.database().ref('/Channel_list/' + this.state.ChannelNow + '/chat_list/' + message).once("value", (snapshot) => {
                    chatlist.push(snapshot.val());
                    this.setState({
                        Chatlist: chatlist,
                    })
                })
            }
        })
    }

    render() {
        return (
            <Grid container direction="row" style={{ height: '100vh', width: '100%', padding: '0px', margin: '0px' }} >
                <Grid item id="leftside" lg={3} md={4} sm={5} xs={12}>
                    <Grid container direction="column" style={{ height: '100vh' }}>
                        <Grid item id="mid_col1">
                            <Profile />
                        </Grid>
                        <Grid item id="mid_col2">
                            <Channel
                                myRoomlist={this.state.Channellist}
                                handleChangeChannel={this.handleChangeChannel}
                            />
                        </Grid>
                        <Grid item id="mid_col3">
                            <button class="chatbtn" id="btnLogout" onClick={() => {
                                this.handleLogout();
                            }}>Log out</button>
                            <button class="chatbtn" id="btnCreate" onClick={() => {
                                this.handleCreate();
                            }}>Create</button>
                            <button class="chatbtn" id="btnJoin" onClick={() => {
                                this.handleinvite();
                            }}>invite</button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item id="rightside" lg={9} md={8} sm={7} xs={12}>
                    <Chatbox
                        username={firebase.auth().currentUser.displayName}
                        handleChangetxt={this.handleChangetxt}
                        ChannelNow={this.state.ChannelNow}
                        Chatlist={this.state.Chatlist}
                        ChannelName={this.state.ChannelName}
                    />
                </Grid>

            </Grid >
        );
    }
}
export default Chatroom;