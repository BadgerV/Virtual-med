import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isUser = useSelector((state) => state.userSlice.user);

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <div className="navbar-modal">
          <img
            src="/assets/menu-icon.svg"
            className="menu-icon"
            alt=""
            onClick={() => setIsModalOpen(!isModalOpen)}
            style={setIsModalOpen ? { display: "none" } : ""}
          />

          <div className="navbar-mobile-links">
            <Link
              className="navbar-link-mobile"
              to="/"
              onClick={handleCloseModal}
            >
              Home
            </Link>
            <Link
              className="navbar-link-mobile"
              to="/services"
              onClick={handleCloseModal}
            >
              Services
            </Link>
            <Link
              className="navbar-link-mobile"
              to="/finddoctor"
              onClick={handleCloseModal}
            >
              Doctors
            </Link>
            <Link
              className="navbar-link-mobile"
              to="/contact-us"
              onClick={handleCloseModal}
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
      <nav className="navbar">
        <div className="navbar-left">
          Virtual<span>Med</span>
        </div>

        <div className="navbar-middle">
          <Link className="navbar-link" to="/">
            Home
          </Link>
          <Link className="navbar-link" to="/services">
            Services
          </Link>
          <Link className="navbar-link" to="/finddoctor">
            Doctors
          </Link>
          <Link className="navbar-link" to="/contact-us">
            Contact us
          </Link>
        </div>

        {isUser ? (
          <div className="navbar-right">
            <button className="my-account-button">
              <img src="/assets/avatar-mini.svg" alt="avatar mini" />
              My Account
            </button>

            <div className="navbar-mobile-devices">
              <img
                src="/assets/menu-icon.svg"
                className="menu-icon"
                alt=""
                onClick={() => setIsModalOpen(!isModalOpen)}
              />
            </div>
          </div>
        ) : (
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
        )}
      </nav>
    </>
  );
};

export default Navbar;
