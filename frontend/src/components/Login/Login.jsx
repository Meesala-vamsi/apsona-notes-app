import axios from 'axios';
import "./Login.css";
import { useContext, useState } from 'react';
import { ReactContext } from '../../ReactContext/Context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from "react-toastify"

const Login = () => {
  const [details, setDetails] = useState({
    email: '',
    password: ''
  });
  const { url, setToken, setUserData } = useContext(ReactContext);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setDetails({
      ...details,
      [id]: value
    });
  };

  const onSubmitSuccess = (token) => {
    Cookies.set('jwtToken', token, { expires: 30});
    navigate('/');
  };

  const onSubmitDetails = async (e) => {
    e.preventDefault();

    await axios.post(`${url}/login`, details)
      .then((response) => {
        if (response.status === 200) {
          setToken(response.data.jwtToken);
          toast.success(response.data.message)
          onSubmitSuccess(response.data.jwtToken);
          setUserData(response.data.data.user);
        }
      }).catch((err) => {
        toast.error(err.response.data.message)
      });
    setDetails({
      email: '',
      password: ''
    });
  };

  const onClickCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={onSubmitDetails} className='form-container'>
        <div className='input-container'>
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' value={details.email} placeholder='Email' onChange={onChangeInput} />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' placeholder='Password' value={details.password} onChange={onChangeInput} />
        </div>
        <div className='btn-container'>
          <button type='submit'>Submit</button>
          <div className='account-link-container'>
            <p>Don't have an Account? </p>
            <p onClick={onClickCreateAccount} className='account-link'>Create An Account</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
