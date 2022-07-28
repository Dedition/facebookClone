// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action
// TODO ——————————————————————————————————————————————————————————————————————————————————

const ADD = "POST/ADD";
const LOAD = "POST/LOAD";
const UPDATE = "POST/UPDATE";
const REMOVE = "POST/REMOVE";

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Action Creators
// TODO ——————————————————————————————————————————————————————————————————————————————————

const addPost = (post) => ({ type: ADD, post });
const loadPosts = (posts) => ({ type: LOAD, posts });
const updatePost = (post) => ({ type: UPDATE, post });
const removePost = (postId) => ({ type: REMOVE, postId });

// *    ——————————————————————————————————————————————————————————————————————————————————
// *                                    Thunks
// *    ——————————————————————————————————————————————————————————————————————————————————

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 CREATE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const createPost = (data) => async (dispatch) => {
    const response = await fetch("/api/posts", {
        method: "POST",
        body: data
    });
    if (response.ok) {
        const newPost = await response.json();
        dispatch(addPost(newPost));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 READ
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const getPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts");

    if (response.ok) {
        const posts = await response.json();
        dispatch(loadPosts(posts));
        return posts;
    }
};

// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 UPDATE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const updatePostById = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    });

    if (response.ok) {
        const updatedPost = await response.json();
        dispatch(updatePost(updatedPost));
    }
};


// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 DELETE
// TODO ——————————————————————————————————————————————————————————————————————————————————

export const deletePostById = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        await response.json();
        dispatch(removePost(postId));
    }
};


// TODO ——————————————————————————————————————————————————————————————————————————————————
// TODO                                 Reducer
// TODO ——————————————————————————————————————————————————————————————————————————————————

const initialState = {};

export default function postsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD:
            newState = { ...state };
            const newPost = action.post;
            newState[newPost.postId] = newPost;
            return newState;
        case LOAD:
            const allPosts = {};
            const posts = action.posts.posts;

            posts.forEach((post) => {
                allPosts[post.id] = post;
            });
            return { ...allPosts };
        case UPDATE:
            newState = { ...state };
            const updatedPost = action.post;
            newState[updatedPost.postId] = updatedPost;
            return newState;
        case REMOVE:
            newState = { ...state };

            delete newState[action.postId];
            return newState;
        default:
            return state;
    }
}
