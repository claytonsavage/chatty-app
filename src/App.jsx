import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {type: 'system', username: 'Anonymous', oldusername: 'Anonymous', color: 'red'},
      messages: [],
      userCount: 0
    };
  }

// returns true if image or false
  checkURL(url) {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  addMessage(content) {
    const newMessage = {
      id: Math.random(),
      type: 'chat',
      content: content,
      username: this.state.currentUser.username,
      color: this.state.currentUser.color
    };
    this.ws.send(JSON.stringify(newMessage));
  }

  changeUsername(username) {
    const newUsername = {
      type: 'system',
      username: username,
      oldusername: this.state.currentUser.username,
      color: 'blue'
    }
    let userObject = this.ws.send(JSON.stringify(newUsername))
    this.setState({ currentUser: { username: username, oldusername: this.state.currentUser.username , color: this.state.currentUser.color } })
  }

componentDidMount() {
  this.ws = new WebSocket("ws://0.0.0.0:3001");
  this.ws.onmessage = (event) => {
  let newMessage = JSON.parse(event.data);
    if (newMessage.hasOwnProperty('type') && newMessage.type !== "colorset") {
      // check if message contains jpeg
      if (this.checkURL(newMessage.content)) {
        const noURL = newMessage.content.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        const URL = newMessage.content.replace(noURL, '');
        console.log(URL);
        console.log("it is an image");
        console.log(noURL);
        // pass the url in as a new thing in message
        // pass the rest as the content
        //id: "22e45330-f668-11e7-b5e4-5ffa4a763962", type: "chat", content: "refesr", username: "Anonymous", color: "pink"
        newMessage.content = noURL
        newMessage.image = URL
        console.log(newMessage)
        //set it as the message
        this.setState({
          messages: this.state.messages.concat(newMessage)
         });
      } else if (!this.checkURL(newMessage.content)) {
        this.setState({
          messages: this.state.messages.concat(newMessage)
        });
      }
    } else if (newMessage.type === "colorset") {
      const color = JSON.parse(event.data).color
      this.setState({ currentUser: { username: this.state.currentUser.username, oldusername: this.state.currentUser.username , color: color } })
    } else {
      this.setState({
        userCount: event.data
      });
    }
  }
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="userCount">users online {this.state.userCount}</p>
        </nav>
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
        <ChatBar addMessage={this.addMessage.bind(this)} currentUser={this.state.currentUser.username} olduser={this.state.currentUser.oldusername} changeUsername={this.changeUsername.bind(this)}/>
      </div>
    );
  }
}
export default App;