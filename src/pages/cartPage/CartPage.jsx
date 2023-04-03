import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faArrowLeft,
   faArrowRight,
   faCaretLeft,
   faCaretRight,
   faGift,
   faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/action/action';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Footer from '../../components/Footer/Footer';
import NameBanner from '../../components/NameBanner/NameBanner';
import NavBar from '../../components/NavBar/NavBar';
import './CartPage.css';
import Livechat from '../../components/Livechat/Livechat';

function CartPage() {
   const navigate = useNavigate();
   const dataCart = useSelector(state => state.cartReducer.listCart);
   const isShow = dataCart.length !== 0;
   const currentUser = useSelector(state => state.authReducer.currentUser);
   const dispatch = useDispatch();
   const isLogin = currentUser.password !== '' && currentUser.email !== '';
   const handleDeleteItem = productId => {
      dispatch(removeFromCart(productId));
   };

   const handleIncreaseQtt = (productQuantt, productId) => {
      if (productQuantt < 10) {
         const payload = {
            quantity: productQuantt + 1,
            id: productId,
         };
         dispatch(updateQuantity(payload, productId));
      } else {
         alert('Maximum quantity reached');
      }
   };

   const handleDecreaseQtt = (productQuantt, productId) => {
      if (productQuantt > 1) {
         const payload = {
            quantity: productQuantt - 1,
            id: productId,
         };
         dispatch(updateQuantity(payload, productId));
      } else {
         alert('Minimum quantity reached');
      }
   };

   const handleGoToShopping = () => {
      navigate('../shopPage');
   };

   const goToCheckOut = () => {
      if (isLogin) {
         navigate('../checkOut');
      } else {
         confirmAlert({
            title: 'You are not logged in!',
            message: 'Do you have account?',
            buttons: [
               {
                  label: 'Login',
                  onClick: () => {
                     navigate('/loginPage');
                  },
               },
               {
                  label: 'Sign Up',
                  onClick: () => {
                     navigate('/signUpPage');
                  },
               },
            ],
         });
      }
   };

   const renderCartTable = () => {
      return !isShow ? (
         <div className='noProduct'>There are no products in the cart...</div>
      ) : (
         <table>
            <thead className='container'>
               <tr className='theadtr'>
                  <th>IMAGE</th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th>REMOVE</th>
               </tr>
            </thead>
            <tbody>
               {dataCart.map((item, index) => (
                  <tr key={item._id.$oid + index}>
                     <td>
                        <img src={item.img1} alt={item.name} className='cartImg' />
                     </td>
                     <td className='cartName'>{item.name}</td>
                     <td className='cartPrice'>
                        {parseInt(item?.price).toLocaleString('vi-VN')} {<br />} VND
                     </td>
                     <td>
                        <span
                           className='number-selector-button'
                           onClick={() => handleDecreaseQtt(item.quantity, item._id.$oid)}
                        >
                           <FontAwesomeIcon icon={faCaretLeft} className='iconCaret' />
                        </span>
                        <p className='quanNum'>{item.quantity}</p>
                        <span
                           className='number-selector-button'
                           onClick={() => handleIncreaseQtt(item.quantity, item._id.$oid)}
                        >
                           <FontAwesomeIcon icon={faCaretRight} className='iconCaret' />
                        </span>
                     </td>
                     <td className='cartPrice'>
                        {parseInt(item?.price * item.quantity).toLocaleString('vi-VN')} {<br />} VND
                     </td>
                     <td>
                        <FontAwesomeIcon
                           icon={faTrashAlt}
                           className='iconTrash'
                           onClick={() => handleDeleteItem(item._id)}
                        />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      );
   };

   const renderCartFooter = () => {
      return (
         <div className='boxFooter'>
            <div className='continue' onClick={handleGoToShopping}>
               <FontAwesomeIcon icon={faArrowLeft} className='iconArrowLeft' /> Continue shopping
            </div>

            {isShow && (
               <div className='proceed' onClick={() => goToCheckOut()}>
                  Proceed to Checkout <FontAwesomeIcon icon={faArrowRight} className='iconArrow' />
               </div>
            )}
         </div>
      );
   };

   const renderCartTotal = () => {
      const total = dataCart.reduce((acc, item) => {
         return acc + item.price * item.quantity;
      }, 0);
      const subtotal = total.toLocaleString('vi-VN');
      const grandTotal = total.toLocaleString('vi-VN');
      return (
         <div className='wrapTotal'>
            <h5 className='titleTotal'>CART TOTAL</h5>
            <div className='subtotalgr'>
               <p className='sttTitle'>subtotal</p>
               <p className='sttPrice'>{subtotal} VND</p>
            </div>
            <div className='totalgr'>
               <p className='ttTitle'>total</p>
               <p className='ttPrice'>{grandTotal} VND</p>
            </div>
            <input type='text' className='coupon' placeholder='Enter your coupon' />
            <button className='couponBtn'>
               <FontAwesomeIcon icon={faGift} /> Apply coupon
            </button>
         </div>
      );
   };

   return (
      <div className='cartPageContainer'>
         <div className='cartPageContent'>
            <NavBar />
            <NameBanner name={'cart'} />
            <div className='cartContainer'>
               <h4 className='titleCart'>SHOPPING CART</h4>
               <div className='container-fluid'>
                  <div className='row'>
                     <div className='col-md-8 row'>
                        {renderCartTable()}
                        <div className='container'>{renderCartFooter()}</div>
                     </div>
                     <div className='col-md-4 container total'>{renderCartTotal()}</div>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
         <Livechat />
      </div>
   );
}

export default CartPage;
