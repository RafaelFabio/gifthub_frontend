import React, { useState } from 'react';
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';
import { Link } from 'react-scroll';

import logo from '../assets/GiftHub_logo.png';

import './navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <div className='header'>
            <nav className='navbar'>
                <Link to='banner' className='logo' spy={true} smooth={true} offset={50} duration={500}>
                    <img src={logo} alt='logo' />
                </Link>
                <div className='mobile-menu' onClick={handleClick}>
                    {click ? (<HiOutlineXMark size={30} style={{ color: '#000000' }} />)
                        : (<HiOutlineBars3 size={30} style={{ color: '#000000' }} />)}

                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to='banner' spy={true} smooth={true} offset={0} duration={500} onClick={closeMobileMenu}>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='about' spy={true} smooth={true} offset={-90} duration={500} onClick={closeMobileMenu}>Sobre GiftHub</Link>

                    </li>
                    <li className='nav-item'>
                        <Link to='instructions' spy={true} smooth={true} offset={-90} duration={500} onClick={closeMobileMenu}>¿Cómo usar GiftHub?</Link>
                    </li>
                    <li className='nav-item'>
                        <button className='nav-btn'><a href='/instructions'>Iniciar sesión</a></button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;