import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * [CommentInput description]
 * @param {[type]} props [description]
 * @return {element}
 */
function CommentInput(props) {
  return (
    <div className="comment-input-block">
      <TextField
        onChange={e => props.handleEditUserName(e.target.value)}
        className="username-input"
        hintText="Your Name"
        floatingLabelText="User"
        value={props.userName}
      /><br />
      <TextField
        onChange={e => props.handleEditComment(e.target.value)}
        className="comment-input"
        hintText="leave the comment..."
        floatingLabelText="Comment"
        value={props.comment}
        fullWidth
        multiLine
        rows={1}
      /><br />
      <RaisedButton
        className="send-btn"
        label="Send"
        primary
        onTouchTap={() => props.handleSend()}
      />
    </div>
  );
}


CommentInput.propTypes = {
  userName: PropTypes.string,
  comment: PropTypes.string,
  handleEditUserName: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
};

CommentInput.defaultProps = {
  userName: '',
  comment: '',
};

export default CommentInput;
