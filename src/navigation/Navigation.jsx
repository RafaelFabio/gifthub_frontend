import { Link } from "react-router-dom"
import "./Navigation.css"

import homeIcon from "../assets/icons/home-black.svg";
import heartIcon from "../assets/icons/heart-black.svg";
import infoIcon from "../assets/icons/info-black.svg";
import userIcon from "../assets/icons/user-black.svg";
import giftHubLogo from "../assets/GiftHub_logo.png";

function Navigation() {
    return (
        <div className='header'>
            <nav className='navbar'>
                <Link to="/">
                    <img src={giftHubLogo} className="icon" />
                </Link>
                <div className="menu-group">
                    <Link to="/landing">
                        <img src={homeIcon} className="icon" />
                    </Link>
                    <Link to="/">
                        <img src={heartIcon} className="icon" />
                    </Link>
                    <Link to="/instructions">
                        <img src={infoIcon} className="icon" />
                    </Link>
                </div>
                <Link to="/">
                    <img src={userIcon} className="icon" />
                </Link>
            </nav>
        </div>
    )
}

export default Navigation