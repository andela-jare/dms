import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
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
      <div>
        <Link to='/login'><FlatButton {...this.props} label="Login" /></Link>
        <Link to='/signup'><FlatButton {...this.props} label="Sign Up" /></Link>
      </div>
    );
  }
}

const Logged = (props) => (
  <IconMenu
    iconStyle={props.iconStyle}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh"/>
    <MenuItem primaryText="Help"/>
    <MenuItem primaryText="Sign out" onTouchTap={props.handleLogout}/>
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
    event.stopPropagation();
    this.props.userActions.logout();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.login) {
      browserHistory.push('/');
    }
  }

  render() {
    const titleStyle = {
      textDecoration: 'none',
      color: 'white'
    };

    return (
      <div>
        <AppBar
          title={<Link to="/" style={ titleStyle }>DMS</Link>}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={
            this.props.login ?
            <Logged handleLogout={this.handleLogout}/> :
            <Login />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let login = state.login;
  if (localStorage.token) {
    login = true;
  }
  return {
    login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarComposition);
