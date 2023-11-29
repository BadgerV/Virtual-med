import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';



const Navbar = () => {
  return (
   <nav className="navbar">
     <h1>Virtual<span>Med</span></h1>


     <ul>
       <li>
         <a href="">Home</a>
         <a href="">Services</a>
         <a href="">Dcotors</a>
         <a href="">Contact Us</a>
       </li>
     </ul>

     <div className="navbar-last">

       <Link to="/signin">
         <span>
           SignIn
           </span></Link>

       <button className="btn">Get Started</button>
     </div>
   </nav>
  )
}

export default Navbar