import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './../css/Board.css';

import CommentInput from './CommentInput';
import Title from './Title';
import Comment from './Comment';


// Tap event for mobile
injectTapEventPlugin();

/**
 * [state description]
 * @type {Object}
 */
class Board extends Component {

  /**
   * [constructor description]
   */
  constructor() {
    super();
    this.state = {
      data: [],
      commentCount: 0,
      inputUserName: '',
      inputComment: '',
      msg: 'hello from vibert',
    };
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then((d) => {
        const commentCount = d.length;
        let data = d;
        data = data.map((c) => {
          const cNew = c;
          cNew.replying = false;
          cNew.replyingUserName = '';
          cNew.replyingContent = '';
          return cNew;
        });
        return this.setState({ data, commentCount });
      })
      .catch(err => console.error(err));
  }

  /**
   * [post description]
   * @param  {[type]} id       [description]
   * @param  {[type]} userName [description]
   * @param  {[type]} content  [description]
   */
  postNewComment() {
    const { commentCount, inputUserName, inputComment } = this.state;
    fetch('/api/comment', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentCount,
        inputUserName,
        inputComment,
      }),
    })
    .then(res => res.json())
    .then((comment) => {
      const c = comment;
      c.replying = false;
      c.replyingUserName = '';
      c.replyingContent = '';
      const data = this.state.data.concat(comment);
      this.setState({
        data,
      });
    })
    .catch(err => console.error(err));
  }

  /**
   * [handleEditUserName description]
   * @param  {[type]} input [description]
   */
  handleEditUserName(input) {
    const inputUserName = input;
    this.setState({
      inputUserName,
    });
  }

  /**
   * [handleEditComment description]
   * @param  {[type]} input [description]
   */
  handleEditComment(input) {
    const inputComment = input;
    this.setState({
      inputComment,
    });
  }

  /**
   * [handleSend description]
   */
  handleSend() {
    const inputUserName = '';
    const inputComment = '';
    const commentCount = this.state.commentCount + 1;
    this.postNewComment();
    this.setState({
      inputUserName,
      inputComment,
      commentCount,
    });
  }

  /**
   * [handleEditReplyingUserName description]
   * @param  {[type]} id    [description]
   * @param  {[type]} input [description]
   */
  handleEditReplyingUserName(id, input) {
    const data = this.state.data;
    data[id].replyingUserName = input;
    this.setState({
      data,
    });
  }

  /**
   * [handleEditReplyingContent description]
   * @param  {[type]} id    [description]
   * @param  {[type]} input [description]
   */
  handleEditReplyingContent(id, input) {
    const data = this.state.data;
    data[id].replyingContent = input;
    this.setState({
      data,
    });
  }

  /**
   * [handleToggleReplying description]
   * @param  {number} id [description]
   */
  handleToggleReplying(id) {
    const data = this.state.data;
    data[id].replying = !data[id].replying;
    this.setState({
      data,
    });
  }

  /**
   * [handleSendReply description]
   * @param  {[type]} id [description]
   */
  handleSendReply(id) {
    const data = this.state.data;
    const userName = data[id].replyingUserName;
    const content = data[id].replyingContent;

    fetch(`/api/reply/${id}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        content,
      }),
    })
    .then(res => res.json())
    .then((reply) => {
      const d = this.state.data;
      d[id].reply = d[id].reply.concat(reply);
      data[id].replying = false;
      data[id].replyingUserName = '';
      data[id].replyingContent = '';
      this.setState({
        data: d,
      });
    })
    .catch(err => console.error(err));
  }

  /**
   * [board description]
   * @return {element} [description]
   */
  board() {
    return (
      <div className="board">
        {this.state.data.map((d, id) =>
          <Comment
            key={`comment-${d.id}`}
            comment={d}
            handleToggleReplying={() => this.handleToggleReplying(id)}
            handleEditReplyingUserName={(index, input) =>
              this.handleEditReplyingUserName(index, input)}
            handleEditReplyingContent={(index, input) =>
              this.handleEditReplyingContent(index, input)}
            handleSendReply={index => this.handleSendReply(index)}
          />,
        )}

        <CommentInput
          userName={this.state.inputUserName}
          comment={this.state.inputComment}
          handleEditUserName={input => this.handleEditUserName(input)}
          handleEditComment={input => this.handleEditComment(input)}
          handleSend={() => this.handleSend()}
        />
      </div>
    );
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="App">
        <Title content="Mother Board" />
        <hr className="divider rotate" />
        {this.board()}
        <button onClick={() => this.post()} />
      </div>
    );
  }
}

export default Board;
