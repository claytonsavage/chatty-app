import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.addMessage(event.target.value);
            }
          }
        }/>
      </footer>
    );
  }
}

export default ChatBar