//*                         React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//*                         Store
import { editComment } from '../../store/comment';


const EditComment = ({ comment, post }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(comment.content);


    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleChange = (e) => {
        setContent(e.target.value);
    }

    // console.log(comment.id)
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            content,
            commentId: comment.id
        };

        dispatch(editComment(payload));
        setIsOpen(false);
        setContent("");
    }

    return (
        <>
            {/* <i className="fas fa-edit" onClick={handleClick}></i> */}
            <form onSubmit={handleSubmit}>
                <input value={content} onChange={handleChange}></input>
                <button type="submit" className="mainPost__button">Submit</button>
            </form>
        </>
    );
}
export default EditComment;
