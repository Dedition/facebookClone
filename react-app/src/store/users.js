// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action
// TODO ——————————————————————————————————————————————————————————————————————————————————

const GET_ALL_USERS = "USER/GET_ALL_USERS";
const CLEAN_USERS = "USER/CLEAN_USERS";


// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action Creators
// TODO ——————————————————————————————————————————————————————————————————————————————————

const getUsers = (payload) => ({ type: GET_ALL_USERS, payload });
export const cleanUsers = () => ({ type: CLEAN_USERS });

// *    ——————————————————————————————————————————————————————————————————————————————————
// *                                    Thunks
// *    ——————————————————————————————————————————————————————————————————————————————————

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 READ
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if (response.ok) {
        const users = await response.json();

        dispatch(getUsers(users));
        return users;
    }
};

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Reducer
// TODO ——————————————————————————————————————————————————————————————————————————————————

const initialState = {};

const usersReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case GET_ALL_USERS:
            const users = action.payload.users;
            users.forEach((user) => {
                newState[user.id] = user;
            });
            return newState;
        case CLEAN_USERS:
            return {};
        default:
            return state;
    }
};

export default usersReducer;
