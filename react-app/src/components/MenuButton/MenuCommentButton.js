//*                 React
import { useState, useEffect } from 'react';

//*               Files & Components
import EditComment from '../EditComment/EditComment';
import DeleteComment from "../DeleteComment/DeleteComment";


const MenuCommentButton = ({ comment, post }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleDeleteClick = () => {
        setIsDeleteOpen(!isDeleteOpen);
    }

    return (
        <>
            <div className="menu__button" onClick={handleClick}>...</div>
            {isOpen && (
                <div className='menu__comments'>
                    <EditComment comment={comment} post={post} isOpen={setIsOpen} />
                    <DeleteComment comment={comment} post={post} isOpen={setIsDeleteOpen} />
                </div>
            )}
        </>
    );
}

export default MenuCommentButton;
