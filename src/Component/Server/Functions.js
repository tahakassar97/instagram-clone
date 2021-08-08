import axios from "axios";
import {
  REGISTER,
  CREATE_POST,
  LOGIN,
  POSTS,
  USER_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT,
  REMOVE_POST,
} from "./APIs";

export const register = async (data, result) => {
  try {
    let res = await axios.post(REGISTER, {
      name: data.name,
      username: data.username,
      password: data.password,
    });
    return result(res.data, 200);
  } catch (error) {
    return result(error.response.data.msg, 400);
  }
};

export const createPost = async (token, data, result) => {
  try {
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data;",
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();
    formData.append("image", data.file);
    formData.append("title", data.title);
    let res = await axios.post(CREATE_POST, formData, config);
    return result(res.data.msg, 200);
  } catch (error) {
    return result(error.response.data.msg, 400);
  }
};

export const login = async (data, result) => {
  try {
    let res = await axios.post(LOGIN, data);
    return result(res.data, 200);
  } catch (error) {
    return result(error.response.data.msg, 400);
  }
};

export const getPosts = async (token, result) => {
  const config = {
    headers: {
      accept: "application/json",
      "Content-Type": "multipart/form-data;",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let res = await axios.get(POSTS, config);
    return result(res.data.posts, 200);
  } catch (error) {
    return result(error.response.data.msg, 400);
  }
};

export const getUserPosts = async (token, result) => {
  const config = {
    headers: {
      accept: "application/json",
      "Content-Type": "multipart/form-data;",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let res = await axios.get(USER_POSTS, config);
    return result(res.data.posts, 200);
  } catch (error) {
    return await result(error.response.data.msg, 400);
  }
};

export const likePost = async (token, username, postID) => {
  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await axios.put(
      LIKE_POST,
      {
        username: username,
        postID: postID,
      },
      config
    );
    return 200;
  } catch (error) {
    return 400;
  }
};

export const unlikePost = async (token, username, postID) => {
  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await axios.put(
      UNLIKE_POST,
      {
        username: username,
        postID: postID,
      },
      config
    );
    return 200;
  } catch (error) {
    return 400;
  }
};

export const comment = async (token, postID, comment, result) => {
  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let res = await axios.put(
      COMMENT,
      { postID: postID, body: comment },
      config
    );
    return result(res.data.data.comments, 200);
  } catch (error) {
    return result(error.response.data.msg);
  }
};

export const deletePost = async (token, postID, username) => {
  console.log(token);
  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await axios.delete(`${REMOVE_POST}/${postID}/${username}`, config);
    return 200;
  } catch (error) {
    return 400;
  }
};
