import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      messages: [{
        id: 1,
        type: 'chat',
        content: 'I am message 1'
      }, {
        id: 1.5,
        type: 'system',
        content: 'Anonymous1 changed their name to Bob'
      }, {
        id: 2,
        type: 'chat',
        content: 'I am message 2'
      }]
    };
  }

  addMessage(content) {
    const newMessage = {
      id: Math.random(),
      type: 'chat',
      content: content
    };
    this.setState({
      messages: this.state.messages.concat(newMessage)
    });
  }

  render() {
    return (
      <div>
        <nav class="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar addMessage={this.addMessage.bind(this)}/>
      </div>
    );
  }
}
export default App;