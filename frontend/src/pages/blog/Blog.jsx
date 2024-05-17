import { useEffect, useState } from "react";
import "./blog.css";

import blogApiCalls from "../../services/apiCalls/blogApiCalls";

//importing images
import StethoscopeIcon from "/assets/stethoscope-icon.png";
import HospitalIcon from "/assets/hospital-icon.png";
import BottleIcon from "/assets/bottle-icon.png";
import HeartIcon from "/assets/heart-icon.png";
import PersonIcon from "/assets/person-icon.png";
import AppleIcon from "/assets/apple-icon.png";
import BrainIcon from "/assets/brain-icon.png";
import Post from "../../components/Post/Post";

import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const Blog = () => {
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const arrayOfTopicsAndIcons = [
    {
      text: "Doctors & Clinics",
      icon: StethoscopeIcon,
    },
    {
      text: "Medical Suppies",
      icon: HospitalIcon,
    },
    {
      text: "Health & Wellness",
      icon: BottleIcon,
    },
    {
      text: "Fitness & Exercise",
      icon: HeartIcon,
    },
    {
      text: "Nutrition & diet",
      icon: PersonIcon,
    },
    {
      text: "Pharmacies",
      icon: AppleIcon,
    },
    {
      text: "Mental Health",
      icon: BrainIcon,
    },
    {
      text: "Therapist",
      icon: BottleIcon,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      blogApiCalls.getRecentPosts().then((res) => {
        setFetchedPosts(res);
        console.log(res);
        setLoading(false);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="blog-page">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="blog-splash">
            <span className="blog-span-text">
              Your go-to platform for medical insights.
            </span>

            <div className="blog-search">
              <div className="blog-search-inner">
                <input type="text" placeholder="Search for topics" />
                <button>Explore</button>
              </div>
            </div>
          </div>

          <div className="blog-middle">
            <span className="blog-middle-header">Medical</span>

            <div className="blog-middle-bottom">
              {arrayOfTopicsAndIcons.map((values, i) => (
                <IconAndtext icon={values.icon} text={values.text} key={i} />
              ))}
            </div>
          </div>

          <div className="blog-bottom">
            <div className="blog-recent-posts">
              <span className="blog-recent-posts-header">Recent Posts</span>

              <div className="blog-bottom-posts">
                {fetchedPosts.map((values, i) => (
                  <Post key={i} {...values} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const IconAndtext = ({ icon, text }) => {
  return (
    <div className="blog-icon-and-text">
      <img src={icon} alt="" />
      <span>{text}</span>
    </div>
  );
};

export default Blog;
