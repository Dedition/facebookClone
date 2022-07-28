//*                         React
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { luxon } from 'luxon';

//*                         Store
//eslint-disable-next-line
import {
    createFriendRequest,
    getAllFriends,
    getAllSentFQ,
    getAllReceivedFQ,
    acceptFQ,
    cancelFQ
} from '../../store/friend';

import { getAllUsers, cleanUsers } from '../../store/users';

function FriendsPage() {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    let strangers = useSelector(state => state.users);
    strangers = Object.values(strangers);
    let friends = useSelector(state => state.friends.friends);
    friends = Object.values(friends);
    let sentFQ = useSelector(state => state.friends.sentFQ);
    sentFQ = Object.values(sentFQ);
    let receivedFQ = useSelector(state => state.friends.receivedFQ);
    receivedFQ = Object.values(receivedFQ);
    // const state = useSelector(state => state);

    useEffect(() => {
        dispatch(getAllFriends(sessionUser));
        dispatch(getAllUsers());
    }, [dispatch, sessionUser.id]);

    const handleAcceptedRQ = async (e, friend) => {
        e.preventDefault();
        const response = await dispatch(acceptFQ(friend));
        // if (response.error) {
        //     setErrors(response.error);
        // }
    }

    const handleCancelledRQ = async (e, friend) => {
        e.preventDefault();
        const response = await dispatch(cancelFQ(friend));
        if (response.error) {
            setErrors(response.error);
        }
    }

    const handleCreateFriendRequest = async (e, friend) => {
        e.preventDefault();
        const response = await dispatch(createFriendRequest(friend));
        // if (response.error) {
        //     setErrors(response.error);
        // }
    }


    return (
        <div className="friends-page">
            <div className="friends-page__header">
                <h1>Friends</h1>
            </div>
            <div className="friends-page__body">
                <div className="friends-page__body__friends">
                    <h2>Friends</h2>
                    <div className="friends-page__body__friends__list">
                        {friends.map(friend => (
                            <div className="friends-page__body__friends__list__friend" key={friend.receiver_id.id}>
                                <div className="friends-page__body__friends__list__friend__name">
                                    {friend.receiver_id.username}
                                </div>
                                <div className="friends-page__body__friends__list__friend__buttons">
                                    <button className="friends-page__body__friends__list__friend__buttons__button" onClick={(e) => handleCancelledRQ(e, friend)}>Cancel</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="friends-page__body__friends">
                    <h2>Sent Friend Requests</h2>
                    <div className="friends-page__body__friends__list">
                        {sentFQ.map(friend => (
                            <div className="friends-page__body__friends__list__friend" key={friend.id}>
                                <div className="friends-page__body__friends__list__friend__name">
                                    {friend.user_b.username}
                                </div>
                                <div className="friends-page__body__friends__list__friend__buttons">
                                    <button className="friends-page__body__friends__list__friend__buttons__button" onClick={(e) => handleAcceptedRQ(e, friend.id)}>Accept</button>
                                    <button className="friends-page__body__friends__list__friend__buttons__button" onClick={(e) => handleCancelledRQ(e, friend.id)}>Cancel</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="friends-page__body__friends">
                    <h2>Received Friend Requests</h2>
                    <div className="friends-page__body__friends__list">
                        {receivedFQ.map(friend => (
                            <div className="friends-page__body__friends__list__friend" key={friend.id}>
                                <div className="friends-page__body__friends__list__friend__name">
                                    {friend.user_a.username}
                                </div>
                                <div className="friends-page__body__friends__list__friend__buttons">
                                    <button className="friends-page__body__friends__list__friend__buttons__button" onClick={(e) => handleCreateFriendRequest(e, friend.id)}>Accept</button>
                                    <button className="friends-page__body__friends__list__friend__buttons__button" onClick={(e) => handleCancelledRQ(e, friend.id)}>Cancel</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="friends-page__body__friends">
                    <h2>Strangers</h2>
                    <div className="friends-page__body__friends__list">
                        {strangers.map(stranger =>
                            stranger.id !== sessionUser.id && (
                                <div className="friends-page__body__friends__list__friend" key={stranger.id}>
                                    <div className="friends-page__body__friends__list__friend__name">
                                        {stranger.username}
                                    </div>
                                    <div className="friends-page__body__friends__list__friend__buttons">
                                        <button className="friends-page__body__friends__list__friend__buttons__button" onClick={(e) => handleCreateFriendRequest(e, stranger)}>Add</button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FriendsPage;
