import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(message => (
          <Message
            key={message.id}
            content={message.content}
            type={message.type}
            username={message.username}
            oldusername={message.oldusername} />
        ))}
      </main>
    );
  }
}

export default MessageList;