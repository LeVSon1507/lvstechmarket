import React from "react";
import './ListOfCategories.css';
import { useNavigate } from "react-router-dom";

function ListOfCategories() {
    const navigate = useNavigate()
    const goToShopPage = () => {
        navigate('/shopPage', { state: "className" })
    }
    return (
        <div className="container-fluid">
            <div className="titleGr">
                <p className="subTitleCategory">CAREFULLY CREATED COLLECTIONS</p>
                <p className="titleCategory">BROWSE OUR CATEGORIES</p>
            </div>
            <div className="categoriesContainer container">

                <div className="row r1">
                    <div className="imgCol1 col-md-6 col-12  my-1">
                        <div className="iphoneImg" onClick={goToShopPage} />
                    </div>
                    <div className="imgCol2 col-md-6 col-12 my-1">
                        <div className="macImg" onClick={goToShopPage} />
                    </div>
                </div>
                <div className="row r2">
                    <div className="img3 col-md-4 col-12 my-1">
                        <div className="ipadImg" onClick={goToShopPage} />
                    </div>
                    <div className="img4 col-md-4 col-12 my-1">
                        <div className="watchImg" onClick={goToShopPage} />
                    </div>
                    <div className="img5 col-md-4 col-12 my-1">
                        <div className="airPodImg" onClick={goToShopPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListOfCategories;
