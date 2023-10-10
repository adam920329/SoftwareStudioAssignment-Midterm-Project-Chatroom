import {
    Grid,
    Divider,
} from '@material-ui/core'

class Chatboxitem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        if (data.username == firebase.auth().currentUser.displayName) {
            return (
                <Grid id="myuser-container" container direction="row" wrap="nowrap">
                    <Grid id="myuser_message_grid">
                        <p id="myuser_name_txt"><b><i>{data.username}</i></b></p>
                        <Grid id="myuser_name_grid">
                            <p id="myuser_message_txt">{data.txt}</p>
                        </Grid>
                    </Grid>
                    <Grid id="myuser_circle"></Grid>
                </Grid >
            );
        } else if (data.username == "system") {
            return (
                <Grid id="system-container" container direction="row" wrap="nowrap">
                    <Grid id="system_message_grid">
                        <p id="system_txt"><b><i>{data.txt}</i></b></p>
                    </Grid>
                </Grid >
            );
        } else {
            return (
                <Grid id="otheruser-container" container direction="row" wrap="nowrap">
                    <Grid id="otheruser_circle"></Grid>
                    <Grid id="otheruser_message_grid">
                        <p id="otheruser_name_txt"><b><i>{data.username}</i></b></p>
                        <Grid id="otheruser_name_grid">
                            <p id="otheruser_message_txt">{data.txt}</p>
                        </Grid>
                    </Grid>
                </Grid >
            );
        }
    }
}
export default Chatboxitem;