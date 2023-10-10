import {
    Grid,
    Divider,
} from '@material-ui/core'

import Chatroom from './public/src/component/Chatroom'
import LogIn from './public/src/component/LogIn'

export class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "LogIn",
        }
    }
    WindowChange = (dist) => {
        this.setState(
            {
                page: dist,
            }
        )
    }
    render() {
        if (this.state.page == "LogIn") {
            return (
                <LogIn myWindowChange={this.WindowChange} setUser={this.setUser} />
            );
        } else if (this.state.page == "Chatroom") {
            return (
                <Chatroom
                    myWindowChange={this.WindowChange}
                />
            );
        }
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));