export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_USERNAME = "ADD_USERNAME";
export const REMOVE = "REMOVE";
export const GET_POSTS = "GET_POSTS";
export const REMOVE_POST = "REMOVE_POST";
export const ADD_POSTS = "ADD_POSTS";

export const initStatus = {
  token: "",
  username: "",
};

export const initState = {
  posts: [],
};

export const tokenReducer = (state = initState, action) => {
  if (action.type === ADD_TOKEN) {
    return {
      token: action.payload,
      username: state.username,
    };
  } else if (action.type === REMOVE) {
    return initStatus;
  } else if (action.type === ADD_USERNAME) {
    return {
      token: state.token,
      username: action.payload,
    };
  } else {
    return state;
  }
};

export const postsReducer = (state, action) => {
  if (action.type === GET_POSTS) {
    return state.posts;
  } else if (action.type === ADD_POSTS) {
    return {
      posts: action.payload,
    };
  } else {
    const postID = action.payload;
    const index = state.posts.findIndex(post => post._id === postID);
    let newPosts = [...state.posts];
    newPosts.splice(index, 1);
    return {
      posts: newPosts,
    };
  }
};
