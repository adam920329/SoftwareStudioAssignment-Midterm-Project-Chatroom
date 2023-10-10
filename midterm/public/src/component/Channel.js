import {
    Grid,
    Divider,
} from '@material-ui/core'

import Channelitem from './Channelitem';

class Channel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { myRoomlist, handleChangeChannel } = this.props;
        return (
            <Grid container direction="column" alignItems='center'  style={{ height: '100%' }}>
                <Grid item id="channel_col1" >
                    <span id="chatroom_name">{"chatroom name"}</span>
                </Grid>
                <Grid item id="channel_col2">
                    {
                        myRoomlist.map((value, index) => {
                            return (
                                <Channelitem
                                    value={value}
                                    key={index}
                                    channelname={this.props.ChannelName}
                                    handleChangeChannel={handleChangeChannel}
                                />
                            )
                        })
                    }
                </Grid>
            </Grid>
        );
    }
}
export default Channel;