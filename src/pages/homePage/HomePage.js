import React from "react";


// internal
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import ListOfCategories from "../../components/ListOfCategories/ListOfCategories";
import NavBar from "../../components/NavBar/NavBar";
import OtherInfo from "../../components/OtherInfo/OtherInfo";
import ProductList from "../../components/ProductList/ProductList";


import './HomePage.css'
import Livechat from "../../components/Livechat/Livechat";

function HomePage() {
    return (
        <div className="homeContainer">
            <div className="homeContent">
                <NavBar />
                <Banner />
                <ListOfCategories />
                <ProductList />
                <OtherInfo />
                <Livechat />
            </div>
            <Footer />
        </div>

    );
}

export default HomePage;
