import "./rating.css";

const Rating = () => {
  const rating = 5;

  const returnRatingStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <img key={index} src="/assets/star.png" alt="" />
    ));
  };

  return (
    <div className="rating">
      <div className="rating-header">
        <div className="rating-header_left">
          <img src="/assets/dummyAvatar.png" alt="" />
        </div>
        <div className="rating-header_right">
          <div className="rating-name">Ayo Adeboye</div>
          <div className="rating-time">3 months ago</div>
        </div>
      </div>
      <div className="rating-middle">{returnRatingStars(rating)}</div>
      <div className="rating-lower">
        <span>
          Dr Rajesh has helped me a lot through this platform. He’s so attentive
          and patient. He’s definitely one of the best doctors I’ve been treated
          by.
        </span>
      </div>
    </div>
  );
};

export default Rating;
