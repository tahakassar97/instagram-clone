import React from "react";
import { PostCart } from "../Carts/PostCart";
import UserContext, { PostContext } from "../Context";

export const PostsController = () => {
  const { posts } = React.useContext(PostContext);
  const { username } = React.useContext(UserContext);
  return (
    <div>
      {posts.posts.map((post) => {
        const like = post.likes.find((user) => user === username);
        return (
          <div key={post._id}>
            <PostCart
              title={post.title}
              image={post.image}
              name={post.userID.name}
              like={like}
              username={post.userID.username}
              id={post._id}
              comments={post.comments}
            />
          </div>
        );
      })}
    </div>
  );
};
