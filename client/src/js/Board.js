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
      .then((data) => {
        const commentCount = data.length;
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
  post() {
    const { commentCount, inputUserName, inputComment } = this.state;
    fetch('/api', {
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

    this.setState({
      inputUserName,
      inputComment,
      commentCount,
    });

    this.post();
  }

  /**
   * [board description]
   * @return {element} [description]
   */
  board() {
    return (
      <div className="board">
        {this.state.data.map(d =>
          <Comment key={`comment-${d.id}`} comment={d} />,
        )}

        <hr className="divider" />
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
        <hr className="divider" />
        {this.board()}
        <button onClick={() => this.post()} />
      </div>
    );
  }
}

export default Board;
