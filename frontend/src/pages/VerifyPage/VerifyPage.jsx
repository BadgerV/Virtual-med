import "./verifyPage.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const VerifyPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href);
    const reference = urlParams.get("reference");
    dispatch(confirmAppointment(reference));
  }, []);

  const dispatch = useDispatch();

  const doctorPaymentStatus = useSelector(
    (state) => state.userSlice.doctorPaymentStatus
  );
  const loading = useSelector((state) => state.userSlice.loadingDoctorPayment);

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    console.log(doctorPaymentStatus);
    if (doctorPaymentStatus == "confirmed") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [doctorPaymentStatus]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {isSuccess ? (
            <div className="verify-page">
              <div className="verify-page-inner-container">
                <span className="verify-page_header">Booking Confirmed</span>
                <span className="verify-page_smaller-text">
                  Your booking is confirmed. Please find the information for
                  your appointment below.
                </span>

                <div className="verify-page_app-container">
                  <hr className="gray-line-verify" />
                  <div className="verify-page_app_together">
                    <div className="verirfy-page-app-left">
                      <img src="/assets/clock-icon.svg" alt="clock" />
                      <span className="verify-regular-te">Date</span>
                    </div>
                    <div className="verirfy-page-app-right">
                      December 4th, 2023
                    </div>
                  </div>
                  <hr className="gray-line-verify" />

                  <div className="verify-page_app_together">
                    <div className="verirfy-page-app-left">
                      <img src="/assets/duration-icon.svg" alt="duration" />
                      <span className="verify-regular-te">Time</span>
                    </div>
                    <div className="verirfy-page-app-right">11:00am</div>
                  </div>
                  <hr className="gray-line-verify" />

                  <div className="verify-page_app_together">
                    <div className="verirfy-page-app-left">
                      <img src="/assets/calendar-icon.svg" alt="calendar" />
                      <span className="verify-regular-te">Duration</span>
                    </div>
                    <div className="verirfy-page-app-right">1 hour</div>
                  </div>
                  <hr className="gray-line-verify" />
                </div>
                <div className="button-container-verify">
                  <Link to="/" className="verify-button">
                    Go back
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="verify-page">
                <div className="verify-page-inner-container">
                  <span className="verify-page_header-failed">Booking failed</span>
                  <span className="verify-page_smaller-text-failed">
                    Your booking failed. Please try again
                  </span>

                  
                  <div className="button-container-verify">
                    <Link to="/" className="verify-button-failed">
                      Go back
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default VerifyPage;

import { useState, useEffect } from "react";
import { confirmAppointment } from "../../redux/user/UserSlice";
import { Link } from "react-router-dom";
