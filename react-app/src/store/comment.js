// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                     Action
// TODO ——————————————————————————————————————————————————————————————————————————————————

const CREATE_COMMENT = "COMMENT/CREATE";
const LOAD_COMMENTS = "COMMENT/LOAD";
const UPDATE_COMMENT = "COMMENT/UPDATE";
const REMOVE_COMMENT = "COMMENT/REMOVE";

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action Creators
// TODO ——————————————————————————————————————————————————————————————————————————————————

const addComment = (comment) => ({ type: CREATE_COMMENT, comment });
const loadComments = (comments) => ({ type: LOAD_COMMENTS, comments });
const updateComment = (comment) => ({ type: UPDATE_COMMENT, comment });
const removeComment = (commentId) => ({ type: REMOVE_COMMENT, commentId });

// *    ——————————————————————————————————————————————————————————————————————————————————
// *                                    Thunks
// *    ——————————————————————————————————————————————————————————————————————————————————

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 CREATE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const createComment = (comment) => async (dispatch) => {
    const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
    });

    if (response.ok) {
        const newComment = await response.json();
        dispatch(addComment(newComment));
        return newComment;
    }
}

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 READ
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const getComments = () => async (dispatch) => {
    const response = await fetch("/api/comments");
    if (response.ok) {
        const comments = await response.json();
        dispatch(loadComments(comments));
        return comments;
    }
}

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 UPDATE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const editComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
    });

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(updateComment(updatedComment));
        return updatedComment;
    }
}

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 DELETE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const deletedComment = await response.json();
        dispatch(removeComment(deletedComment));
        return deletedComment;
    }
}

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Reducer
// TODO ——————————————————————————————————————————————————————————————————————————————————

const initialState = {};

export default function commentReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_COMMENT:
            newState = { ...state };
            newState[action.comment.commentId] = action.comment;
            return newState;
        case LOAD_COMMENTS:
            newState = { ...state };
            const comments = action.comments.comments
            comments.forEach((comment) => {
                newState[comment.commentId] = comment;
            });
            return { ...comments };
        case UPDATE_COMMENT:
            newState = { ...state };
            const updatedComment = action.comment;
            newState[updatedComment.commentId] = updatedComment;
            return newState;
        case REMOVE_COMMENT:
            newState = { ...state };
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
}
