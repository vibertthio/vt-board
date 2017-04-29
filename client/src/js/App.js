import React, { Component } from 'react';
import './../css/App.css';

/**
 * [state description]
 * @type {Object}
 */
class App extends Component {
  state = {
    data: [],
    msg: 'hell from vibert',
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.error(err));
  }

  /**
   * [post description]
   */
  post() {
    fetch('/api', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: this.state.msg,
      }),
    })
    .then(res => res.json())
    .then(console.log)
    .catch(err => console.error(err));
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="App">
        <h1>Mother Board</h1>
        {this.state.data.map(d =>
          <div key={d.id}>
            <p>{d.username}</p>
            <p>{d.content}</p>
          </div>,
        )}
        <button onClick={() => this.post()} />
      </div>
    );
  }


}

export default App;
