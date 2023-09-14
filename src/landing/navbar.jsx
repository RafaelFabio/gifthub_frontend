//import React from 'react';
import React, { useState } from 'react';
import {HiOutlineBars3, HiOutlineXMark} from 'react-icons/hi2';

import logo from '../assets/GiftHub_logo.png';

import './navbar.css';

function Navbar(){
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <div className='header'>
            <nav className='navbar'>
                <a href='/' className='logo'>
                    <img src={logo} alt='logo' />
                </a>
                <div className='mobile-menu' onClick={handleClick}>
                    {click ? (<HiOutlineXMark size={30} style={{ color: '#000000' }} />)
                        : (<HiOutlineBars3 size={30} style={{ color: '#000000' }} />)}

                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <a href='/' onClick={closeMobileMenu}>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#about' onClick={closeMobileMenu}>Sobre GiftHub</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#instrucciones' onClick={closeMobileMenu}>Como usar GiftHub?</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#testimonios' onClick={closeMobileMenu}>Testimonios</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#contacto' onClick={closeMobileMenu}>Contacto</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;