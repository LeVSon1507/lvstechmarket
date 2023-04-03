import React from "react";
import './Banner.css'
import { useNavigate } from 'react-router-dom'

function Banner() {
    const navigate = useNavigate()
    const handleClickBtn = () => {
        navigate('/shopPage', { state: 'bannerBtn' })
    }
    return <div className="bannerContainer container-fluid">
        <div className="bannerImg container">
        </div>
        <div className="bannerContent">
            <p className="subTitle">NEW INSPIRATION 2020</p>
            <p className="title">20% OFF ON NEW <br />SEASON</p>
            <button className="browseCol" onClick={handleClickBtn}>Browse collections</button>
        </div>
    </div>;
}

export default Banner;
