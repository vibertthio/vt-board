import React from 'react';
import PropTypes from 'prop-types';
import person from './../img/person-white.svg';

/**
 * [Comment description]
 * @param {[type]} props [description]
 * @return {element}
 */
function Reply(props) {
  return (
    <div className="reply">
      <img
        src={person}
        className="reply-icon"
        alt="icon"
      />
      <h2 className="reply-username">{props.reply.userName}</h2>
      <p className="reply-time">submitted {props.reply.time}</p>
      <p className="reply-content">
        {props.reply.content.split('\n').map((item, index) =>
          <span key={item + index.toString()}>{item}<br /></span>,
        )}
      </p>
    </div>
  );
}

Reply.propTypes = {
  reply: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Reply;
