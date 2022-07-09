import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts } from "../../store/post";
import moment from "moment";
import EditPost from "../EditPost/EditPost";
import "./AllPosts.css";
import EditPostForm from "../EditPostForm/EditPostForm";
import SinglePost from "../SinglePost/SinglePost";

function AllPosts() {
    const dispatch = useDispatch();
    // const [display, setDisplay] = useState(false);


    let posts = useSelector(state => state.posts);
    posts = Object.values(posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);



    console.log(posts, '111111')

    const SortedArr = posts?.sort((a, b) => {
        const dateA = new Date(a.created_at).toISOString()
        const dateB = new Date(b.created_at).toISOString()
        return dateB.localeCompare(dateA);
    })

    return (
        <div className="allPosts">
            {SortedArr.map(post => (
                <SinglePost post={post} key={post?.id} />))}
        </div>
    );
}

export default AllPosts;
