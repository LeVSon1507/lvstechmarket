import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import { onLogin } from '../../redux/action/action';
import './LoginPage.css';
import Livechat from '../../components/Livechat/Livechat';

function LoginPage() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const userArr = JSON.parse(localStorage.getItem('userArr')) || [];
   const [user, setUser] = useState({
      email: '',
      password: '',
   });

   const [errors, setErrors] = useState({});
   const handleLogin = e => {
      e.preventDefault();
      const errors = validate();
      const matchedUser = userArr.find(
         element => element.email === user.email && element.password === user.password
      );
      if (Object.keys(errors).length === 0) {
         if (matchedUser) {
            localStorage.setItem('currentUser', JSON.stringify(matchedUser));
            navigate('/');
            dispatch(onLogin(user));
         } else {
            setErrors({ email: 'Email or password is incorrect' });
         }
      } else {
         setErrors(errors);
      }
   };
   const goToSignUp = () => {
      navigate('/signUpPage');
   };

   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value,
      });
   };
   const validate = () => {
      let errors = {};
      if (!user.email.trim()) {
         errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(user.email)) {
         errors.email = 'Email address is invalid';
      }
      if (!user.password.trim()) {
         errors.password = 'Password is required';
      } else if (user.password.length < 8) {
         errors.password = 'Password must be at least 8 characters';
      }
      return errors;
   };
   return (
      <div className='loginPageContainer'>
         <div className='loginPageContent'>
            <NavBar />
            <div className='loginBannerImg'>
               <div className='loginFormContainer'>
                  <p className='loginTitle'>Sign In</p>
                  <form className='loginForm' onSubmit={handleLogin}>
                     <input
                        type='email'
                        className='email'
                        placeholder='Email'
                        name='email'
                        onChange={e => handleChange(e)}
                     />
                     {errors.email && <div className='error'>{errors.email}</div>}
                     <input
                        type='password'
                        className='password'
                        placeholder='Password'
                        name='password'
                        onChange={e => handleChange(e)}
                     />
                     {errors.password && <div className='error'>{errors.password}</div>}
                     <button className='btnSubmit' type='submit'>
                        SIGN IN
                     </button>
                  </form>
                  <p className='signUp'>
                     Create an account? <span onClick={goToSignUp}>Sign Up</span>
                  </p>
               </div>
            </div>
         </div>
         <Footer />
         <Livechat />
      </div>
   );
}

export default LoginPage;
