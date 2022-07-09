import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import EditPostForm from '../EditPostForm/EditPostForm'
import { getPosts } from '../../store/post';
import { DateTime } from 'luxon';

function SinglePost({ post }) {
    const [timeStamp, setTimeStamp] = useState(timeSince(post?.created_at));
    const dispatch = useDispatch();


    // const validImg = new RegExp('^https?://(?:[a-z0-9-]+.)+[a-z]{2,6}(?:/[^/#?]+)+.(?:jpg|gif|png)$')
    // console.log(validImg);
    // useEffect(() => {
    //     const initialSetter = setInterval(() => {
    //         setTimeStamp(timeSince(post?.created_at));

    //         return () => clearInterval(initialSetter)

    //     }, 1000)
    // }, [timeStamp])

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    function timeSince(time) {
        let now = DateTime.now();
        const ISOString = new Date(time).toISOString();
        const then = DateTime.fromISO(ISOString);
        let diff = now.diff(then).toObject().milliseconds;
        if (diff < 1000) return "Just now";
        if (diff < 60000) return `${Math.floor(diff / 1000)} seconds ago`;
        if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
        if (diff < 2629800000) return `${Math.floor(diff / 604800000)} weeks ago`;
        if (diff < 31557600000) return `${Math.floor(diff / 2629800000)} months ago`;
        if (diff < 31557600000) return `${Math.floor(diff / 31557600000)} years ago`;
        return then.format("MMMM Do YYYY, h:mm:ss a");
    };



    return (
        <div className="post" key={post?.id}>
            <div className="post__header">
                <img src={post.user.avatar} alt="avatar" className="post__avatar" />
                <div className="post__info">
                    <h3 className="post__username">{post?.user.username}</h3>
                    <p className="post__date">{timeStamp}</p>
                </div>
            </div>
            <div className="post__content post__bottom">
                <p className="post__text">{post?.content}</p>
                {post?.image_url &&
                    <img src={post?.image_url} alt="post" className="post__image" id="post__image" />
                }
            </div>
            <div className="post__options">
                <div className="post__option">
                    <EditPostForm post={post} />
                    {/* <i className="fas fa-edit"></i> */}
                </div>

                <div className="post__option">
                    <i className="fas fa-heart"></i>
                </div>

                <div className="post__option">
                    <i className="fas fa-trash-alt"></i>
                </div>
            </div>
        </div>
    )
}

export default SinglePost
