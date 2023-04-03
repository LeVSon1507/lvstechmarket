import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import './SignUpPage.css';
import Livechat from '../../components/Livechat/Livechat';

function SignUpPage() {
   const userArr = JSON.parse(localStorage.getItem('userArr') || '[]');
   const navigate = useNavigate();
   const [errors, setErrors] = useState({});
   const [user, setUser] = useState({
      fullName: '',
      email: '',
      password: '',
      phone: '',
   });
   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value,
      });
   };

   const validate = () => {
      let errors = {};
      if (!user.fullName.trim()) {
         errors.fullName = 'Full name is required';
      }
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
      if (!user.phone.trim()) {
         errors.phone = 'Phone number is required';
      } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(user.phone)) {
         errors.phone = 'Phone number is invalid';
      }
      return errors;
   };
   const handleSignup = e => {
      e.preventDefault();
      const errors = validate();
      const isUnique = !userArr.some(u => u.email === user.email);
      if (isUnique && !Object.keys(errors).length) {
         userArr.push(user);
         localStorage.setItem('userArr', JSON.stringify(userArr));
         alert('You have successfully registered');
         navigate('/loginPage');
      } else {
         const uniqueErrors = {};
         if (!isUnique) {
            if (userArr.some(u => u.email === user.email)) {
               uniqueErrors.email = 'Email is already registered';
            }
         }
         setErrors({ ...uniqueErrors, ...errors });
      }
   };
   const goToLogin = () => {
      navigate('/loginPage');
   };
   return (
      <div className='signUpPageContainer'>
         <div className='signUpPageContent'>
            <NavBar />
            <div className='signupBannerImg'>
               <div className='signupFormContainer'>
                  <p className='signupTitle'>Sign Up</p>
                  <form className='signupForm' onSubmit={handleSignup}>
                     <input
                        type='text'
                        className='fullName'
                        name='fullName'
                        placeholder='Full Name'
                        value={user.fullName}
                        onChange={handleChange}
                     />
                     {errors.fullName && <div className='error'>{errors.fullName}</div>}
                     <input
                        type='email'
                        className='email'
                        name='email'
                        placeholder='Email'
                        value={user.email}
                        onChange={handleChange}
                     />
                     {errors.email && <div className='error'>{errors.email}</div>}
                     <input
                        type='password'
                        className='passwordSu'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        onChange={handleChange}
                     />
                     {errors.password && <div className='error'>{errors.password}</div>}
                     <input
                        type='text'
                        className='phone'
                        name='phone'
                        placeholder='Phone'
                        value={user.phone}
                        onChange={handleChange}
                     />
                     {errors.phone && <div className='error'>{errors.phone}</div>}
                     <button className='btnSubmit' type='submit'>
                        SIGN UP
                     </button>
                  </form>
                  <p className='loginFt'>
                     Already have an account? <span onClick={goToLogin}>Login</span>
                  </p>
               </div>
            </div>
         </div>
         <Footer />
         <Livechat />
      </div>
   );
}

export default SignUpPage;
