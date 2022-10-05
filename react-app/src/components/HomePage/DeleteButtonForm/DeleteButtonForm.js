//*                         React
import { useState } from "react";

//*                     Files & Components
import DeletePost from "./DeletePost/DeletePost";
import { Modal } from '../../context/Modal';

const DeleteButton = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <i className="fas fa-trash-alt" onClick={handleClick}></i>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <DeletePost post={post} isOpen={setIsOpen} />
                </Modal>
            )}
        </>
    );
}

export default DeleteButton;
