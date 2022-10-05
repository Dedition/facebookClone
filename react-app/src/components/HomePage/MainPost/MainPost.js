import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../../store/post';

import "./MainPost.css";


function MainChat() {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const ref = React.useRef();

    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = [];

        ref.current.value = "";
        const formData = new FormData();
        formData.append("content", content);
        formData.append("image_url", imageUrl);



        const data = await dispatch(createPost(formData));
        console.log(data);
        if (data?.includes("content : This field is required.")) {
            err.push("Content: This field is required.");
        }

        setContent("");
        setImageUrl("");

        setErrors(err);
    }

    useEffect((err = []) => {
        if (content.length >= 140) err.push("Oops! Content must be less than 140 characters.");
        setErrors(err);
    }, [content]);

    // useEffect((errors = []) => {
    //     if (content.length < 1) errors.push("Content is required to create a post");

    //     if (content.length > 140) errors.push("Content is too long. Must be less than 140 characters")

    //     setErrors(errors);
    // }, [content]);

    return (
        <div className="mainPost">
            <div className='postHeader'>
                <div className="mainPost__top">
                    <img src={`${user?.avatar}`} alt="avatar" className='header__avatar' />
                    <form onSubmit={handleSubmit} className="form__outline">
                        <ul className="modal-errors">
                            {errors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                        <input
                            className="mainPost__input"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            type="text"
                            placeholder={`What's on your mind, ${user?.username}?`} />

                        <input
                            className='mainPost__image'
                            draggable="false"
                            type="file"
                            ref={ref}
                            accept="image/png, image/jpeg, image/png, image/gif"
                            name="image_url"
                            onChange={(e) => setImageUrl(e.target.files[0])}
                        />
                        <button className="mainPost__button" type="submit" onClick={handleSubmit} disabled={!!errors.length}><span>Submit</span></button>
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
