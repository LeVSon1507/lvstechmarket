import React, { useState } from "react";
import './Livechat.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperPlane, faPaperclip, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Livechat() {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        const messIcon = document.getElementById('messenger-icon');
        messIcon.classList.add('shake')
        setTimeout(() => {
            messIcon.classList.remove('shake')
        }, 500);
        setShowPopup(!showPopup);
    };

    return (
        <div>
            <div id="messenger-icon" onClick={togglePopup}></div>
            <div id="chat-popup" className={showPopup ? '' : 'chat-popup-hidden'}>
                {/* Chat widget code from Tawk.to or LiveChat goes here */}
                <div className="wraptitleLiveChat">
                    <p className="titleLiveChat">Customer Support</p>
                    <p className="titleLiveChatsub">Let's Chat App</p>
                </div>
                <div className="chatGr">
                    <p className="me">Xin chào</p>
                    <p className="meLong">Làm thế nào để xem các sản phẩm</p>
                    <div className="adminChat">
                        <FontAwesomeIcon icon={faUserCircle} className="adminIcon" />
                        <p className="admin"> ADMIN: Chào bạn</p>
                    </div>
                    <div className="adminChat">
                        <FontAwesomeIcon icon={faUserCircle} className="adminIcon2" />
                        <p className="adminLong">ADMIN: Bạn có thể vào mục shop để xem các sản phẩm</p>
                    </div>

                </div>
                <div className="footer">
                    <FontAwesomeIcon icon={faUserCircle} className="adminIcon3" />
                    <input type="text" className="mess" placeholder="Enter Message!" />
                    <FontAwesomeIcon icon={faPaperclip} className="adminIcon4" />
                    <FontAwesomeIcon icon={faFaceSmile} className="adminIcon5" />
                    <FontAwesomeIcon icon={faPaperPlane} className="adminIcon6" />
                </div>
            </div>
        </div>
    );
}

export default Livechat;
