// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                     Action
// TODO ——————————————————————————————————————————————————————————————————————————————————

const GET_FRIENDS = "FRIEND/GET_FRIENDS";
const GET_ALL_SENT_FRIENDS = "FRIEND/GET_ALL_SENT_FRIENDS";
const GET_ALL_RECEIVED_FRIENDS = "FRIEND/GET_ALL_RECEIVED_FRIENDS";
const ADD_FRIEND_REQUEST = "FRIEND/ADD_FRIEND_REQUEST";
const ACCEPT_FRIEND_REQUEST = "FRIEND/ACCEPT_FRIEND_REQUEST";
const CANCEL_FRIEND_REQUEST = "FRIEND/CANCEL_FRIEND_REQUEST";
const REMOVE_FRIEND = "FRIEND/REMOVE_FRIEND";
const CLEAN_FRIENDS = "FRIEND/CLEAN_FRIENDS";


// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action Creators
// TODO ——————————————————————————————————————————————————————————————————————————————————

const getFriends = (payload) => ({ type: GET_FRIENDS, payload });
const getAllSentFriends = (payload) => ({ type: GET_ALL_SENT_FRIENDS, payload });
const getAllReceivedFriends = (payload) => ({ type: GET_ALL_RECEIVED_FRIENDS, payload });
const addFriendRequest = (payload) => ({ type: ADD_FRIEND_REQUEST, payload });
const acceptFriendRequest = (payload) => ({ type: ACCEPT_FRIEND_REQUEST, payload });
const cancelFriendRequest = (payload) => ({ type: CANCEL_FRIEND_REQUEST, payload });
export const cleanFriends = () => ({ type: CLEAN_FRIENDS });
// export const removeFriend = (payload) => ({ type: REMOVE_FRIEND, payload });


// *    ——————————————————————————————————————————————————————————————————————————————————
// *                                    Thunks
// *    ——————————————————————————————————————————————————————————————————————————————————

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 CREATE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const createFriendRequest = (friend) => async (dispatch) => {
    const response = await fetch(`/api/friends/${friend.user_b}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(friend),
    });

    if (response.ok) {
        const newFriendReq = await response.json();

        if (newFriendReq.error) return newFriendReq.error;

        dispatch(addFriendRequest(newFriendReq));
        return newFriendReq;
    }
}



// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 READ
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const getAllFriends = (friend) => async (dispatch) => {
    const response = await fetch(`/api/friends/${friend.id}`);
    // console.log(friend.id);
    if (response.ok) {
        const allFriends = await response.json();
        dispatch(getFriends(allFriends));
        return allFriends;
    }
}

export const getAllSentFQ = (friend) => async (dispatch) => {
    const response = await fetch(`/api/friends/sent/${friend.userId}`);

    if (response.ok) {
        const allSentFriends = await response.json();
        dispatch(getAllSentFriends(allSentFriends));
        return allSentFriends;
    }
}


export const getAllReceivedFQ = (friend) => async (dispatch) => {
    const response = await fetch(`/api/friends/received/${friend.userId}`);

    if (response.ok) {
        const allReceivedFriends = await response.json();
        dispatch(getAllReceivedFriends(allReceivedFriends));
        return allReceivedFriends;
    }
}


// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 UPDATE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const acceptFQ = (friend) => async (dispatch) => {
    const response = await fetch(`/api/friends/${friend.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(friend),
    });

    if (response.ok) {
        const acceptedFriend = await response.json();
        dispatch(acceptFriendRequest(acceptedFriend));
        return acceptedFriend;
    }
}

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 DELETE
// TODO ——————————————————————————————————————————————————————————————————————————————————


export const cancelFQ = (friend) => async (dispatch) => {
    const response = await fetch(`/api/friends/${friend.id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(cancelFriendRequest(friend));
    }
}

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Reducer
// TODO ——————————————————————————————————————————————————————————————————————————————————

const initialState = {
    friends: {},
    sentFQ: {},
    receivedFQ: {},
}

const friendReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case GET_FRIENDS:
            const acceptedSentFQ = action.payload.Accepted_SFQ;
            const acceptedReceivedFQ = action.payload.Accepted_RFQ;
            acceptedSentFQ.forEach((friend) => {
                newState.friends[friend.id] = friend;
            }
            );
            acceptedReceivedFQ.forEach((friend) => {
                newState.friends[friend.id] = friend;
            }
            );
            return newState;
        case GET_ALL_SENT_FRIENDS:
            const sentFQ = action.payload.Sent_FQ;
            sentFQ.forEach((friend) => {
                newState.sentFQ[friend.id] = friend;
            }
            );
            return newState;
        case GET_ALL_RECEIVED_FRIENDS:
            const receivedFQ = action.payload.Received_FQ;
            receivedFQ.forEach((pendingFQ) => {
                newState.receivedFQ[pendingFQ.id] = pendingFQ;
            }
            );
            return newState;
        case ADD_FRIEND_REQUEST:
            const createdFQ = action.payload;
            newState.sentFQ[createdFQ.id] = createdFQ;
            return newState;
        case ACCEPT_FRIEND_REQUEST:
            const acceptedFQ = action.payload;
            newState.friends[acceptedFQ.id] = acceptedFQ;
            delete newState.sentFQ[acceptedFQ.id];
            return newState;
        case CANCEL_FRIEND_REQUEST:
            const canceledFQ = action.payload;
            delete newState.friends[canceledFQ.id];
            delete newState.sentFQ[canceledFQ.id];
            delete newState.receivedFQ[canceledFQ.id];
            return newState;
        case REMOVE_FRIEND:
            const removedFQ = action.payload;
            delete newState.friends[removedFQ.id];
            return newState;
        case CLEAN_FRIENDS:
            newState.friends = {};
            newState.sentFQ = {};
            newState.receivedFQ = {};
            return newState;
        default:
            return state;
    }
}

export default friendReducer;
