// ReviewSlider.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ReviewSlider.css'; // Add your custom styles if needed

export const ReviewSlider = ({ reviewsData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {reviewsData.map((review) => (
        <div key={review.id} className="review-slide">
          <div className="user-info">
            <img src={review.image} alt={`User ${review.id}`} className="user-avatar" />
            <div className="user-details">
              <p>{review.name}</p>
              <p>{review.state}</p>
            </div>
          </div>
          <p className="review-text">{review.review}</p>
          <img src={review.image2} alt={`Location ${review.id}`} className="location-icon" />
        </div>
      ))}
    </Slider>
  );
};

