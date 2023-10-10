import {
    Grid,
    Divider,
} from '@material-ui/core'

class Profile extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Grid container direction="column" justifyContent='space-evenly' alignItems='center' style={{ height: '100%' }}>
                <Grid item id="profile_col1" >
                    <img src="https://v4.tocas-ui.com/zh-tw/assets/images/user.png" id="img"></img>
                </Grid>
                <Grid item id="profile_col2" >
                    <p id="displayname">{"displayname : " + firebase.auth().currentUser.displayName}</p>
                </Grid>
                <Grid item id="profile_col3" >
                    <p id="email">{"email : " + firebase.auth().currentUser.email}</p>
                </Grid>
            </Grid>
        );
    }
}
export default Profile;