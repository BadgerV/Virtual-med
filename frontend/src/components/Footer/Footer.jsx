import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-first">
            <img src="assets/Frame 278.svg" alt="footer-logo" />
            <span>
              Lorem ipsum dolor sit amet consectetur. Sit quam lacus sit sit
              nunc congue phasellus ultrices. Ligula sit est consequat imperdiet
              sapien.
            </span>
            <div className="icons">
              <img src="assets/Vector (13).svg" alt="" />
              <img src="assets/Vector (15).svg" alt="" />
              <img src="assets/Vector (16).svg" alt="" />
            </div>
          </div>

          <div className="links">
            <ul>
              <h1>Product</h1>
              <li>Overview</li>
              <li>Features</li>
              <li>How To Use</li>
              <li>Articles</li>
            </ul>

            <ul>
              <h1>Company</h1>
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
              <li>FAQs</li>
            </ul>

            <ul>
              <h1>Support</h1>
              <li>Help Center</li>
              <li>Terms of Services</li>
              <li>Legal</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="footer-final">
          <h2>&copy; MedCon. All rights reserved</h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
