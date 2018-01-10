import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      currentUser: 'Bob',

      messages: []
    };
  }

  addMessage(content) {
    const newMessage = {
      id: Math.random(),
      type: 'chat',
      content: content,
      username: this.state.currentUser
    };
    this.setState({
      messages: this.state.messages.concat(newMessage)
    });
    this.ws.send(JSON.stringify(newMessage));
  }

  changeUsername(username) {
    const newUsername = username;
    this.setState({curentUser: newUsername})
  }

  componentDidMount() {
  this.ws = new WebSocket("ws://0.0.0.0:3001");
  console.log('connected to server');

  // setTimeout(() => {
  //   const newMessage = {id: Math.random(), type:'chat', username: "Michelle", content: "Hello there!"};
  //   const incomingmessages = this.state.messages.concat(newMessage)
  //   this.setState({messages: incomingmessages})
  // }, 3000);
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar addMessage={this.addMessage.bind(this)} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;