import React from 'react';
import './NewWish.css';

import addIcon from "../assets/icons/add-black.svg";

function NewWish() {
    return (
        <div className='new-wish'>
            <form>
                <div className='form-column'>
                    <input className='wish'
                        type="text"
                        placeholder='Deseo'
                        required
                    />
                    <input className='description'
                        type="text"
                        placeholder='Descripción'
                        required
                    />
                </div>
                <h1>$</h1>
                <div className='form-column'>
                    <input className='price'
                        type="number"
                        placeholder='0,0'
                        required
                    />
                </div>
            </form>

            <button className="add-button" type="submit">
                <img src={addIcon} />
            </button>
        </div>
    );
}

export default NewWish;