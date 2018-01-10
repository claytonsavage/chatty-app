import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.type === 'system') {
      return (
        <div className="message system">
          {this.props.content}
        </div>
      );
    }
    if (this.props.type === 'chat') {
      return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    }
  }
}

export default Message;