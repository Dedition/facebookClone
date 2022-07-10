//*                         React
import { useState } from 'react';

//*                     Files & Components
import EditComment from './EditComment';

const EditCommentForm = ({ comment, post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <i className="fas fa-edit" onClick={handleClick}></i>
            {isOpen && (
                <EditComment comment={comment} post={post} isOpen={setIsOpen} />
            )}
        </>
    );
}

export default EditCommentForm;
