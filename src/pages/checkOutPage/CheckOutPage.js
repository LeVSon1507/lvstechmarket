import React, { useState } from "react";
import './CheckOutPage.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/action/action";
import Livechat from "../../components/Livechat/Livechat";

function CheckOutPage() {
    const navigate = useNavigate();
    const product = useSelector(state => state.cartReducer.listCart);

    const dispatch = useDispatch();
    const handleGoTo = (link) => {
        navigate(`../${link}`)
    }
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
    });

    const validateInputs = () => {
        let errors = {};
        if (!user.fullName.trim()) {
            errors.fullName = 'Full name is required';
        }
        if (!user.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!user.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(user.phone)) {
            errors.phone = 'Phone number is invalid';
        }
        if (!user.address.trim()) {
            errors.address = 'Address is required';
        }
        return errors;
    };
    const handleInputChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const handleOrder = (e) => {
        setErrors(validateInputs());
        e.preventDefault();
        const isValid = Object.keys(validateInputs()).length === 0;
        if (isValid) {
            navigate('../');
            alert('Order Success!!')
            dispatch(resetCart())
        }
    };


    const renderCheckOutTable = () => {
        return (
            <div className="checkOutTbContainer container-fluid">
                <p className="checkOutTitle">FULL NAME:</p>
                <input
                    type="text"
                    className="checkoutIp"
                    placeholder="Enter Your Full Name Here!"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                />
                {errors.fullName && <div className='error'>{errors.fullName}</div>}
                <p className="checkOutTitle">EMAIL:</p>
                <input
                    type="text"
                    className="checkoutIp"
                    placeholder="Enter Your Email Here!"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                />
                {errors.email && <div className='error'>{errors.email}</div>}
                <p className="checkOutTitle">PHONE NUMBER: </p>
                <input
                    type="text"
                    className="checkoutIp"
                    placeholder="Enter Your Phone Number Here!"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                />
                {errors.phone && <div className='error'>{errors.phone}</div>}
                <p className="checkOutTitle">ADDRESS: </p>
                <input
                    type="text"
                    className="checkoutIp"
                    placeholder="Enter Your Address Here!"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                />
                {errors.address && <div className='error'>{errors.address}</div>}
                <button className="order" onClick={(e) => handleOrder(e)}>
                    Place order
                </button>
            </div>
        )
    }
    const renderCheckOutTotal = () => {
        const total = product.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        const grandTotal = total.toLocaleString('vi-VN')
        const productList = product.map(item => {
            const formatPrice = parseInt(item.price).toLocaleString('vi-VN')
            return (
                <div className="productCheckOutContainer">
                    <div className="productCheckOutName">{item.name}</div>
                    <div className="productCheckOutPriceAndQtt">
                        <div className="productCheckOutPrice">
                            {formatPrice} VND </div>
                        <div className="productCheckOutQtt"> x {item.quantity}</div>
                    </div>
                </div>
            )
        })
        return (
            <div className='wrapTotal container'>
                <h5 className='titleTotal'>YOUR ORDER</h5>
                {productList}
                <div className='totalgr'>
                    <p className='ttTitle'>total</p>
                    <p className='ttPrice'>{grandTotal} VND</p>
                </div>
            </div>
        );
    };
    return (
        <div className='checkOutPageContainer'>
            <div className='checkOutPageContent'>
                <NavBar />
                <div className='bannerName'>
                    <h1 className='titleName'>checkout</h1>
                    <p className='subtitleName'>
                        <p className="checkOutPath" onClick={() => handleGoTo(``)}> home </p>
                        /  <p className="checkOutPath" onClick={() => handleGoTo(`cartPage`)}> cart </p>
                        / <p className="checkOutZ"> checkout </p>
                    </p>
                </div>
                <div className='checkOutContainer'>
                    <h4 className='titleCheckOut'>BILLING DETAILS</h4>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-8 row'>
                                {renderCheckOutTable()}
                            </div>
                            <div className='col-md-4 container totalCheckout'>{renderCheckOutTotal()}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Livechat />
        </div>
    );
}

export default CheckOutPage;
