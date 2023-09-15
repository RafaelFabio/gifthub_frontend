import './footer.css'

function Footer() {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='footer-col-1'>
                    <h2>GiftHub</h2>
                    <p>La nueva forma de regalar</p>
                </div>
                <div className='footer-col-2'>
                <ul>
                    <li className='nav-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#about'>Sobre GiftHub</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#instructions'>¿Cómo usar GiftHub?</a>
                    </li>
                </ul>
                </div>
                <div className='bottom'>
                    <span className='line'></span>
                    <p>2023 GiftHub All rights reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
