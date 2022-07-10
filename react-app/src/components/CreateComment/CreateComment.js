//*                         React
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//*                         Store
import { createComment } from '../../store/comment';

const CreateComment = ({ post }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);


    const [error, setError] = useState('');
    const [content, setContent] = useState('');

    const handleChange = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: user.id,
            content,
            post_id: post.id
        };

        const response = await dispatch(createComment(payload));
        setContent('');
    }

    return (
        <>
            <form onSubmit={handleChange}>
                <div className="commentBox">
                    <img src={`${user?.avatar}`} alt="avatar" className='comment__avatar' />
                    <input className="comment__input" value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder={`Have something to say, ${user?.username}?`} />
                    <button className="comment__button" type="submit" onClick={handleChange}>Hidden</button>
                </div>

            </form>
        </>
    )
};

export default CreateComment;
