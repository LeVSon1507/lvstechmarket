import React, { useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { showPopup } from "../../redux/action/action";
import Popup from "../Popup/Popup";
import useFetch from "../../customHooks/useFetch";
import { URL } from "../../URL";

import './ProductList.css';
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";


function ProductList({ category, isShopPage, searchValue }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isShow = useSelector(state => state.popupReducer.isShowPopup);
    const { data, isLoading } = useFetch(URL);
    const showProductDetail = (product) => {
        dispatch(showPopup(product));
    }
    const gotoDetailPage = (product) => {
        navigate(`../detail/${product._id.$oid}`, { productId: product._id })
    }

    const ProductItem = ({ product }) => {
        return useMemo(() => (
            <div
                className={`productItemContainer ${isShopPage ? 'col-md-4' : 'col-md-3'} col-12 my-4`}
                key={`${product._id}+${product.name}`}
            >
                <img src={product.img1} alt="productImg" className="productImg"
                    onClick={isShopPage ? () => gotoDetailPage(product) : () => showProductDetail(product)} />
                <p className="productName">{product.name}</p>
                <p className="productPrice">
                    {parseInt(product?.price).toLocaleString('vi-VN')} VND
                </p>
            </div>
        ), [product]);

    };

    return (
        <div className="container-fluid">
            {!isShopPage && <div className="titleGrProduct">
                <p className="subTitleProduct">MADE THE HARD WAY</p>
                <p className="titleProduct">TOP TRENDING PRODUCTS</p>
            </div>}
            <div className="productContainer container">
                <div className="rowCustom row">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        searchValue ?
                            data?.filter(product => product.name.includes(searchValue))
                                ?.filter(product => !category || product.category === category)
                                ?.slice(0, 8)
                                ?.map(product => (
                                    <ProductItem key={`${product._id}+${product.name}`} product={product} />
                                )) :
                            data
                                ?.filter(product => !category || product.category === category)
                                ?.slice(0, 8)
                                ?.map(product => (
                                    <ProductItem key={`${product._id}+${product.name}`} product={product} />
                                ))
                    )}
                </div>
                {isShow && (
                    <div className="popupContainer">
                        <Popup />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList;
