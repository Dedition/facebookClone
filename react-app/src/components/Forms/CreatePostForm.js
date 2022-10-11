import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "../../store/post";

function CreatePostForm({ socket, setShowModal }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    let roomUrl = window.location.pathname;
    // let room = roomUrl.split("/")[2];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const validationErrors = [];

        if (roomUrl === "/home") roomUrl = `profile/${user.id}`;

        if (!content.length || content.trim().length === 0) validationErrors.push("Please write something!");

        if (content.length > 500) validationErrors.push("Your post exceeds 500 characters!");

        if (validationErrors.length) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            userId: user.id,
            content,
            roomUrl,
        };

        const post = await dispatch(createPost(payload));

        if (post) setContent("");

        await socket.emit("newPost", post);
        await socket.emit("newNotification", post);
        await socket.emit("newPostHome", post);

        setShowModal(false);
    };

    return (
        <div>
            <form className="create__post__wrapper" onSubmit={createPost}>
                <div className="create__post__header__container">
                    <div className="create__post__header">Create Post</div>
                    <button
                        className="close__modal"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <textarea
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    className="create__post__text__area"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    rows={10}
                    cols={35}
                    required
                    wrap="soft"
                    maxLength={1001}
                    placeholder="Whats on your mind?"
                />
                {errors.map((error, ind) => (
                    <div className="home__comment__errors" key={ind}>
                        {error}
                    </div>
                ))}
                <button className="create__post__text__button" onClick={createPost}>
                    Post
                </button>
            </form>
        </div>
}
