import React from 'react';
import PropTypes from 'prop-types';
import person from './../img/person-black.svg';
import Reply from './Reply';


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
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    reply: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

export default Comment;
