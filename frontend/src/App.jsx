import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { lazy, Suspense, useEffect } from "react";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { myProfile } from "./redux/user/UserSlice";
import FindDoctor from "./pages/FindDoctor/findDoctor";
const Profile = lazy(() => import("./pages/Profile/Profile"));
// const Footer = lazy(() => import("./components/Footer/Footer"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const SignUpPatient = lazy(() =>
  import("./pages/SignUpPatient/SignUpPatient.jsx")
);
const DoctorProfile = lazy(() =>
  import("./pages/DoctorProfile/DoctorProfile.jsx")
);
const DoctorRegister = lazy(() =>
  import("./pages/DoctorRegister/DoctorRegister.jsx")
);
const PrivateRoutes = lazy(() =>
  import("./components/PrivateRoute/PrivateRoutes")
);
const Chat = lazy(() => import("./pages/Chat/Chat"));
const MakeAppointment = lazy(() =>
  import("./pages/MakeAppointment/MakeAppointment")
);
const Services = lazy(() => import("./pages/Services/Services"));
const ContactUs = lazy(() => import("./pages/ContactUs/ContactUs"));
//lets make sure everything is in em for scaling
//let us add the assets in the public folder, that way if i want to access the react.svg in there i would say src = "/assets/react.svg" directly. no need to import anything
//links sould be ul li then a tags, for upscaling and for ease in considering screen readers

//i was thinking we should start with the redux store and the asynchronous detchings from the backend pending the time we will get a designer.

import io from "socket.io-client";
import AvailabilityForm, {
  SetNickName,
} from "./pages/CollectAvailableTImeAndNickkname/CollectAvailableTimeAndNickname";

var socket;
const ENDPOINT = "http://localhost:8000";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.useSelector);
  const loadingUserProfile = useSelector(
    (state) => state.userSlice.loadingUserProfile
  );

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("cone");
  }, []);
  useEffect(() => {
    const verifyUser = async () => {
      await dispatch(myProfile());
    };

    verifyUser();
  }, []);

  const loading = useSelector((state) => state.userSlice.loading);
  const otherLoading = useSelector(
    (state) => state.userSlice.loadingUserProfile
  );

  return (
    <BrowserRouter>
      {loading === false && otherLoading === false ? (
        <>
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
              <Route path="/services" element={<Services />} />
              <Route path="/contact-us" element={<ContactUs />} />

              <Route element={<PrivateRoutes />}>
                <Route path="/chat" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/make-appointment/:id"
                  element={<MakeAppointment />}
                />
                <Route path="/chat" element={<Chat />} />
                <Route
                  path="/get-available-dates/"
                  element={<AvailabilityForm />}
                />
                <Route path="/set-nickname" element={<SetNickName />} />
              </Route>
            </Routes>
            {/* <Footer /> */}
          </Suspense>
        </>
      ) : (
        <LoadingComponent />
      )}
    </BrowserRouter>
  );
};

export default App;

// ejhbf rnmfbrj rj
