import { useState } from "react";
import "./postPage.css";

const PostPage = () => {
  const doctorName = "Segunmaru Faozan";

  const [liked, setLiked] = useState(false);
  const [foundHelpful, setFoundHelpful] = useState(false);
  return (
    <div className="post-page">
      <div className="post-page-inner">
        <div className="post-page-top">
          <div className="post-page-title-and-button">
            <span className="post-page-post-header">
              The Future of Healthcare
            </span>

            <button>Follow</button>
          </div>

          <span className="post-page-by-author">By {doctorName}</span>

          <span className="post-page-date">July 16, 2023</span>

          <span className="post-page-in-healthcare">In healthcare</span>

          <span className="post-page-post-detail">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            nobis minus autem explicabo reprehenderit voluptatem nisi dolore
            modi nihil fugiat rem optio, magnam possimus eos voluptas quibusdam.
            Totam, explicabo? Ipsum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. At harum dignissimos, quasi asperiores omnis
            facere eligendi maiores! Consequatur, harum dolorem! Deserunt
            dolorum recusandae eveniet mollitia consequatur, autem voluptatem
            minus illo.
          </span>

          <img src="/assets/hero-image.png" alt="" />

          <div className="post-page-reactions-container">
            <div
              className="post-page-reaction-and-number"
              onClick={() => setLiked(!liked)}
            >
              <img
                src={`/assets/heart-rate-${liked ? "full" : "empty"}-icon.svg`}
                alt=""
              />
              <span>14.5k</span>
            </div>

            <div
              className="post-page-reaction-and-number"
              onClick={() => setFoundHelpful(!foundHelpful)}
            >
              <img
                src={`/assets/medical-cross-${
                  foundHelpful ? "full" : "empty"
                }-icon.svg`}
                alt=""
              />
              <span>14.5k</span>
            </div>

            <div className="post-page-reaction-and-number">
              <img src="/assets/comment-icon.svg" alt="" />
              <span>14.5k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
