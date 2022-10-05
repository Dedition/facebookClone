import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { createPost } from "../../store/post";

function createPostForm({ socket, setShowModal }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    let roomUrl = window.location.pathname;

    const createPost = async (e) => {
        e.preventDefault();

        setErrors([]);

        const validationErrors = [];

        if (roomUrl === "/") {
            roomUrl = `/profile/${user.id}`;
        }

        if (!content.length || content.trim().length === 0) {
            validationErrors.push("Content is required to create a post");
        }
        if (content.length > 140) {
            validationErrors.push("Content is too long. Must be less than 140 characters")
        }

        if (validationErrors.length) {
            setErrors(validationErrors);
        }

        const payload = {
            user_id: user.id,
            content,
            roomUrl,
        };

        await dispatch(createPost(payload));

        socket.emit("newPost", payload);
        socket.emit("newNotification", payload);
        socket.emit("createPost", payload);
    }

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
                {errors.map((err, idx) => (
                    <div className="home__comment__errors" key={idx}>
                        {err}
                    </div>
                ))}
                <button className="create__post__text__button" onClick={createPost}>
                    Post
                </button>
            </form>
        </div>
    );
}


export default createPostForm;
