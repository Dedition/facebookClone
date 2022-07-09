import AllPosts from "../AllPosts/AllPosts";
import Header from "../Header/Header";
import MainPost from "../MainPost/MainPost";

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
