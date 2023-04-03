import React from "react";
import './Footer.css'

function Footer() {
    return (
        <div className="footerContainer container-fluid" >
            <div className="footerWrap row">
                <div className="gr1 col-md-4 col-6">
                    <ul>
                        <h5>CUSTOMER SERVICES</h5>
                        <li>Help a Contact Us</li>
                        <li>Returns & Refunds</li>
                        <li>Online Stores</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
                <div className="gr2 col-md-4 col-6">
                    <ul>
                        <h5>COMPANY</h5>
                        <li>What We Do</li>
                        <li>Available Services</li>
                        <li>Latest Posts</li>
                        <li>FAQs</li>
                    </ul>
                </div>
                <div className="gr3 col-md-4 col-12">
                    <ul>
                        <h5>SOCIAL MEDIA</h5>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>Facebook</li>
                        <li>Pinterest</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
