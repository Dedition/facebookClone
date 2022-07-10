//*                         React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import moment from 'moment';

//*                         Store
import { getComments } from '../../store/comment';

//*                     Files & Components
import './CommentsContainer.css';
import EditCommentForm from '../EditComment/EditCommentForm';
import DeleteCommentForm from '../DeleteComment/DeleteCommentForm';


const CommentsContainer = ({ post, user }) => {
    const dispatch = useDispatch();
    let comments = useSelector(state => state.comments);
    comments = Object?.values(comments);
    const posts = comments?.filter(comment => comment.post_id === post.id);
    // const postId = posts?.find(comment => comment.post_id === post.id);
    // const [timeStamp, setTimeStamp] = useState(timeSince(comments?.created_at));

    // console.log(posts, 'comments')


    function timeSince(time) {
        let now = DateTime.now();
        const ISOString = new Date(time).toISOString();
        const then = DateTime.fromISO(ISOString);
        let diff = now.diff(then).toObject().milliseconds;
        if (diff < 1000) return "Just now";
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

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);


    return (
        <div className="comments-container">
            {posts?.map(comment => (
                <div
                    className="home__each__comment__container"
                    key={comment.id}
                >
                    <div className="home__comment__user__left">
                        <img
                            className="comment__avatar"
                            src={comment.user.avatar}
                            alt="commentAvatar"
                        />
                    </div>
                    <div className="home__comment__container">
                        <div className="home__comment__content">
                            <div className="home__comment__user__text">
                                {comment.user.username} <img
                                    src="/images/3.bp.blogspot.png"
                                    className='user__verified'>
                                </img>
                            </div>

                            {comment.content}
                            <span className="home__comment__username__created">
                                {moment(comment.created_at).calendar()}
                            </span>
                        </div>

                        {comment.user.username === user?.username && (
                            <div>
                                <EditCommentForm comment={comment} />
                                <DeleteCommentForm comment={comment} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommentsContainer;
