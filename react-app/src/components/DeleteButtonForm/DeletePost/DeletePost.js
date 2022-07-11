//*                         React
import { useDispatch } from "react-redux";

//*                         Store
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
    return (
        <>
            <button className="delete-button-confirmation" onClick={handleDelete}>Are you sure?</button>
            {/* <button className="delete-button__cancel" onClick={toggle}>Cancel</button> */}
        </>
    );
}

export default DeletePost;
