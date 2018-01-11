import React, {Component, Fragment} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          currentUser: { username: 'Anonymous' },
          messages: [],
          userCount: 0
      };
  }

  checkURL(url) {
      if (url) {
          return (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
      }
  }

  removeURL(message) {
      return message.content.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
  }

  isolateURL(messageWithURL, messageWithoutURL) {
      return messageWithURL.content.replace(messageWithoutURL, '')
  }

  addMessage(content) {
      const newMessage = {
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
          oldusername: this.state.currentUser.username
      }
      let userObject = this.ws.send(JSON.stringify(newUsername))
      this.setState({ currentUser: { username: username, oldusername: this.state.currentUser.username, color: this.state.currentUser.color } })
  }

  componentDidMount() {
      this.ws = new WebSocket("ws://0.0.0.0:3001");
      this.ws.onmessage = (event) => {
          let newMessage = JSON.parse(event.data);
          if (newMessage.hasOwnProperty('type') && newMessage.type !== "colorset") {
              const hasURL = this.checkURL(newMessage.content);
              if (hasURL) {
                  const noURL = this.removeURL(newMessage);
                  const URL = this.isolateURL(newMessage, noURL);
                  newMessage.content = noURL
                  newMessage.image = URL
                  this.setState({
                      messages: this.state.messages.concat(newMessage)
                  });
              } else if (!hasURL) {
                  this.setState({
                      messages: this.state.messages.concat(newMessage)
                  });
              }
          } else if (newMessage.type === "colorset") {
              const color = JSON.parse(event.data).color
              this.setState({
                  currentUser: {
                      username: this.state.currentUser.username,
                      oldusername: this.state.currentUser.username,
                      color: color
                  }
              })
          } else {
              this.setState({
                  userCount: event.data
              });
          }
      }
  }

  render() {
    return (
      <Fragment>
        <NavBar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
        <ChatBar addMessage={this.addMessage.bind(this)}
                 currentUser={this.state.currentUser.username}
                 olduser={this.state.currentUser.oldusername}
                 changeUsername={this.changeUsername.bind(this)}/>
      </Fragment>
    );
  }
}
export default App;