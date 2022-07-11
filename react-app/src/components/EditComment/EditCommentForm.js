//*                         React
import { useState } from 'react';

//*                     Files & Components
import EditComment from './EditComment';
import { Modal } from '../../context/Modal';

const EditCommentForm = ({ comment, post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <i className="fas fa-edit" onClick={handleClick}></i>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <EditComment comment={comment} post={post} isOpen={setIsOpen} />
                </Modal>
            )}
        </>
    );
}

export default EditCommentForm;
