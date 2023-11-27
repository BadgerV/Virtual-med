import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Profile from "./components/Profile/Profile";
// import Footer from "./components/Footer/Footer";
// import Home from "./components/Home/Home";
// import SignIn from "./pages/SignIn/SignIn";
// import SignUp from "./pages/SignUp/SignUp";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";

//LAZY IMPORT PAGES FOR BETTER WEBSITE PERFORMANCE
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));

//lets mamke sure everything is in em for scaling
//let us add the assets in the public folder, that way if i want to access the react.svg in there i would say src = "/assets/react.svg" directly. no need to import anything
//links sould be ul li then a tags, for upscaling and for ease in considering screen readers

//i was thinking we should start with the redux store and the asynchronous detchings from the backend pending the time we will get a designer.

const App = () => {
  // FETCH USERS FROM REDUX STATE
  const user = useSelector((state) => state.userSlice.user);

  return (
    <BrowserRouter>
      {/* header */}
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Let's make sure the routes that require there to be users are protected */}
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/signup" />}
          />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
