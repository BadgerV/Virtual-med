const CertificationForm = () => {
  return (
    <div className="certifcation-form">
      <form>
        <label>Medical License*:</label>
        <input type="text" name="job title" />

        <label>Issue Date*</label>
        <div className="issue">
          <div className="first">
            <input type="date" name="date" placeholder="Month" />
            <img src="assets/Frame 81.svg" alt="" />
          </div>
          <div className="first">
            <input type="date" name="date" placeholder="Year" />
            <img src="assets/Frame 81.svg" alt="" />
          </div>
        </div>

        <label>Certification*</label>
        <input type="text" name="text" />

        <label>Issuing Body*</label>
        <input type="text" name="start date" />

        <div className="hold">
          <input type="checkbox" />
          <span> I don't hold any medical certification</span>
        </div>

        <div className="cert">
          <img src="assets/Frame 81.svg" alt="" />
          <span>Add Certification</span>
        </div>

        <div className="doctor-reg-btn">
          <button type="submit">next</button>
        </div>
      </form>
    </div>
  );
};

export default CertificationForm;
