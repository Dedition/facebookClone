//*                         React
import { useState } from 'react';

//*                     Files & Components
import EditPost from './EditPost';

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
