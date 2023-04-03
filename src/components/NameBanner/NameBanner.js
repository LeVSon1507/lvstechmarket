import React from "react";
import './NameBanner.css';

function NameBanner({ name }) {
    return (<div className='bannerName'>
        <h1 className='titleName '>{name}</h1>
        <p className='subtitleName'>{name}</p>
    </div>);
}

export default NameBanner;
