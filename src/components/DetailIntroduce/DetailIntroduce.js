import React from "react";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import './DetailIntroduce.css';


function DetailIntroduce({ addToCart, handleIncrease, handleDecrease, dataProductDetail, quantity, cartAdded }) {
    return (<div className="detailContainer">
        <div className="container-fluid row">
            {/* 4 img */}
            <div className="imgGr col-md-2">
                <img src={dataProductDetail[0]?.img1} alt="img1" />
                <img src={dataProductDetail[0]?.img2} alt="img2" />
                <img src={dataProductDetail[0]?.img3} alt="img3" />
                <img src={dataProductDetail[0]?.img4} alt="img4" />
            </div>
            {/* main Img */}
            <div className="mainImg col-md-5">
                <img src={dataProductDetail[0]?.img1} alt="img1" className="mImg" />
            </div>
            <div className="imgGr col-md-5">
                {/* introducer */}
                <h1>{dataProductDetail[0]?.name}</h1>
                <p className='priceDetail'> {parseInt(dataProductDetail[0]?.price).toLocaleString('vi-VN')} VND</p>
                <p>{dataProductDetail[0]?.short_desc}</p>
                <p className="category"><h5>CATEGORY:</h5> {dataProductDetail[0]?.category}</p>
                <div className="wrapQuanAndBtnGr">
                    <div className="numberSelector">
                        <p className="quanText">QUANTITY</p>
                        <div className="btnCaretSelector">
                            {/* btn gr */}
                            <span className="number-selector-button" onClick={handleDecrease}>
                                <FontAwesomeIcon icon={faCaretLeft} className='iconCaret' />
                            </span>
                            <p className="quanNum">{quantity}</p>
                            <span className="number-selector-button" onClick={handleIncrease}>
                                <FontAwesomeIcon icon={faCaretRight} className='iconCaret' />
                            </span>
                        </div>
                    </div>
                    <button className={`addToCart ${cartAdded ? "added" : ""}`} onClick={() => addToCart(dataProductDetail[0])}>{cartAdded ? "Added to Cart!" : "Add To Cart"}</button>
                </div>
            </div>
        </div>
    </div>);
}

export default DetailIntroduce;
