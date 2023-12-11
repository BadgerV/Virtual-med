import { useEffect, useState } from "react";
import { setAboutMe as setaboutme } from "../../redux/doctors/FormSlice";
import { useDispatch } from "react-redux";
import "./abouteMe.css";

const AboutMe = () => {
  const dispatch = useDispatch();

  const aboutMe =
    localStorage.getItem("aboutMe") !== null
      ? localStorage.getItem("aboutMe")
      : "";

  const [aboutMeValue, setAboutMeValue] = useState(aboutMe);

  useEffect(() => {
    localStorage.setItem("aboutMe", aboutMeValue);
    dispatch(setaboutme(aboutMeValue));
  }, [aboutMeValue]);

  useEffect(() => {
    console.log(aboutMe);
  }, [aboutMe]);

  return (
    <div className="about-me">
      <label htmlFor="aboutme">About me *</label>
      <textarea
        name="aboutme"
        rows={20}
        onChange={(e) => setAboutMeValue(e.target.value)}
        value={aboutMe}
        placeholder="About me"
      ></textarea>
    </div>
  );
};

export default AboutMe;
