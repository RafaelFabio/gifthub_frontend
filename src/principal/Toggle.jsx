import React from 'react';
import './Toggle.css';

import userIcon from "../assets/icons/user-black.svg";
import friendsIcon from "../assets/icons/friends-black.svg";

function Toggle({ friendsMode, toggleMode }) {
    return (
        <div className='toggle-row'>
            <img src={userIcon} className="icon" />
            <button className={`toggle-button ${friendsMode ? 'friends' : 'personal'}`} onClick={toggleMode}>
                <span className={`toggle-circle ${friendsMode ? 'friends' : 'personal'}`}></span>
            </button>
            <img src={friendsIcon} className="icon" />
        </div>
    );
}

export default Toggle;