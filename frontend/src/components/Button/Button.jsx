import React, { useState } from 'react';
import './Button.css';

const SwitchableButtons = () => {
  const [isSwitched, setIsSwitched] = useState(false);

  const handleButtonClick = () => {
    // Toggle the value of isSwitched when a button is clicked
    setIsSwitched((prev) => !prev);
  };

  return (
    <div className='switch-btn'>
      {isSwitched ? (
        <>
          <button className='first' onClick={handleButtonClick}>Get Started<img src="/assets/Vector (4).svg" alt="small doctors.png" /></button>
          <button className='second' onClick={handleButtonClick}>Book Appointment</button>
        </>
      ) : (
        <>
          <button className='second' onClick={handleButtonClick}>Book Appointment</button>
          <button className='first' onClick={handleButtonClick}>Get Started<img src="/assets/Vector (4).svg" alt="small doctors.png" /></button>
        </>
      )}
    </div>
  );
};

export default SwitchableButtons;
