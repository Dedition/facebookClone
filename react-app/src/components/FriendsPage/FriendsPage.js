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

function FriendsPage() {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    const strangers = useSelector(state => state);
    console.log(strangers);

    useEffect(() => {
        dispatch(getAllFriends(sessionUser));
    }, [dispatch, sessionUser]);

    return (
        <div>
            <div className="container">
                <h1>Hello World</h1>
            </div>
        </div>
    )
}

export default FriendsPage;
