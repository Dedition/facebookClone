import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/post";
import { getComments } from "../../store/comment";

const TestRender = () => {
    const dispatch = useDispatch();
    const allPosts = useSelector((state) => state.posts);
    const postObj = Object.values(allPosts);

    const allComments = useSelector((state) => state.comments);
    const commentObj = Object.values(allComments);

    const [loaded, setLoaded] = useState(false);


    useEffect(() => {

        dispatch(getPosts());
        dispatch(getComments());
        setLoaded(true);
    }, [dispatch]);

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                <h1>
                    Hello World
                </h1>
                {loaded && postObj.map((post) => (
                    <li key={post.postId}>
                        {post.content}
                    </li>
                ))}

                <h1>
                    Comments
                </h1>
                {loaded && commentObj.map((comment) => (
                    <li key={comment.id}>
                        {comment.content}
                    </li>
                ))}

            </ul>
        </div>
    );
}

export default TestRender;
