//*                         React
// import { useEffect, useState } from 'react';
//eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';
// import { DateTime } from 'luxon';
import moment from 'moment';

//*                         Store
// import { getComments } from '../../store/comment';

//*                     Files & Components
import './CommentsContainer.css';
import EditCommentForm from '../EditComment/EditCommentForm';
import DeleteCommentForm from '../DeleteComment/DeleteCommentForm';
import verifiedIcon from '../../../images/3.bp.blogspot.png';


const CommentsContainer = ({ post, user }) => {
    // const dispatch = useDispatch();
    let comments = useSelector(state => state.comments);
    comments = Object?.values(comments);
    const posts = comments?.filter(comment => comment.post_id === post.id);
    // const postId = posts?.find(comment => comment.post_id === post.id);
    // const [timeStamp, setTimeStamp] = useState(timeSince(comments?.created_at));


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
                                    src={verifiedIcon}
                                    alt="verifiedIcon"
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
