import { useState } from "react";
import DeletePost from "./DeletePost/DeletePost";

const DeleteButtonForm = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <i className="fas fa-trash-alt" onClick={handleClick}></i>
            {isOpen && (
                <DeletePost post={post} isOpen={setIsOpen} />
            )}
        </>
    );
}

export default DeleteButtonForm;
