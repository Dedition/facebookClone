import { useState } from 'react';
import EditPost from '../EditPost/EditPost';

const EditPostForm = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <i className="fas fa-edit" onClick={handleClick}></i>
            {isOpen && (
                <EditPost post={post} isOpen={setIsOpen} />
            )}
        </>
    );
}

export default EditPostForm;
