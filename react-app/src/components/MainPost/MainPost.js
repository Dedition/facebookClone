import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./MainPost.css";


function MainChat() {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const user = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();


    }

    return (
        <div className="mainPost">
            <div className='postHeader'>
                <div className="mainPost__top">
                    <img src={`${user?.avatar}`} alt="avatar" className='header__avatar' />
                    <form>
                        <input className="mainPost__input" value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder={`What's on your mind, ${user?.username}?`} />
                        <input placeholder='Image URL (Optional)' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        <button className="mainPost__button" type="submit" onClick={handleSubmit}>Hidden</button>
                    </form>
                </div>

                <div className="mainPost__bottom">
                    <div className="mainPost__option">
                        {/* <i className="fas fa-camera"></i>
                        <h3>Photo/Video</h3> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainChat;
