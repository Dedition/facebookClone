//*                         React
import { useEffect, useState } from 'react';

//*                     Files & Components
import CommentsContainer from '../CommentsContainer/CommentsContainer';
import "./Comments.css";

const Comments = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <div className="comments">
            <div className="comments__header">
                <h2>Comments</h2>
            </div>
            <div className="comments__body">
                <CommentsContainer post={post} isOpen={setIsOpen} />
            </div>
        </div>
    );
}

export default Comments;
