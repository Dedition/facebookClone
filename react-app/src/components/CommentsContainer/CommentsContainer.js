//*                         React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';

//*                         Store
import { getComments } from '../../store/comment';

//*                     Files & Components
import './CommentsContainer';
import EditCommentForm from '../EditComment/EditCommentForm';
import DeleteCommentForm from '../DeleteComment/DeleteCommentForm';


const CommentsContainer = ({ post }) => {
    const dispatch = useDispatch();
    let comments = useSelector(state => state.comments);
    comments = Object?.values(comments);
    const posts = comments?.filter(comment => comment.post_id === post.id);
    // const postId = posts?.find(comment => comment.post_id === post.id);
    // const [timeStamp, setTimeStamp] = useState(timeSince(comments?.created_at));
    const user = useSelector(state => state.user);



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
            <div className="comments-container__header">
            </div>
            <div className="comments-container__body">
                {posts?.map(comment => (
                    <div className={`comments-container__body__comment comments__show ${comment?.user.username === user?.username && `myself`}`} key={comment.id}>
                        {/* <img src={comment.user.avatar} alt="avatar" /> */}
                        <div className="comments-container__body__comment__header">
                            <h3>{comment.user.username}</h3>
                            <p className='timestamp'>{timeSince(comment.created_at)}</p>
                            <div className="comments-container__body__comment__body">
                                <p>{comment.content}</p>
                            </div>
                        </div>
                        <EditCommentForm comment={comment} />
                        <DeleteCommentForm comment={comment} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentsContainer;
