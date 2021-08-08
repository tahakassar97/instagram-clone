const base = "http://localhost:3000/api";
const root = "http://localhost:3000/uploads/";
const users = `${base}/users`;
const posts = `${base}/posts`;


export const REGISTER = `${users}/register`;
export const LOGIN = `${users}/login`;
export const CREATE_POST = `${posts}/createPost`;
export const POSTS = `${posts}/posts`;
export const USER_POSTS = `${posts}/userPosts`;
export const LIKE_POST = `${posts}/like`;
export const UNLIKE_POST = `${posts}/unlike`;
export const COMMENT = `${posts}/comment`;
export const REMOVE_POST = `${posts}/deletePost`;
export const LOAD_IMAGE = root;