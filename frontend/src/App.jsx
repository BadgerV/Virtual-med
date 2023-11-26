import "./App.css";
//lets mamke sure everything is in em for scaling
//let us add the assets in the public folder, that way if i want to access the react.svg in there i would say src = "/assets/react.svg" directly. no need to import anything
//links sould be ul li then a tags, for upscaling and for ease in considering screen readers


//i was thinking we should start with the redux store and the asynchronous detchings from the backend pending the time we will get a designer.

//i created a flder called redux already

const App = () => {
  return (
    <div className="container">
      <div className="one">
        <span>DAVE</span>
      </div>

      <div className="second">
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact Doctors</a>
        <a href="">Donations</a>
        <a href="">Help</a>
      </div>
    </div>
  );
};

export default App;
