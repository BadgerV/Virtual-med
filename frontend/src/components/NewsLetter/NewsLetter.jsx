import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1 className="newletter-text">Suscribe to our Newsletter</h1>
      <span className="newletter-second">
        Be the first to discover new product features, upcoming events, and
        special promotions tailored specifically for our valued subscribers
      </span>

      <form>
        <input type="text" placeholder="Your email address" />
        <button>Subscribe</button>
      </form>
    </div>
  );
};

export default NewsLetter;
