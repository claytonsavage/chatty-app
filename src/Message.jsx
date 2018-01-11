import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.type === 'system') {
      return (
        <div className="message system">
          {this.props.oldusername} is now {this.props.username}
        </div>
      );
    }
    if (this.props.type === 'chat') {

      if (this.props.image) {
      return (
        <div className="message">
          <span className={"message-username " + this.props.userColor}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
          <img src={this.props.image} className="chatimage"/>
        </div>
        )
      } else {
      return (
        <div className="message">
          <span className={"message-username " + this.props.userColor}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
      }
    }
    if (this.props.type === 'connection') {
      return (
        <div className="message system">
          {this.props.content}
        </div>
        )
    }
  }
}

export default Message;