//*                         React
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//*                         Store
import { createComment } from '../../store/comment';

const CreateComment = ({ post }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [errors, setErrors] = useState([]);
    const [warning, setWarning] = useState(false);
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

    useEffect((err = [], warning = []) => {
        if (content.length < 1) warning.push('');
        if (content.length >= 240) err.push("Oops! Content must be less than 240 characters.");
        setErrors(err);
        setWarning(warning);
    }, [content]);

    return (
        <>
            <form onSubmit={handleChange}>
                <div className="commentBox">
                    <ul className="modal-errors">
                        {errors.map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                    <div className='commentBox__top'>
                        <img src={`${user?.avatar}`} alt="avatar" className='comment__avatar' />
                        <input className="comment__input" value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder={`Please type something to send, ${user?.username}`} />
                        <button className="comment__button" type="submit" disabled={!!errors.length || !!warning.length} onClick={handleChange}>Hidden</button>
                    </div>
                </div>

            </form>
        </>
    )
};

export default CreateComment;
