import { useEffect, useState } from "react";
import "./postBlogPost.css";
import axios from "axios";

const PostBlogPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    image: "",
  });

  const [selectedfile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = (selectedFile, setLoading) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "zf4edni8");

    axios
      .post("https://api.cloudinary.com/v1_1/dfn3xhl0a/upload", formData)
      .then((response) => {
        setFormData({ ...formData, image: response.data["secure_url"] });
        console.log(response.data["secure_url"]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    if (selectedfile) {
      handleUpload(selectedfile, setLoading);
    }
  }, [selectedfile]);
  return (
    <div className="post-blog-post">
      <div className="post-blog-post-inner">
        <span className="post-blog-post-header">
          Write a new medical article
        </span>

        <div className="post-blog-post-label-and-input">
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Add a title" name="title" />
        </div>

        <div className="post-blog-post-label-and-input">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id=""
            rows={10}
            placeholder="Add your medical content here"
          ></textarea>
        </div>

        <div className="post-blog-post-label-and-input">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            placeholder="#medtiwwter, #medicine, #health"
            name="tags"
          />
        </div>
        <div className="post-blog-post-label-and-input">
          <label htmlFor="content">Select an image</label>
          <input
            type="file"
            placeholder="Upload an image"
            onChange={handleFileInputChange}
            name="file"
          />
        </div>

        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default PostBlogPost;
