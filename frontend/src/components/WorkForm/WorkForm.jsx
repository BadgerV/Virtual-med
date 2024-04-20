import "./workForm.css";
import Select from "react-select";

const WorkForm = () => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "20px",
      borderColor: "#D3D3D3",
      padding: "0.4em 1em",
      // fontSize: "0.9em", // Font size for the container
      width: "100%",
      // maxWidth: '1000px',
      // margin: '0 auto',
      color: "#D3D3D3", // Text color for the container
      fontSize: "0.9em",
      fontWeight: "400",
      // outline : "1px solid red"
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#D3D3D3",
    }),
    menu: (provided) => ({
      color: "#d3d3d3",
      ...provided,
      fontSize: "0.9em", // Font size for the dropdown menu
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "0.9em", // Font size for individual options in the dropdown
      color: "black",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "1em", // Font size for the placeholder
      color: "#D3D3D3",
    }),
  };
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  return (
    <div className="work-form">
      <div className="work-label_and_input">
        <label>Job Title *</label>
        <input type="text" />
      </div>

      <div className="work-label_and_input">
        <label>Institution *</label>
        <input type="text" />
      </div>

      <div className="workform-date-control">
        <div className="work-duo-inputs-container">
          <label htmlFor="">Start date *</label>
          <div className="work-duo-inputs">
            <Select
              className="trade"
              styles={customStyles}
              options={options}
              placeholder="Month"
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <img src="/assets/CaretDown.svg" alt="" />
                ),
              }}
            />

            <Select
              className="trade"
              styles={customStyles}
              options={options}
              placeholder="Year"
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <img src="/assets/CaretDown.svg" alt="" />
                ),
              }}
            />
          </div>
        </div>

        <div className="work-duo-inputs-container">
          <div className="workfor-label-div">
            <label>End date *</label>

            <div className="checkbox-cont">
              <input type="checkbox" />
              <span>Current</span>
            </div>
          </div>

          <div className="work-duo-inputs">
            <Select
              className="trade"
              styles={customStyles}
              options={options}
              placeholder="Month"
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <img src="/assets/CaretDown.svg" alt="" />
                ),
              }}
            />

            <Select
              className="trade"
              styles={customStyles}
              options={options}
              placeholder="Year"
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <img src="/assets/CaretDown.svg" alt="" />
                ),
              }}
            />
          </div>
        </div>
      </div>

      {/* <div className="work-button-cont">
        <button>back</button>
        <button>next</button>
      </div> */}
    </div>
  );
};

export default WorkForm;
