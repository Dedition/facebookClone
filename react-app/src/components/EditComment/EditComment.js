//*                         React
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

//*                         Store
import { editComment } from '../../store/comment';


const EditComment = ({ comment, isOpen }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(comment.content);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            content,
            commentId: comment.id
        };


        dispatch(editComment(payload));
        isOpen(false);
        setContent("");
    }

    useEffect((errors = []) => {
        if (content.length < 1) errors.push("Content is required to update a comment");

        if (content.length > 140) errors.push("Content is too long. Must be less than 140 characters")

        setErrors(errors);
    }, [content]);

    return (
        <>
            {/* <i className="fas fa-edit" onClick={handleClick}></i> */}
            <form onSubmit={handleSubmit}>
                <ul className="modal-errors">
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
                <input value={content} onChange={handleChange} className="edit-comment__input"></input>
                <button type="submit" className="editPost__button" disabled={!!errors.length}>Submit</button>
            </form>
        </>
    );
}
export default EditComment;
