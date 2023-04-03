import React from 'react';
import './NavBar.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

//route
import { useNavigate, useLocation } from 'react-router-dom';

// icon;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../../redux/action/action';

function NavBar({ cartAdded }) {
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const currentUser = useSelector(state => state.authReducer.currentUser);
   const userArr = JSON.parse(localStorage.getItem('userArr') || '[]');
   const cartProductQuantity = useSelector(state => state.cartReducer.listCart);
   const handleClickGoTo = link => {
      navigate(link);
   };
   const handleLogout = () => {
      confirmAlert({
         title: 'Logout',
         message: 'Are you sure you want to log out?',
         buttons: [
            {
               label: 'Yes',
               onClick: () => {
                  localStorage.removeItem('currentUser');
                  dispatch(onLogout());
                  navigate('/');
               },
            },
            {
               label: 'No',
               onClick: () => {},
            },
         ],
      });
   };
   const isActive = pathname => location.pathname === pathname;
   const isLogin = currentUser.password !== '' && currentUser.email !== '';
   const [currentUserName] = userArr.filter(
      element => element.email === currentUser.email && element.password === currentUser.password
   );
   return (
      <div className='container-fluid navbarContainer'>
         <div className='row containerNav container'>
            <div className='grLeft col-md-4 row'>
               <span
                  className={`homeText col-2 mx-2 ${isActive('/') ? 'active' : ''}`}
                  onClick={() => handleClickGoTo('/')}
               >
                  Home
               </span>
               <span
                  className={`shopText col-2 mx-2 ${isActive('/shopPage') ? 'active' : ''}`}
                  onClick={() => handleClickGoTo('/shopPage')}
               >
                  Shop
               </span>
            </div>
            <h2 className='title col-md-4' onClick={() => handleClickGoTo('/')}>
               BOUTIQUE
            </h2>
            <div className='grRight col-md-4'>
               <div className='cart' onClick={() => handleClickGoTo('/cartPage')}>
                  <FontAwesomeIcon icon={faCartShopping} className='icon' />
                  <span className='cartBtn'>Cart</span>
                  {cartProductQuantity.length === 0 ? (
                     ''
                  ) : (
                     <p className={`cartProductQuantity ${cartAdded ? 'added' : ''}`}>
                        {cartProductQuantity.length}
                     </p>
                  )}
               </div>
               <div className='cart mx-2'>
                  <FontAwesomeIcon icon={faPerson} className='icon' />
                  {isLogin ? (
                     <div className='userName'>
                        <p className='userName'> I'm {currentUserName.fullName} </p>
                        <span className='cartBtn' onClick={handleLogout}>
                           (Logout)
                        </span>
                     </div>
                  ) : (
                     <span className='cartBtn' onClick={() => handleClickGoTo('/loginPage')}>
                        Login
                     </span>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default NavBar;
