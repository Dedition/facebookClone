import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePostById } from "../../../store/post";

const DeletePost = ({ post, isOpen }) => {
    const dispatch = useDispatch();
    // const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        isOpen(!isOpen);
    }


    const handleDelete = () => {
        dispatch(deletePostById(post.id));
        toggle();
    }
    // Create a delete JSX element that will ask you to confirm or cancel the deletion of the post.
    return (
        <div className="delete-button-container">
            <h4>This action is <em>final.</em> Are you sure you want to delete this post?</h4>
            <div>
                <button id="submit" type="submit" onClick={handleDelete}>
                    Yes
                </button>
            </div>
            <div>
                <button id="cancel" onClick={toggle}>
                    No
                </button>
            </div>
        </div>
    );
}

export default DeletePost;
