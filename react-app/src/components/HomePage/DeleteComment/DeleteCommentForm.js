//*                         React
import { useState } from "react";

//*                     Files & Components
import DeleteComment from "./DeleteComment";
import { Modal } from '../../../context/Modal';

const DeleteCommentForm = ({ comment }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <i className="fas fa-trash-alt" onClick={handleClick}></i>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <DeleteComment comment={comment} isOpen={setIsOpen} />
                </Modal>
            )}
        </>
    );
}

export default DeleteCommentForm;
