import { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './Header.css';



function Header() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);




    const [name, setName] = useState('');


    return (
        <div className="splash__header">
            <div className="splash__header__left">
                <img src="/images/fblogopng.png" alt="logo" className='fb__logo' />

                {/* <div className="splash__header__input">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search" />
                </div> */}
            </div>

            <div className="splash__header__center">
                <div className='splash__header__option header__option--active'>
                    <i className="fa-solid fa-home"></i>
                </div>

                <div className="splash__header__option header__option--active">
                    <a href="https://github.com/Dedition">
                        <i className="fa-brands fa-github" ></i>
                    </a>
                </div>

                <div className="splash__header__option header__option--active">
                    <a href="https://www.linkedin.com/in/leo-l-79a260b0/">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>

                {/* <div className="splash__header__option">
                </div> */}

                {/* <div className="splash__header__option">
                    <i className="fa-solid fa-user-group"></i>
                </div> */}
            </div>

            <div className="splash__header__right">
                <div className='splash__header__info'>
                    <img src={`${user?.avatar}`} alt="avatar" className='header__avatar' />
                    <h3>{user?.username}</h3>
                </div>
                <div className='logout__button'>
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}

export default Header;
