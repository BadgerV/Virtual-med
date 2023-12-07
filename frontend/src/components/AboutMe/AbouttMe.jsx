import { useEffect, useState } from "react";
import { setAboutMe as setaboutme } from "../../redux/doctors/FormSlice";
import { useDispatch, useSelector } from "react-redux";
import "./abouteMe.css";

const AboutMe = () => {
  const dispatch = useDispatch();

  const aboutMe = useSelector((state) => state.formSlice.aboutMe);

  const [aboutMeValue, setAboutMeValue] = useState(aboutMe);

  useEffect(() => {
    dispatch(setaboutme(aboutMeValue));
  }, [aboutMeValue]);



  useEffect(() => {
    console.log(aboutMe)
  }, [aboutMe])

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
