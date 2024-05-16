import axios from "axios";

const DEVELOPMENT = "http://localhost:8000";
// const PROD = "https://virtual-med-backend.onrender.com";

const createPost = async (title, content, tags, image) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${DEVELOPMENT}/blog/post/create`,
    {
      title,
      content,
      tags,
      image,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getThreePosts = async () => {
  const response = await axios.get(`${DEVELOPMENT}/blog/post/get-3-posts`);

  return response.data;
};

const getPostById = async (id) => {
  const response = await axios.get(
    `${DEVELOPMENT}/blog/post/et-post-by-id/${id}`
  );

  return response.data;
};

const deletePost = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${DEVELOPMENT}/blog/post/delete-post/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getPostByDoctorId = async (doctorId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${DEVELOPMENT}/blog/get-doctor-post/${doctorId}`, {
      params: {
        page,
        limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


const blogApiCalls = {
  createPost,
  getThreePosts,
  getPostById,
  deletePost,
  getPostByDoctorId
};

export default blogApiCalls;
