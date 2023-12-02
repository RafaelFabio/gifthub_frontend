import React, { useState } from 'react';
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';
import { Link } from 'react-scroll';
import { Link as RouterLink } from "react-router-dom"
import { getToken } from '../authService';

import logo from '/GiftHub_logo.png';

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
                    {getToken() ?
                        <li className='nav-item'>
                            <button className='nav-btn'><RouterLink to="/principal">¡Entrar!</RouterLink></button>
                        </li>
                        :
                        <>
                            <li className='nav-item'>
                                <button className='nav-btn'><Link to='banner' spy={true} smooth={true} offset={0} duration={500} onClick={closeMobileMenu}>Iniciar Sesión</Link></button>
                            </li>
                            <li className='nav-item'>
                                <button className='nav-btn'><RouterLink to="/register">¡Crea tu cuenta!</RouterLink></button>
                            </li>
                        </>}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;