import "./premiumSubscribe.css";
import { useNavigate } from "react-router-dom";

const PremiumSubscribe = () => {
  const navigate = useNavigate();

  const navigateToComingSoon = () => {
    navigate("/coming-soon");
  };
  return (
    <div className="premium-sub-page">
      <div className="premium-sub-header">Pricing</div>

      <div className="premium-sub__text">Choose your plan</div>

      <div className="plans-sub__container">
        <div className="plan-container">
          <span className="plan-header__text">Basic plan</span>
          <span className="plan-header__price">₦1,000/per month</span>

          <ul className="advantages-sub-list">
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">
                Real-time Consultations with certified healthcare professional address immediate medical needs.
              </li>
            </div>
            <span className="spec" >SPECIFICATIONS</span>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Access to General Physician</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Unlimited Consultation</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Audio, Chat & Video Call</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Prescription of Drugs</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">24/7 Technical Support</li>
            </div>
          </ul>

          <button className="sub-buy__package" onClick={navigateToComingSoon}>
            Buy package
          </button>
        </div>
        <div className="plan-container">
          <span className="plan-header__text">Premium Plan</span>
          <span className="plan-header__price">₦3,000/per month</span>
          <ul className="advantages-sub-list">
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">
                Specialist opinions to help users make informed healthcare
                decison.
              </li>
            </div>
            <span className="spec" >SPECIFICATIONS</span>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Access to Specialist </li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Unlimited Consultation</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Audio, Chat & Video Call</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Prescription of Drugs</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">
                In-depth Analysis of Medical History
              </li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Written report included</li>
            </div>
          </ul>
          <button className="sub-buy__package" onClick={navigateToComingSoon}>
            Buy package
          </button>
        </div>
        <div className="plan-container">
          <span className="plan-header__text">Family Plan</span>
          <span className="plan-header__price">₦10,000/per month</span>

          <ul className="advantages-sub-list">
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">
                A wide range of diagnosis or treatments with regular check-ins
                and support{" "}
              </li>
            </div>
            <span className="spec" >SPECIFICATIONS</span>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Preventive care</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Advanced diagnosis</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Maternity</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Emergency and Urgent Care</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Prescription of Drugs</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Eye Care</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Audio, Chat & Video Call</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">
                Confidential and Secure Platform
              </li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">24/7 Technical Support</li>
            </div>
          </ul>
          <button className="sub-buy__package" onClick={navigateToComingSoon}>
            Buy package
          </button>
        </div>

        {/* <div className="plan-container">
          <span className="plan-header__text">Enterprise Plan</span>
          <span className="plan-header__price">Custom Pricing</span>

          <ul className="advantages-sub-list">
            <div className="div sub-together">
              <img src="/assets/check.png" alt="" />
              <li className="advantage-sub">
                Customizable Communication Channels
              </li>
            </div>
            <div className="div sub-together">
              <img src="/assets/check.png" alt="" />
              <li className="advantage-sub">Dedicated Account Manager</li>
            </div>
            <div className="div sub-together">
              <img src="/assets/check.png" alt="" />
              <li className="advantage-sub">Priority Appointment Booking</li>
            </div>
            <div className="div sub-together">
              <img src="/assets/check.png" alt="" />
              <li className="advantage-sub">
                Priority Specialist Consultations for Employees
              </li>
            </div>
            <div className="div sub-together">
              <img src="/assets/check.png" alt="" />
              <li className="advantage-sub">
                Comprehensive Employee Health Package
              </li>
            </div>
            <div className="div sub-together">
              <img src="/assets/check.png" alt="" />
              <li className="advantage-sub">
                Corporate Health Events and Training
              </li>
            </div>
            <div className="div sub-together">
              <img src="/assets/check.png" alt="" />
              <li className="advantage-sub">Enterprise Health Dashboard</li>
            </div>
            <div className="div sub-together">
              <img src="/assets/check.png" alt="" />
              <li className="advantage-sub">Scalable for Any Business Size</li>
            </div>
          </ul>
          <button className="sub-buy__package" onClick={navigateToComingSoon}>
            Buy package
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PremiumSubscribe;