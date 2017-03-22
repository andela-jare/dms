import React from 'react';
import TextField from 'material-ui/TextField';

export default class TextFieldControlled extends React.Component {
  render() {
    return (
      <div>
        <TextField
          id="text-field-controlled"
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          hintText={this.props.hintText}
          type={this.props.type}
        />
      </div>
    );
  }
}
