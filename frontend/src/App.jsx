import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
//lets mamke sure everything is in em for scaling
//let us add the assets in the public folder, that way if i want to access the react.svg in there i would say src = "/assets/react.svg" directly. no need to import anything
//links sould be ul li then a tags, for upscaling and for ease in considering screen readers


//i was thinking we should start with the redux store and the asynchronous detchings from the backend pending the time we will get a designer.

//i created a flder called redux already

const App = () => {
  return (
    <BrowserRouter>
      {/* header */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
};

export default App;
