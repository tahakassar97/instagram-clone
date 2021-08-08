import React from "react";

const UserContext = React.createContext({
  username: "",
  token: "",
});

export const PostContext = React.createContext({
  posts: [],
});

export default UserContext;
