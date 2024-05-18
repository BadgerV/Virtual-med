import { useEffect, useState } from "react";
import "./postBlogPost.css";
import axios from "axios";

import {
  convertHashtagsToArray,
  isNonEmptyArrayOrNonWhitespaceString,
  isStringAtLeastXLettersLong,
} from "../../services/utils";
import blogApiCalls from "../../services/apiCalls/blogApiCalls";
import { useNavigate } from "react-router-dom";

//import from react-toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const PostBlogPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    image: "",
  });

  const [tagString, setTagString] = useState("");

  const [selectedfile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const hasAllCredentials = () => {
    if (
      isNonEmptyArrayOrNonWhitespaceString(formData.title) ||
      isNonEmptyArrayOrNonWhitespaceString(formData.content) ||
      isNonEmptyArrayOrNonWhitespaceString(formData.tags) ||
      isNonEmptyArrayOrNonWhitespaceString(formData.image)
    ) {
      toast.error("Please fill all the fields", {
        position: "top-right", // Adjust position if needed
      });

      return false;
    }

    if (isStringAtLeastXLettersLong(formData.content, 200)) {
      toast.error("Please fill all the fields", {
        position: "top-right", // Adjust position if needed
      });

      return false;
    }

    return true;
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle text input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpload = (selectedFile, setLoading) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "zf4edni8");

    axios
      .post("https://api.cloudinary.com/v1_1/dfn3xhl0a/upload", formData)
      .then((response) => {
        setFormData((prevState) => ({
          ...prevState,
          image: response.data["secure_url"],
        }));
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagArray = convertHashtagsToArray(tagString);

    setFormData({ ...formData, tags: tagArray });

    const canProceed = hasAllCredentials();

    if (canProceed) {
      const result = await blogApiCalls.createPost(formData);

      if (result.status == "201") {
        toast.success("Article created successfully", {
          position: "top-right", // Adjust position if needed
        });
        navigate("/blog");
      } else {
        toast.error("Failed to create new article", {
          position: "top-right", // Adjust position if needed
        });
      }
    }
  };

  return (
    <div className="post-blog-post">
      <div className="post-blog-post-inner">
        <span className="post-blog-post-header">
          Write a new medical article
        </span>

        <div className="post-blog-post-label-and-input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Add a title"
            name="title"
            onChange={handleInputChange}
          />
        </div>

        <div className="post-blog-post-label-and-input">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id=""
            rows={10}
            placeholder="Add your medical content here"
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="post-blog-post-label-and-input">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            placeholder="#medtiwwter, #medicine, #health"
            name="tags"
            onChange={(e) => setTagString(e.target.value)}
          />
        </div>
        <div className="post-blog-post-label-and-input">
          <label htmlFor="content">Select an image</label>

          <div className="post-blog-post-input-container">
            <input
              type="file"
              accept="image/*"
              placeholder="Upload an image"
              onChange={handleFileInputChange}
              name="file"
            />

            <span>
              {formData.image === "" ? "Upload an image" : "Image uploaded"}
            </span>

            {loading && (
              <>
                <div className="post-blog-post-loading-container">
                  <LoadingSpinner />
                </div>
              </>
            )}
          </div>
        </div>

        <button className="submit-button" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostBlogPost;
