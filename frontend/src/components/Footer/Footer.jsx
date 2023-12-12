import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-first">
            <div className="icon-w-name">
              <img src="assets/medcon-logo.svg" alt="footer-logo" />
              <span className="footer-name">MedCon</span>
            </div>
            <span className="footer-text">
              At MedCon, we understand the significance of seamless connections
              between users and healthcare professionals. Our platform serves as
              a dedicated space where individuals seeking medical advice and
              doctors looking to connect with patients can come together in a
              secure and convenient online environment.
            </span>

            <div className="icons-cont">
              <img src="assets/x-icon.png" alt="" />
              <img src="assets/instagram-icon.png" alt="" />
              <img src="assets/whatsapp-icon.png" alt="" />
            </div>
          </div>

          <div className="links-footer">
            <ul>
              <span className="footer-links-header">Product</span>
              <li>Overview</li>
              <li>Features</li>
              <li>How To Use</li>
              <li>Articles</li>
            </ul>

            <ul>
              <span className="footer-links-header">Company</span>
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
              <li>FAQs</li>
            </ul>

            <ul>
              <span className="footer-links-header">Support</span>
              <li>Help Center</li>
              <li>Terms of Services</li>
              <li>Legal</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-final">
        <span>&copy; MedCon. All rights reserved</span>
      </div>
    </div>
  );
};

export default Footer;
