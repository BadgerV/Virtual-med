import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <div className="navbar-modal">
          <img
            src="/assets/menu-icon.svg"
            className="menu-icon"
            alt=""
            onClick={() => setIsModalOpen(!isModalOpen)}
            style={setIsModalOpen ? {display : "none"} : ""}
          />

          <div className="navbar-mobile-links">
            <Link className="navbar-link-mobile">Home</Link>
            <Link className="navbar-link-mobile">Services</Link>
            <Link className="navbar-link-mobile">Doctors</Link>
            <Link className="navbar-link-mobile">Contact us</Link>
          </div>
        </div>
      )}
      <navbar className="navbar">
        <div className="navbar-left">
          Virtual<span>Med</span>
        </div>

        <div className="navbar-middle">
          <Link className="navbar-link">Home</Link>
          <Link className="navbar-link">Services</Link>
          <Link className="navbar-link">Doctors</Link>
          <Link className="navbar-link">Contact us</Link>
        </div>

        <div className="navbar-right">
          <button className="navbar-signin">Sign in</button>
          <button className="navbar-get_started">Get Started</button>

          <div className="navbar-mobile-devices">
            <img
              src="/assets/menu-icon.svg"
              className="menu-icon"
              alt=""
              onClick={() => setIsModalOpen(!isModalOpen)}
            />
          </div>
        </div>
      </navbar>
    </>
  );
};

export default Navbar;
