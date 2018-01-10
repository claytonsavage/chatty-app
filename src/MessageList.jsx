import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className="messages">

        {this.props.messages.map(message => (
          <Message
            key={message.id}
            content={message.content}
            type={message.type}
            username={message.username}
            oldusername={message.oldusername}
            userCount={this.props.userCount} />
        ))}

      </main>
    );
  }
}

export default MessageList;