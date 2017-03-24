import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextFieldControlled from './textField';
import * as userActions from '../actions/users';
import DialogPrompt from './alert/prompt';
import Validate from './validation/validate';

const style = {
  margin: 12
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordAgain: ''
      },
      validationErrors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let proceed = true;
    Object.keys(this.state.fields).map((field) => {
      if (this.state.validationErrors[field] !== true) {
        proceed = false;
      }
      return true;
    });

    if (proceed) {
      this.props.userActions.signUp(this.state.fields);
    }
  }

  componentWillMount() {
    if (localStorage.token) {
      browserHistory.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.login) {
      browserHistory.push('/');
    }
    this.setState({ open: true });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const fields = this.state.fields;
    const validationErrors = this.state.validationErrors;
    fields[name] = event.target.value;
    if (['username', 'lastName', 'firstName'].includes(name)) {
      if (Validate.length(name, this.state.fields[name])) {
        validationErrors[name] = Validate.length(name, this.state.fields[name]);
        this.setState({
          validationErrors
        });
      }
    }
    if (name === 'password') {
      if (Validate.password(name, this.state.fields[name])) {
        validationErrors[name] = Validate.password(
          name, this.state.fields[name]
        );
        this.setState({
          validationErrors
        });
      }
      validationErrors['passwordAgain'] = Validate.checkPassword(
        this.state.fields.password, this.state.fields.passwordAgain
      );
      this.setState({
        validationErrors
      });
    }

    if (name === 'passwordAgain') {
      if (Validate.checkPassword(this.state.fields.password,
        this.state.fields[name])) {
        validationErrors[name] = Validate.checkPassword(
          this.state.fields.password, this.state.fields[name]
        );
        this.setState({
          validationErrors
        });
      }
    }

    if (name === 'email') {
      if (Validate.email(this.state.fields[name])) {
        validationErrors[name] = Validate.email(this.state.fields[name]);
        this.setState({
          validationErrors
        });
      }
    }

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
    let signUpButton = <RaisedButton
      type='submit'
      label="Sign Up"
      onClick={this.handleSubmit}
      style={style} />;

    if (Object.keys(this.state.validationErrors).length < 6) {
      signUpButton = <RaisedButton
        type='submit'
        label="Sign Up"
        onClick={this.handleSubmit}
        style={style} disabled/>;
    }

    if (error.status) {
      display = (
        <DialogPrompt
          title='SignUp Error'
          open={this.state.open}
          close={this.handleClose}
        >
          { error.message }
        </DialogPrompt>
      );
    }

    const redColor = {
      color: 'red',
      fontSize: 12
    };

    return (
      <div className="row center-xs">
      {display}
        <div className="col-xs-6">
          <div className="box">
            <form onSubmit={this.handleSubmit}>
              <h2>Sign Up</h2>
              <TextFieldControlled
                hintText="username"
                type="text"
                name="username"
                value={this.state.fields.username}
                onChange={this.handleChange}
                />
                {
                  !!this.state.validationErrors.username &&
                  <span style={redColor}>
                    {this.state.validationErrors.username}
                  </span>
                }
              <TextFieldControlled
                hintText="first name"
                type="text"
                name="firstName"
                value={this.state.fields.firstName}
                onChange={this.handleChange}
                />
                {
                  !!this.state.validationErrors.firstName &&
                  <span style={redColor}>
                    {this.state.validationErrors.firstName}
                  </span>
                }
              <TextFieldControlled
                hintText="last name"
                type="text"
                name="lastName"
                value={this.state.fields.lastName}
                onChange={this.handleChange}
                />
                {
                  !!this.state.validationErrors.lastName &&
                  <span style={redColor}>
                    {this.state.validationErrors.lastName}
                  </span>
                }
              <TextFieldControlled
                hintText="email"
                type="email"
                name="email"
                value={this.state.fields.email}
                onChange={this.handleChange}
                />
                {
                  !!this.state.validationErrors.email &&
                  <span style={redColor}>
                    {this.state.validationErrors.email}
                  </span>
                }
              <TextFieldControlled
                hintText="password"
                type="password"
                name="password"
                value={this.state.fields.password}
                onChange={this.handleChange}
                />
                {
                  !!this.state.validationErrors.password &&
                  <span style={redColor}>
                    {this.state.validationErrors.password}
                  </span>
                }
              <TextFieldControlled
                hintText="password again"
                type="password"
                name="passwordAgain"
                value={this.state.fields.passwordAgain}
                onChange={this.handleChange}
                />
                {
                  !!this.state.validationErrors.passwordAgain &&
                  <span style={redColor}>
                    {this.state.validationErrors.passwordAgain}
                  </span>
                }
                <br/>
              {signUpButton}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
