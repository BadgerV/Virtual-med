import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>
          Virtual<span>Med</span>
        </h1>
      </Link>

      <ul>
        <li>
          <a href="">Home</a>
          <a href="">Services</a>
          <Link to="/finddoctor">Doctors</Link>
          <a href="">Contact Us</a>
        </li>
      </ul>

      <div className="navbar-last">
        <Link to="/signin">
          <span>Sign in</span>
        </Link>

        <button className="btn">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
