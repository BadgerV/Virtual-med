import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isUser = useSelector((state) => state?.userSlice.user);
  const isStaff = useSelector((state) => state?.formSlice.staff);

  useEffect(() => {
    console.log(isUser?.isPremium);
  }, [isUser]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
            {isUser?.isPremium ? (
              <Link
                className="navbar-link-mobile"
                to="/my-appointments"
                onClick={handleCloseModal}
              >
                My appointments
              </Link>
            ) : (
              <></>
            )}
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
          <img
            src="/assets/medcon-logo.svg"
            className="medcon-logo"
            alt="logo"
          />
          <span>
            MedCon
          </span>
        </div>

        <div
          className="navbar-middle"
          style={isUser.isPremium ? { flex: 0.6 } : {}}
        >
          <Link className="navbar-link" to="/">
            Home
          </Link>
          <Link className="navbar-link" to="/services">
            Services
          </Link>
          <Link className="navbar-link" to="/finddoctor">
            Doctors
          </Link>
          {isUser?.isPremium ? (
            <Link
              className="navbar-link"
              to="/my-appointments"
              onClick={handleCloseModal}
            >
              My appointments
            </Link>
          ) : (
            <></>
          )}
          <Link className="navbar-link" to="/contact-us">
            Contact us
          </Link>
        </div>

        {isUser || isStaff ? (
          <div className="navbar-right">
            <button className="my-account-button">
              <img src="/assets/avatar-mini.svg" alt="avatar mini" className="nav-avatar-mini" />
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
            <Link className="navbar-signin" to="/signin">
              Sign in
            </Link>
            <Link className="navbar-get_started" to="/signup">
              Get Started
            </Link>

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
