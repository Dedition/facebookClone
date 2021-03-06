//*                         React
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
// import moment from 'moment';

//*                         Store
import { getPosts } from '../../store/post';

//*                     Files & Components
import EditPostForm from '../EditPost/EditPostForm'
import DeleteButtonForm from '../DeleteButtonForm/DeleteButtonForm';
import Comments from '../Comments/Comments';
import CreateComment from '../CreateComment/CreateComment';
import verifiedIcon from '../../images/3.bp.blogspot.png';



function SinglePost({ post }) {
    const dispatch = useDispatch();
    const [timeStamp, setTimeStamp] = useState(timeSince(post?.created_at));

    const user = useSelector(state => state.session.user);


    useEffect(() => {
        const initialSetter = setInterval(() => {
            setTimeStamp(timeSince(post?.created_at));

            return () => clearInterval(initialSetter)

        }, 1000)
    }, [timeStamp])

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    function timeSince(time) {
        // const now = moment();
        // const then = moment(time);
        // const diff = now.diff(then, 'minutes');

        let now = DateTime.now();
        const ISOString = new Date(time).toISOString();
        const then = DateTime.fromISO(ISOString);
        let diff = now.diff(then).toObject().milliseconds;
        if (diff < 1000) return "Just now";
        if (diff < 2000) return `${Math.floor(diff / 1000)} second ago`;
        if (diff < 60000) return `${Math.floor(diff / 1000)} seconds ago`;
        if (diff < 120000) return `${Math.floor(diff / 60000)} minute ago`;
        if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
        if (diff < 7200000) return `${Math.floor(diff / 3600000)} hour ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
        if (diff < 172800000) return `${Math.floor(diff / 86400000)} day ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
        if (diff < 1209600000) return `${Math.floor(diff / 604800000)} week ago`;
        if (diff < 2629800000) return `${Math.floor(diff / 604800000)} weeks ago`;
        if (diff < 5259490000) return `${Math.floor(diff / 2629800000)} month ago`;
        if (diff < 31557600000) return `${Math.floor(diff / 2629800000)} months ago`;
        if (diff < 31557600000) return `${Math.floor(diff / 31557600000)} year ago`;
        if (diff < 31557600000) return `${Math.floor(diff / 31557600000)} years ago`;
        return then.format("MMMM Do YYYY, h:mm:ss a");
    };



    return (
        <div className="single-post">
            <div className="post" key={post?.id}>
                <div className="post__header">
                    <img src={post?.user.avatar} alt="avatar" className="post__avatar" />
                    <div className="post__info">
                        <h3 className="post__username">{post?.user.username} <img src={verifiedIcon} alt="user_verified" className='user__verified'></img></h3>
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
                    {user?.id === post?.user_id &&
                        <div className="post__option">
                            <EditPostForm post={post} />
                            {/* <i className="fas fa-edit"></i> */}
                        </div>
                    }
                    {/* <div className="post__option">
                        <i className="fas fa-heart"></i>
                    </div> */}
                    {user?.id === post?.user_id &&
                        <div className="post__option">
                            <DeleteButtonForm post={post} timeStamp={setTimeStamp} />
                        </div>
                    }
                </div>
                <div className="createComment__commentContainer">
                    <CreateComment post={post} user={user} />
                    <Comments post={post} user={user} />
                </div>
            </div>

        </div>
    )
}

export default SinglePost
