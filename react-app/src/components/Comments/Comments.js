//*                         React
import { useEffect, useState } from 'react';

//*                     Files & Components
import CommentsContainer from '../CommentsContainer/CommentsContainer';
import "./Comments.css";

const Comments = ({ post, user }) => {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <div className="comments">
            <div className="comments__header">
            </div>
            <div className="comments__body">
                <CommentsContainer post={post} user={user} isOpen={setIsOpen} />
            </div>
        </div>
    );
}

export default Comments;
