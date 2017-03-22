import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import * as userActions from '../../actions/users';

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" onClick={props.onClick}/>
  </IconMenu>
);

Logged.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class AppBarComposition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: this.props.login,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange = (event, logged) => {
    this.setState({ logged: this.props.login });
  };

  handleLogout(event) {
    event.preventDefault();
    this.props.userActions.logout();
  }

  render() {
    return (
      <div>
        <AppBar
          title="DMS"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={this.props.login ? <Logged onClick={this.handleLogout}/> : <Login />}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComposition);
