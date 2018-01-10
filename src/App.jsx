import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      currentUser: {type: 'system', username: 'MysteryPerson', oldusername: 'MysteryPerson'},

      messages: []
    };
  }

  addMessage(content) {
    const newMessage = {
      id: Math.random(),
      type: 'chat',
      content: content,
      username: this.state.currentUser.username,
      oldusername: this.state.currentUser.oldusername
    };
    console.log(newMessage);
    this.ws.send(JSON.stringify(newMessage));
  }

  changeUsername(username) {
    const newUsername = {
      type: 'system',
      username: username,
      oldusername: this.state.currentUser.username
    }
    // this.setState({
    //   messages: this.state.messages.concat(newMessage)
    // });
    console.log('new username', newUsername.username);
    console.log('old username', newUsername.oldusername);
    let userObject = this.ws.send(JSON.stringify(newUsername))
    this.setState({ currentUser: { username: username, oldusername: 'this.state.currentUser.username' } })
  }

  componentDidMount() {
  this.ws = new WebSocket("ws://0.0.0.0:3001");
 // console.log('connected to server');

  this.ws.onmessage = (event) => {
  const newMessage = JSON.parse(event.data);
  //console.log(newMessage);
  this.setState({
      messages: this.state.messages.concat(newMessage)
    });
  }
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
        <ChatBar addMessage={this.addMessage.bind(this)} currentUser={this.state.currentUser.username} olduser={this.state.currentUser.oldusername} changeUsername={this.changeUsername.bind(this)}/>
      </div>
    );
  }
}
export default App;