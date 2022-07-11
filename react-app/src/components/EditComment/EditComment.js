//*                         React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//*                         Store
import { editComment } from '../../store/comment';


const EditComment = ({ comment, post, isOpen }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(comment.content);


    const handleClick = () => {
        isOpen(!isOpen);
    }

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

    return (
        <>
            {/* <i className="fas fa-edit" onClick={handleClick}></i> */}
            <form onSubmit={handleSubmit}>
                <input value={content} onChange={handleChange} className="edit-comment__input"></input>
                <button type="submit" className="editPost__button">Submit</button>
            </form>
        </>
    );
}
export default EditComment;
