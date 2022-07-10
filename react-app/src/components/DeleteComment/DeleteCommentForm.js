//*                         React
import { useState } from "react";

//*                     Files & Components
import DeleteComment from "./DeleteComment";

const DeleteCommentForm = ({ comment }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <i className="fas fa-trash-alt" onClick={handleClick}></i>
            {isOpen && (
                <DeleteComment comment={comment} isOpen={setIsOpen} />
            )}
        </>
    );
}

export default DeleteCommentForm;
