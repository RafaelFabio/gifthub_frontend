import { Link } from "react-router-dom"
import "./Navigation.css"

import homeIcon from "../assets/icons/home-black.svg";
import heartIcon from "../assets/icons/heart-black.svg";
import infoIcon from "../assets/icons/info-black.svg";
import logoutIcon from "../assets/icons/logout-black.svg";
import userIcon from "../assets/icons/user-black.svg";
import giftHubLogo from "../assets/GiftHub_logo.png";

import { logoutUser } from "../authService.js"

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
                    <Link to="/principal">
                        <img src={heartIcon} className="icon" />
                    </Link>
                    <Link to="/instructions">
                        <img src={infoIcon} className="icon" />
                    </Link>
                </div>
                <div className="menu-group2">
                    <Link to={"/profile"}>
                        <img src={userIcon} className="icon" />
                    </Link>
                    {/* Se hace logout del usuario */}
                    <Link to={"/"} onClick={logoutUser}>
                        <img src={logoutIcon} className="icon" />
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Navigation