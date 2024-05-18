import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "../../redux/user/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isUser = useSelector((state) => state?.userSlice.user);
  const isStaff = useSelector((state) => state?.formSlice.staff);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [hovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [canSetAvilableDates, setCanSetAvailableDates] = useState(false);

  useEffect(() => {
    const isTrue = isStaff !== null || isUser?.accountType === "staff";

    setCanSetAvailableDates(isTrue);
  }, [isUser, isStaff]);

  const handleSignOut = () => {
    dispatch(signOut());

    localStorage.removeItem("token");

    navigate("/signin");
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
            style={setIsModalOpen ? { display: "none" } : { display: "block" }}
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
            {isUser || isStaff ? (
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
              to="/finddoctor"
              onClick={handleCloseModal}
            >
              Doctors
            </Link>
            <Link
              className="navbar-link-mobile"
              to="/coming-soon"
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
          <span>MedCon</span>
        </div>

        {isUser || isStaff ? (
          <div className="navbar-middle-with-appoint">
            <Link className="navbar-link" to="/">
              Home
            </Link>
            <Link className="navbar-link" to="/services">
              Services
            </Link>
            <Link className="navbar-link" to="/finddoctor">
              Doctors
            </Link>
            <Link
              className="navbar-link"
              to="/my-appointments"
              onClick={handleCloseModal}
            >
              My appointments
            </Link>
            <Link className="navbar-link" to="/coming-soon">
              Contact us
            </Link>
          </div>
        ) : (
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
            <Link className="navbar-link" to="/coming-soon">
              Contact us
            </Link>
          </div>
        )}

        {isUser || isStaff ? (
          <div className="navbar-right">
            <button
              className="my-account-button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/assets/avatar-mini.svg"
                alt="avatar mini"
                className="nav-avatar-mini"
              />
              My Account
              <div
                className="buttonModal"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={hovered ? { display: "flex" } : {}}
              >
                <Link to="/coming-soon" className="buttonModal-button">
                  My Profile
                </Link>

                <Link to="/post/create" className="buttonModal-button">
                  Create post
                </Link>
                <Link
                  to="/get-available-dates"
                  className="buttonModal-button"
                  style={
                    canSetAvilableDates
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  Set available dates
                </Link>
                <Link
                  to="/signin"
                  className="buttonModal-button"
                  onClick={handleSignOut}
                >
                  Logout
                </Link>
              </div>
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
