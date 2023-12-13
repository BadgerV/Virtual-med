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
          <span className="plan-header__price">₦1,500/month</span>

          <ul className="advantages-sub-list">
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Limited Text Consultations</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Limited Video Calls</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Priority Appointment Booking</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Weekly Health Tips</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Community Access</li>
            </div>
          </ul>

          <button className="sub-buy__package" onClick={navigateToComingSoon}>
            Buy package
          </button>
        </div>
        <div className="plan-container">
          <span className="plan-header__text">Individual Plan</span>
          <span className="plan-header__price">₦3,500/month</span>

          <ul className="advantages-sub-list">
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Unlimited Text Consultations</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Limited Video Calls</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Priority Appointment Booking</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Health Tracker</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Daily Health Tips</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Community Access</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Permanent Patient File</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Personalized Health Insights</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Appointment Reminders</li>
            </div>
          </ul>
          <button className="sub-buy__package" onClick={navigateToComingSoon}>
            Buy package
          </button>
        </div>
        <div className="plan-container">
          <span className="plan-header__text">Family Plan</span>
          <span className="plan-header__price">₦10,000/month</span>

          <ul className="advantages-sub-list">
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">
                Unlimited Text and Video Consultations
              </li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">24/7 Priority Family Support</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">
                Extended Health Tracker for Each Family Member
              </li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Prescription Management</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Exclusive Family Webinars</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Permanent Family Health Record</li>
            </div>
            <div className="sub-together">
              <img src="/assets/check.png" alt="check" />
              <li className="advantage-sub">Dedicated Account Manager</li>
            </div>
          </ul>
          <button className="sub-buy__package" onClick={navigateToComingSoon}>
            Buy package
          </button>
        </div>
        <div className="plan-container">
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
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscribe;
