import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts } from "../../store/post";
import moment from "moment";
import "./AllPosts.css";

function AllPosts() {
    const dispatch = useDispatch();


    let posts = useSelector(state => state.posts);
    posts = Object.values(posts);
    console.log(posts)


    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);





    const timeSince = (time) => {
        let now = moment();
        let then = moment(time);
        let diff = now.diff(then);
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
        <div className="allPosts">
            {posts.reverse().map(post => (
                <div className="post" key={post?.id}>
                    <div className="post__header">
                        <img src={post.user.avatar} alt="avatar" className="post__avatar" />
                        <div className="post__info">
                            <h3 className="post__username">{post?.user.username}</h3>
                            <p className="post__date">{timeSince(post?.created_at)}</p>
                        </div>
                    </div>
                    <div className="post__content post__bottom">
                        <p className="post__text">{post?.content}</p>
                        <img src={post?.image_url} alt="post" className="post__image" />
                    </div>
                    <div className="post__options">
                        <div className="post__option">
                            <i className="fas fa-heart"></i>
                        </div>

                        <div className="post__option">
                            {/* Edit icon */}
                            <i className="fas fa-edit"></i>
                        </div>

                        <div className="post__option">
                            {/* Delete button */}
                            <i className="fas fa-trash-alt"></i>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllPosts;
