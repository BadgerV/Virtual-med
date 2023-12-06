import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
// import Profile from "./components/Profile/Profile";
// import Footer from "./components/Footer/Footer";
// import Home from "./components/Home/Home";
// import SignIn from "./pages/SignIn/SignIn";
// import SignUp from "./pages/SignUp/SignUp";
import { lazy, Suspense, useEffect } from "react";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
// import Navbar from "./components/Navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { myProfile } from "./redux/user/UserSlice";
// import FindDoctor from "./pages/FindDoctor/FindDoctor";
import FindDoctor from "./pages/FindDoctor/findDoctor";
// import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
//LAZY IMPORT PAGES FOR BETTER WEBSITE PERFORMANCE
const Profile = lazy(() => import("./pages/Profile/Profile"));
// const Footer = lazy(() => import("./components/Footer/Footer"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const SignUpPatient = lazy(() =>
  import("./pages/SignUpPatient/SignUpPatient.jsx")
);
// <<<<<<< HEAD
const DoctorProfile = lazy(() =>
  import("./pages/DoctorProfile/DoctorProfile.jsx")
);
const DoctorRegister = lazy(() =>
  import("./pages/DoctorRegister/DoctorRegister.jsx")
);
// =======
// >>>>>>> e4940758ada45dde05a87fc861ec176461e13426
const PrivateRoutes = lazy(() =>
  import("./components/PrivateRoute/PrivateRoutes")
);
const Chat = lazy(() => import("./pages/Chat/Chat"));
const MakeAppointment = lazy(() =>
  import("./pages/MakeAppointment/MakeAppointment")
);

//lets make sure everything is in em for scaling
//let us add the assets in the public folder, that way if i want to access the react.svg in there i would say src = "/assets/react.svg" directly. no need to import anything
//links sould be ul li then a tags, for upscaling and for ease in considering screen readers

//i was thinking we should start with the redux store and the asynchronous detchings from the backend pending the time we will get a designer.

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.useSelector);
  const loadingUserProfile = useSelector(
    (state) => state.userSlice.loadingUserProfile
  );

  console.log(loadingUserProfile);

  useEffect(() => {
    const verifyUser = async () => {
      await dispatch(myProfile());
    };

    verifyUser();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />

      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/signup" element={<SignUpPatient />} />

          <Route path="/finddoctor" element={<FindDoctor />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/registerdoctor" element={<DoctorRegister />} />
          <Route path="/doctorprofile" element={<DoctorProfile />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/make-appointment/:id" element={<MakeAppointment />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

// ejhbf rnmfbrj rj
