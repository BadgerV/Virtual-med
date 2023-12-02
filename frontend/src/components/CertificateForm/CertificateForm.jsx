import "./certificateForm.css";
import Select from "react-select";

const CertificationForm = () => {
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
    <div className="certifcation-form">
      <div className="education-label_and_input">
        <label>Medical Lisense *</label>
        <input type="text" />
      </div>

      <div className="education-duo-inputs-container">
        <label>Date of graduation *</label>

        <div className="education-duo-inputs">
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

      <div className="education-label_and_input">
        <label>Certification *</label>
        <input type="text" />
      </div>

      <div className="education-label_and_input">
        <label>Issuing body *</label>
        <input type="text" />
      </div>

      <div className="checkbox-cont">
        <input type="checkbox" />
        <span>I don’t hold any medical certification</span>
      </div>

      {/* <div className="work-button-cont">
        <button>back</button>
        <button>next</button>
      </div> */}
    </div>
  );
};

export default CertificationForm;
