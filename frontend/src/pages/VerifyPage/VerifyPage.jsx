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
    console.log(doctorPaymentStatus)
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
              <div className="verify-page-container">
                <span>Verification successfull!</span>
                <Link to="/" className="no-styling-link">
                  Go back
                </Link>
              </div>
            </div>
          ) : (
            <div className="verify-page">
              <div className="verify-failed-container">
                <span>Verification failed</span>
                <Link to="/" className="no-styling-link-red">
                  Go back
                </Link>
              </div>
            </div>
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

function useGetReferenceFromUrl() {
  const [reference, setReference] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href);
    const reference = urlParams.get("reference");
    setReference(reference);
    console.log(reference);
  }, []);

  return reference;
}
