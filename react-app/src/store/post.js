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

export const createPost = (post) => async (dispatch) => {
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    });

    if (response.ok) {
        const newPost = await response.json();
        dispatch(addPost(newPost));
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
        const previousPost = await response.json();
        dispatch(removePost(postId));
    }
};



// * ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// *                                                                COMMENTS
// * ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

const CREATE_COMMENT = "COMMENT/CREATE";
const LOAD_COMMENTS = "COMMENT/LOAD";
const UPDATE_COMMENT = "COMMENT/UPDATE";
const REMOVE_COMMENT = "COMMENT/REMOVE";
