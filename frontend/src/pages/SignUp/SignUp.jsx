import React from 'react';
import './SignUp.css';
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../../../../backend/src/controllers/user.controller';
import { useDispatch, useSelector } from "react-redux";




const SignUp = () => {
  const [formData, setFormData] = useState({ });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.error);
  const isSuccess = useSelector((state) => state.isSuccess);



  const handleSubmit = () => {

   }


  const handleChange = (e) => {
    setFormData(...formData, [e.target.id], e.target.value)
   }
  return (
    <div className="newsign">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" placeholder='firstName' id='firstName' className='signs' />
        <input onChange={handleChange} type="text" placeholder='lastName' id="lastName" className='signs' />
        <input onChange={handleChange} type="email" placeholder='email' id="email" className='signs' />
        <input onChange={handleChange} type="password" placeholder='password' id='password' className='sings' />

      </form>

      <div className="down">
        <p>Have an account?</p>
        <Link to="/signin">
          <h2 className="enter">Sign In</h2>
        </Link>
      </div>
    </div>
  )
}

export default SignUp