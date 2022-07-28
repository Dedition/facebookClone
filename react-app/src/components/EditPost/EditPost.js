//*                         React
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//*                         Store
import { updatePostById } from "../../store/post";
import "./EditPost.css";

function EditPost({ post, isOpen }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState(post.content);
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);




    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            postId: post.id,
            content,
        };

        await dispatch(updatePostById(payload));
        setContent("");
        isOpen(false);
    }

    useEffect((errors = []) => {
        if (content.length < 1) errors.push("Content is required to update a post");

        if (content.length > 140) errors.push("Content is too long. Must be less than 140 characters")

        setErrors(errors);
    }, [content]);

    return (
        <div className="editPost">
            <div className='editPost-Header'>
                <div className="editPost__top">
                    {/* <img src={`${user?.avatar}`} alt="avatar" className='header__avatar editPost__avatar' /> */}
                    <h3 style={{ "color": "whitesmoke" }}>Post Contents</h3>
                    <form onSubmit={handleSubmit}>
                        <ul className="modal-errors">
                            {errors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                        <input className="editPost__input" value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder={`What's on your mind, ${user?.username}?`} />
                        {/* <input className="editPost__image" placeholder='Image URL (Optional)' value={imageUrl} onChange={imageUrl} /> */}
                        <button className="editPost__button" type="submit" onClick={handleSubmit} disabled={!!errors.length}>Hidden</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPost;
