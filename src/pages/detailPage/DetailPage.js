import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";


import { URL } from "../../URL";
import useFetch from "../../customHooks/useFetch";

import './DetailPage.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import DetailIntroduce from "../../components/DetailIntroduce/DetailIntroduce";
import ProductList from "../../components/ProductList/ProductList";
import { Loading } from "../../components/Loading/Loading";
import { addToCart } from "../../redux/action/action";
import Livechat from "../../components/Livechat/Livechat";

function DetailPage() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const { data, isLoading } = useFetch(URL);
    const [quantity, setQuantity] = useState(1);
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const dataProductDetail = data.filter(product => product._id.$oid === id)
    const dataRelated = data.filter(product => product?.category === dataProductDetail[0]?.category)
    const [cartAdded, setCartAdded] = useState(false);
    const handleAddToCart = (product) => {
        const dataProductNew = {
            ...product,
            quantity: quantity
        }
        setCartAdded(true);
        setTimeout(() => {
            setCartAdded(false);
        }, 1000);
        dispatch(addToCart(dataProductNew))
    }



    return (
        isLoading ?
            <>
                {< Loading />}
            </> :
            <>
                <div className="shopPageContainer">
                    <div className="shopPageContent">
                        <NavBar cartAdded={cartAdded} />
                        {/* detail header */}
                        <DetailIntroduce
                            dataProductDetail={dataProductDetail}
                            handleDecrease={handleDecrease}
                            handleIncrease={handleIncrease}
                            addToCart={handleAddToCart}
                            quantity={quantity}
                            cartAdded={cartAdded}
                        />
                        {/* detail description */}
                        <button className="description">DESCRIPTION</button>
                        <p className="desTitle">PRODUCT DESCRIPTION</p>
                        <p className="longDesText">{(dataProductDetail[0]?.long_desc)}</p>

                        {/* footer detail */}
                        <p className="desTitle">RELATED PRODUCTS</p>
                        <div className="footerDetail">
                            <ProductList
                                dataRelated={dataRelated}
                                isShopPage={true}
                                category={dataProductDetail[0]?.category}
                            />
                        </div>
                    </div>
                    <Footer />
                    <Livechat />
                </div>
            </>
    );
}

export default DetailPage;
