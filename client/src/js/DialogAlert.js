import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * [state description]
 * @type {Object}
 */
export default class DialogAlert extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState(
      { open: true },
    );
  };

  handleClose = () => {
    this.setState(
      { open: false },
    );
  };

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Discard"
        primary
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Alert" onTouchTap={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Discard draft?
        </Dialog>
      </div>
    );
  }
}
