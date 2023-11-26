import React from 'react';
import './Navbar.css';


const Navbar = () => {
  return (
    <div className="navbar">
        
        <a href='/'>AJEGUNLE</a>

        <ul>
            <li>
                <a href="/signup">SignUp</a>
                <a href="/signin">SignIn</a>
            </li>
        </ul>
    </div>
  )
}

export default Navbar