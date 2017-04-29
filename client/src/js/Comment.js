import React from 'react';
import PropTypes from 'prop-types';
import person from './../img/person-black.svg';
import replySvg from './../img/add.svg';
import Reply from './Reply';
import CommentInput from './CommentInput';


/**
 * [Comment description]
 * @param {[type]} props [description]
 * @return {element}
 */
function Comment(props) {
  return (
    <div className="comment" key={props.comment.id}>
      <img
        src={person}
        className="comment-icon"
        alt="icon"
      />
      <h2 className="comment-username">{props.comment.userName}</h2>
      <p className="comment-time">submitted {props.comment.time}</p>
      <p className="comment-content">
        {props.comment.content.split('\n').map((item, index) =>
          <span key={item + index.toString()}>{item}<br /></span>,
        )}
      </p>
      {props.comment.reply.map(r =>
        <Reply key={r.userName + r.time} reply={r} />,
      )}

      <button
        className="reply-btn"
        label="Reply"
        onTouchTap={props.handleToggleReplying}
      >
        <img
          className={`reply-svg ${(props.comment.replying ? 'rotate' : '')}`}
          src={replySvg}
          alt="reply"
        />
      </button>
      {!props.comment.replying ? null :
      <CommentInput
        userName={props.comment.replyingUserName}
        comment={props.comment.replyingContent}
        handleEditUserName={input => props.handleEditReplyingUserName(props.comment.id, input)}
        handleEditComment={input => props.handleEditReplyingContent(props.comment.id, input)}
        handleSend={() => props.handleSendReply(props.comment.id)}
      />
      }
      <hr className="divider rotate" />

    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    replying: PropTypes.bool,
    replyingUserName: PropTypes.string.isRequired,
    replyingContent: PropTypes.string.isRequired,
    reply: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  handleToggleReplying: PropTypes.func,
  handleEditReplyingUserName: PropTypes.func,
  handleEditReplyingContent: PropTypes.func,
  handleSendReply: PropTypes.func,
};

const noop = () => {};
Comment.defaultProps = {
  handleToggleReplying: noop,
  handleEditReplyingUserName: noop,
  handleEditReplyingContent: noop,
  handleSendReply: noop,
};

export default Comment;
