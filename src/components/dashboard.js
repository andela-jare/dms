import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DocumentDialog from './alert/documentDialog';
import TextFieldControlled from './input/textField';
import Validate from './validation/validate';
import * as documentActions from '../actions/documents';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fields: {
        title: '',
        content: '',
        access: 'public'
      },
      validationErrors: {}
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    if (!localStorage.token) {
      browserHistory.push('/login');
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleChange(event) {
    const name = event.target.name;
    const fields = this.state.fields;
    fields[name] = event.target.value;
    const validationErrors = this.state.validationErrors;

    if (Validate.notEmpty(name, this.state.fields[name])) {
      validationErrors[name] = Validate.notEmpty(
        name, this.state.fields[name]
      );
      this.setState({
        validationErrors
      });
    }

    this.setState({
      fields
    });
  }

  handleSelect(event, index, value) {
    const fields = this.state.fields;
    fields['access'] = value;
    this.setState({
      fields
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let proceed = true;

    if ((this.state.validationErrors.title !== true) ||
      (this.state.validationErrors.content !== true)) {
      proceed = false;
    }
    if (proceed) {
      const fields = {
        title: this.state.fields.title,
        content: this.state.fields.content,
        access: this.state.fields.access
      }
      this.props.documentActions.create(fields);
      this.setState({open: false});
    }
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const style = {
      position: 'absolute',
      bottom: 30,
      right: 30
    };

    const redColor = {
      color: 'red',
      fontSize: 12
    };

    let disable = false;
    if ((this.state.validationErrors.title !== true) ||
      (this.state.validationErrors.content !== true)) {
      disable = true;
    }

    return (
      <div>
        <h2 className="row center-xs">Dashboard</h2>
        <DocumentDialog
          title="Create Document"
          open={this.state.open}
          close={this.handleClose}
          submit={this.handleSubmit}
          disable={disable}>
            <form onSubmit={this.handleSubmit}>
              <TextFieldControlled
                hintText="Title"
                type="text"
                name="title"
                value={this.state.fields.title}
                onChange={this.handleChange}
                />
                {
                  !!this.state.validationErrors.title &&
                  <span style={redColor}>
                    {this.state.validationErrors.title}
                  </span>
                }
              <br/>
              <TextField
                name="content"
                floatingLabelText="Content"
                value={this.state.fields.content}
                onChange={this.handleChange}
                multiLine={true}
                />
                <br/>
                {
                  !!this.state.validationErrors.content &&
                  <span style={redColor}>
                    {this.state.validationErrors.content}
                  </span>
                }
              <br/>
              <SelectField
                name="access"
                floatingLabelText="Access"
                value={this.state.fields.access}
                onChange={this.handleSelect}
                >
                <MenuItem value='public' primaryText="Public" />
                <MenuItem value='private' primaryText="Private" />
                <MenuItem value='role' primaryText="Role" />
              </SelectField>
            </form>
          </DocumentDialog>
        <FloatingActionButton style={style} onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
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
    documentActions: bindActionCreators(documentActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
