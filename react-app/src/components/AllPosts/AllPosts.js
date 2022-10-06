//*                         React
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//*                         Store
import { getPosts } from "../../store/post";

//*                     Files & Components
import "./AllPosts.css";
import SinglePost from "../HomePage/SinglePost/SinglePost";

function AllPosts() {
    const dispatch = useDispatch();
    // const [display, setDisplay] = useState(false);


    let posts = useSelector(state => state.posts);
    posts = Object.values(posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

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
