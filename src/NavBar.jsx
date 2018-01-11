import React, {Component} from 'react';

class NavBar extends Component {

  render() {
    return (
       <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="userCount">users online {this.props.userCount}</p>
       </nav>
    );
  }
}

export default NavBar