
import "./reviews.css";
// import { ReviewSlider } from './ReviewSlider';


// SwiperCore.use([Pagination]);

const Reviews = () => {
  return(
    <div className="reviews">
      <div className="reviews-container">
        <img src="assets/Group.svg" alt="reviews-quotes" />
       <span>See what patients are saying about our patients</span>
       {/* <ReviewSlider /> */}
      </div>
    </div>
  )
};

export default Reviews;
