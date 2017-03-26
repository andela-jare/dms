import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Dialog content can be scrollable.
 */
const DocumentDialog = (props) => {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={props.close}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={props.submit}
        disabled={props.disable}
      />,
    ];

    return (
      <div>
        <Dialog
          title={props.title}
          actions={actions}
          modal={false}
          open={props.open}
          onRequestClose={props.close}
          autoScrollBodyContent={true}
        >
          {props.children}
        </Dialog>
      </div>
    );
}

export default DocumentDialog;
