const WorkForm = () => {
  return (
    <div className="work-form">
      <form>
        <label>Job Title*:</label>
        <input type="text" name="job title" />

        <label>Institution*</label>
        <input type="text" name="Institution" />

        <label>Start Date*</label>
        <div className="start-form">
          <div className="startdate-form">
            <input type="text" name="start date" placeholder="month" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>

          <div className="startdate-form"></div>
          <input type="text" name="start date" placeholder="year" />
          <img src="/assets/CaretDown.svg" alt="" />
        </div>

        <label>End Date*</label>

        <div className="current-form">
          <input type="checkbox" />
          <span>current</span>
        </div>

        <div className="end-form">
          <div className="enddate-form">
            <input type="text" name="start date" placeholder="month" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>

          <div className="enddate-form">
            <input type="text" name="start date" placeholder="year" />
            <img src="/assets/CaretDown.svg" alt="" />
          </div>
        </div>

        <div className="add-exp">
          <img src="assets/Frame 81.svg" alt="" />
          <span>Add Work Experience</span>
        </div>

        <div className="doctor-reg-btn">
          <button type="submit">next</button>
        </div>
      </form>
    </div>
  );
};

export default WorkForm;
