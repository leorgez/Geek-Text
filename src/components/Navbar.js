import React from 'react';

class Navbar extends React.Component {
    render () {
      return (
        <nav className="navbar navbar-default" role="navigation"> 
    <div className="container-fluid"> 
        <ul className="nav navbar-nav navbar-right"> 
            <li><a href="#/Register"><span className="glyphicon glyphicon-user"></span> Register</a></li> 
            <li><a href="#/Login"><span className="glyphicon glyphicon-log-in"></span> Login</a></li> 
        </ul> 
    </div> 
</nav>
      );
    }
  }
  


export default Navbar;