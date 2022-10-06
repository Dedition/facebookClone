// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action
// TODO ——————————————————————————————————————————————————————————————————————————————————

const CLEAN_USER_PROFILE = "/api/CLEAN_USER_PROFILE";
const GET_USER_PROFILE = "/api/GET_USER_PROFILE";
const EDIT_USER_PROFILE = "/api/EDIT_USER_PROFILE";

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action Creators
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const cleanUserProfile = () => ({
    type: CLEAN_USER_PROFILE,
});

const loadUserProfile = (payload) => ({
    type: GET_USER_PROFILE,
    payload,
});

const editProfile = (payload) => ({
    type: EDIT_USER_PROFILE,
    payload,
});

// *    ——————————————————————————————————————————————————————————————————————————————————
// *                                    Thunks
// *    ——————————————————————————————————————————————————————————————————————————————————

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 READ
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const getUserProfile = (payload) => async (dispatch) => {
    const response = await fetch(`/api/users/${payload.userId}`);

    if (response.ok) {
        const user = await response.json();
        dispatch(loadUserProfile(user));
    }
    return response;
};
