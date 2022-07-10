import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/post';

import "./MainPost.css";


function MainChat() {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", content);
        formData.append("image_url", imageUrl);


        const data = await dispatch(createPost(formData));
        console.log(formData);
        setContent("");
        setImageUrl("");
    }

    return (
        <div className="mainPost">
            <div className='postHeader'>
                <div className="mainPost__top">
                    <img src={`${user?.avatar}`} alt="avatar" className='header__avatar' />
                    <form onSubmit={handleSubmit} className="form__outline">
                        <input
                            className="mainPost__input"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            type="text"
                            placeholder={`What's on your mind, ${user?.username}?`} />

                        <input
                            draggable="false"
                            type="file"
                            accept="image/png, image/jpeg, image/png, image/gif"
                            name="image_url"
                            onChange={(e) => setImageUrl(e.target.files[0])}
                        />
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
