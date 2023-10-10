import {
    Grid,
    Divider,
} from '@material-ui/core'

import Chatboxitem from './Chatboxitem'

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatlist: [],
        }
    }


    handlesendtxt = () => {
        var txt = document.getElementById("chattxt");
        if (txt.value != "") {
            var data = {
                txt: txt.value,
                username: firebase.auth().currentUser.displayName
            }
            firebase.database().ref('/Channel_list/' + this.props.ChannelNow + '/chat_list').push(data);
            txt.value = "";
            this.props.handleChangetxt();
        }
    };

    render() {

        const { Chatlist, ChannelNow, ChannelName } = this.props;
        return (
            <Grid container direction="column" style={{ height: '100vh' }}>
                <Grid item id="chatbox_col1">
                    <p id="channel-name">{ChannelName}</p>
                </Grid>
                <Grid item id="chatbox_col2">
                    {
                        Chatlist.map((value, index) => {
                            if (value.txt != "") {
                                return (
                                    <Chatboxitem
                                        data={value}
                                        key={index}
                                    />
                                )
                            }
                        })
                    }
                </Grid>
                <Grid item id="chatbox_col3">
                    <input id="chattxt" type="text" name="txt" placeholder="Write your message" required=""></input>
                    <input id="btnsend" type="button" onClick={() => {
                        this.handlesendtxt();
                    }}></input>
                </Grid>
            </Grid>
        );
    }
}
export default Chatbox;