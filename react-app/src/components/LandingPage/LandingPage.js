import AllPosts from "../AllPosts/AllPosts";
import Header from "../HomePage/Header/Header";
import MainPost from "../HomePage/MainPost/MainPost";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Header />
            <MainPost />
            <AllPosts />
        </div>
    )
}

export default LandingPage;
