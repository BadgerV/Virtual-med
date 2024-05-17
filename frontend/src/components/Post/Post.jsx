import "./post.css";
import { shortenText } from "../../services/utils";

import { useNavigate } from "react-router-dom";

const Post = ({ _id, title, content, image, tags, author, createdAt }) => {
  const navigate = useNavigate();

  const postData = {
    _id,
    title,
    content,
    image,
    tags,
    author,
    createdAt,
  };

  const handleNavigate = () => {
    navigate(`/post/${_id}`, {
      state: { postData: { postData } },
    });
  };

  return (
    <div className="post" onClick={handleNavigate}>
      <span className="post-post-title">{title}</span>
      <span className="post-post-author">
        {author.lastName} {author.firstName}
      </span>

      <span className="post-post-desc">{shortenText(content, 250)}</span>

      <div className="post-bottom">
        <img src={image} alt="" />

        <div className="post-tag-cont">
          {tags.map((val, i) => {
            return (
              <span key={i} className="post-tag">
                #{val}{" "}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
