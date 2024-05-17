import { useState } from "react";
import "./postPage.css";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../utils/helper";

const PostPage = () => {
  const doctorName = "Segunmaru Faozan";

  const location = useLocation();
  const postData = location.state;
  console.log(postData.postData.postData);

  const [liked, setLiked] = useState(false);
  const [foundHelpful, setFoundHelpful] = useState(false);
  return (
    <div className="post-page">
      <div className="post-page-inner">
        <div className="post-page-top">
          <div className="post-page-title-and-button">
            <span className="post-page-post-header">
              {postData.postData.postData.title}
            </span>

            <button>Follow</button>
          </div>

          <span className="post-page-by-author">
            By {postData.postData.postData.author.lastName}{" "}
            {postData.postData.postData.author.firstName}
          </span>

          <span className="post-page-date">
            {formatDate(postData.postData.postData.createdAt)}
          </span>

          <span className="post-page-in-healthcare">In healthcare</span>

          <span className="post-page-post-detail">
            {postData.postData.postData.content}
          </span>

          <img src={postData.postData.postData.image} className="post-page-image" alt="" />

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
