//*                         React
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//*                         Store
import { updatePostById } from "../../store/post";

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
            image_url: imageUrl,
        };

        const data = await dispatch(updatePostById(payload));
        console.log(payload);
        setContent("");
        setImageUrl("");
    }

    return (
        <div className="mainPost">
            <div className='postHeader'>
                <div className="mainPost__top">
                    <img src={`${user?.avatar}`} alt="avatar" className='header__avatar' />
                    <form onSubmit={handleSubmit}>
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

export default EditPost;
