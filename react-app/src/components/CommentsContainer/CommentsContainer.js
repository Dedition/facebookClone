//*                         React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//*                         Store
import { getComments } from '../../store/comment';

//*                     Files & Components
import './CommentsContainer';


const CommentsContainer = ({ post, timeStamp }) => {
    const dispatch = useDispatch();
    let comments = useSelector(state => state.comments);
    comments = Object?.values(comments);
    const posts = comments?.filter(comment => comment.post_id === post.id);
    // const postId = posts?.find(comment => comment.post_id === post.id);

    useEffect(() => {
        dispatch(getComments());
    }, [dispatch]);


    return (
        <div className="comments-container">
            <div className="comments-container__header">
            </div>
            <div className="comments-container__body">
                {posts?.map(comment => (
                    <div className="comments-container__body__comment" key={comment.id}>
                        <div className="comments-container__body__comment__header">
                            <h3>{comment.user.username}</h3>
                            <p>{comment.created_at}</p>
                        </div>
                        <div className="comments-container__body__comment__body">
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentsContainer;
