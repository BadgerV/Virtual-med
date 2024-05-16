import "./post.css";
import { shortenText } from "../../services/utils";

const Post = () => {
  const desc =
    "I see whats happening here, sohisufhiushfiufiuhfiushidsfiudsifdsuisousfihiudshfiushffhoufhofhodshofuhohfouhohouhusohisufhiushfiufiuhfiushidsfiudsifdsuisousfihiudshfiushffhoufhofhodshofuhohfouhohouhusohisufhiushfiufiuhfiushidsfiudsifdsuisousfihiudshfiushffhoufhofhodshofuhohfouhohouhusohisufhiushfiufiuhfiushidsfiudsifdsuisousfihiudshfiushffhoufhofhodshofuhohfouhohouhu";

  const tags = ["Wellness", "Sense", "Humor", "Fitness"];
  return (
    <div className="post">
      <span className="post-post-title">This is the post title</span>
      <span className="post-post-author">Adekunle Gold</span>

      <span className="post-post-desc">{shortenText(desc, 100)}</span>

      <div className="post-bottom">
        <img src="/assets/dummyAvatar.png" alt="" />

        <div className="post-tag-cont">
          {tags.map((val, i) => {
            return <span key={i} className="post-tag">#{val} </span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
