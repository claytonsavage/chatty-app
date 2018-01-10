import React, {Component} from 'react';

class ChatBar extends Component {
constructor(props) {
  super(props);
  this.state = {

  }
}
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.props.addMessage(event.target.value);
              event.target.value = "";
            }
          }
        }/>
      </footer>
    );
  }
}

export default ChatBar