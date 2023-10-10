import {
    Grid,
    Divider,
} from '@material-ui/core'

class Channelitem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
        this.handleSetName();
    }

    handleSetName = () => {
        firebase.database().ref('/Channel_list/' + this.props.value + '/name').on("value", (snapshot) => {

            this.setState({
                name: snapshot.val(),
            })
        })
    }

    render() {
        const { value, handleChangeChannel } = this.props;
        return (
            <Grid container direction="row" justifyContent="space-around" wrap="nowrap" sx={{ mx: '0', width: "100%" }}>
                <button id="channelbutton"
                    onClick={() => {
                        handleChangeChannel(value, this.state.name)
                    }}
                >{this.state.name}</button>
            </Grid >
        );
    }
}
export default Channelitem;