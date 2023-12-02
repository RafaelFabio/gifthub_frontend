import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import "./Navigation.css"

import homeIcon from "../assets/icons/home-black.svg";
import heartIcon from "../assets/icons/heart-black.svg";
import infoIcon from "../assets/icons/info-black.svg";
import logoutIcon from "../assets/icons/logout-black.svg";
import userIcon from "../assets/icons/user-black.svg";
import adminIcon from "../assets/icons/config-black.svg";
import giftHubLogo from "/GiftHub_logo.png";

import { logoutUser, getToken, decodeToken, getUserInfo } from "../authService.js"

function Navigation() {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = getToken();
                const decoded = await decodeToken(token);
                const user_id = decoded["sub"];
                const user = await getUserInfo(user_id);
                // console.log(user.role)
                setUserRole(user.role);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();
    }, []);


    const isAdmin = userRole === 'admin';

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
                    {isAdmin && (
                        <Link to="/admin">
                            <img src={adminIcon} className="icon" alt="Admin" />
                        </Link>
                    )}
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