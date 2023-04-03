import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hidePopup } from '../../redux/action/action';
import './Popup.css';

const Popup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const popupData = useSelector((state) => state.popupReducer.product);

    const handleClose = () => dispatch(hidePopup());

    const handleViewDetail = () => {
        dispatch(hidePopup());
        navigate(`/detail/${popupData._id.$oid}`, { state: popupData._id.$oid });
    };

    return (
        <div className='container-fluid'>
            <div className='popup'>
                <div className='popup-content'>
                    <img src={popupData?.img1} alt='popupImg' className='productImg' />
                    <div className='popup-des'>
                        <span className='closePopup' onClick={handleClose}>
                            x
                        </span>
                        <h2>{popupData?.name}</h2>
                        <p className='price'>
                            {parseInt(popupData?.price).toLocaleString('vi-VN')} VND
                        </p>
                        <p className='short_desc'>{popupData?.short_desc}</p>
                        <button className='btnCartPopup' onClick={handleViewDetail}>
                            <FontAwesomeIcon icon={faCartShopping} className='iconPopup' />
                            View Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
