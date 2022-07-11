//*                         React
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//*                         Store
import { updatePostById } from "../../store/post";
import "./EditPost.css";

function EditPost({ post }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState(post.content);
    const [imageUrl, setImageUrl] = useState(post.image_url);

    const user = useSelector(state => state.session.user);
    let posts = useSelector(state => state.posts);
    posts = Object.values(posts);




    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            postId: post.id,
            content,
        };

        const data = await dispatch(updatePostById(payload));
        console.log(payload);
        setContent("");
    }

    return (
        <div className="editPost">
            <div className='editPost-Header'>
                <div className="editPost__top">
                    <img src={`${user?.avatar}`} alt="avatar" className='header__avatar editPost__avatar' />
                    <form onSubmit={handleSubmit}>
                        <input className="editPost__input" value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder={`What's on your mind, ${user?.username}?`} />
                        {/* <input className="editPost__image" placeholder='Image URL (Optional)' value={imageUrl} onChange={imageUrl} /> */}
                        <button className="editPost__button" type="submit" onClick={handleSubmit}>Hidden</button>
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

export default EditPost;
