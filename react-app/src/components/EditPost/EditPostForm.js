//*                         React
import { useState } from 'react';

//*                     Files & Components
import EditPost from './EditPost';
import { Modal } from '../../context/Modal';

const EditPostForm = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <i className="fas fa-edit" onClick={handleClick}></i>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <EditPost post={post} isOpen={setIsOpen} />
                </Modal>
            )}
        </>
    );
}

export default EditPostForm;
