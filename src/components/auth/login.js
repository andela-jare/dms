import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextFieldControlled from '../input/textField';
import * as userActions from '../../actions/users';
import DialogPrompt from '../alert/prompt';

const style = {
  margin: 12
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: '',
        password: ''
      },
      validationError: false,
      open: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.userActions.login(this.state.fields);
  }

  componentWillMount() {
    if (localStorage.token) {
      browserHistory.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.login) {
      browserHistory.push('/dashboard');
    }
    this.setState({ open: true });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const fields = this.state.fields;
    fields[name] = event.target.value;
    this.setState({
      fields
    });
  };

  handleClose = (event) => {
    this.setState({
      open: false
    });
  };

  render() {
    const { error } = this.props.state;
    let display = '';
    let loginButton = (
      <RaisedButton
        type='submit'
        label="Login"
        onClick={this.handleSubmit}
        style={style} />
    );

    if (!this.state.fields.username || !this.state.fields.password) {
      loginButton = (<RaisedButton
        type='submit'
        label="Login"
        onClick={this.handleSubmit}
        style={style} disabled/>);
    }
    if (error.status) {
      display = (
        <DialogPrompt title='Login Error'
          open={this.state.open}
          close={this.handleClose}>
          { error.message }
        </DialogPrompt>
      );
    }
    return (
      <div className="row center-xs">
      {display}
        <div className="col-xs-6">
          <div className="box">
            <form onSubmit={this.handleSubmit}>
              <h2>Login</h2>
              <TextFieldControlled
                hintText="username"
                type="text"
                name="username"
                value={this.state.fields.username}
                onChange={this.handleChange}
                />
              <TextFieldControlled
                hintText="password"
                type="password"
                name="password"
                value={this.state.fields.password}
                onChange={this.handleChange}
                />
              {loginButton}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
