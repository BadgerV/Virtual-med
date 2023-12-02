import "./basicInfoForm.css";
import Select from "react-select";

const BasicInfoForm = () => {
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
    <div className="basic-form">
      <div className="photo-form">
        <input type="image" src="/assets/avatar-fake.png" />
        <span>Upload Photo</span>
      </div>

      <form>
        <div className="name-form">
          <div className="name-form_div">
            <label>Name*</label>
            <input type="text" name="name" placeholder="First Name" />
          </div>

          <div className="name-form_div">
            <label>‎ </label>
            <input type="text" name="name" placeholder="Last Name" />
          </div>
        </div>

        <div className="gender-form">
          <label>Gender *</label>
          <div className="gender-form">
            <Select
              styles={customStyles}
              options={options}
              placeholder="Country"
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <img src="/assets/CaretDown.svg" alt="" />
                ),
              }}
            />
          </div>
        </div>

        <div className="location-form">
          <label>Location*</label>
          <div className="location-mini_div">
            <Select
              className="trade"
              styles={customStyles}
              options={options}
              placeholder="Country"
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
              placeholder="State"
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <img src="/assets/CaretDown.svg" alt="" />
                ),
              }}
            />
          </div>
        </div>

        <div className="date-of-birth-form">
          <label>Date of Birth*</label>
          <div className="date-of-birth-div">
            <Select
              className="date-of-birth-option"
              styles={customStyles}
              options={options}
              placeholder="Day"
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => (
                  <img src="/assets/CaretDown.svg" alt="" />
                ),
              }}
            />

            <Select
              className="date-of-birth-option"
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
              className="date-of-birth-option"
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

        <div className="buttons-container">
          <button className="button doctor-register_back-button">back</button>
          <button className="button doctor-register_next-button">next</button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;
