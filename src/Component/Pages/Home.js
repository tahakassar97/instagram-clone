import React from "react";
import { getPosts } from "../Server/Functions";
import { ToastContainer, Slide, toast } from "react-toastify";
import UserContext, { PostContext } from "../Context";
import { postsReducer, initState, ADD_POSTS } from "../Redux";
import { PostsController } from "./PostsController";


const Home = () => {
  const [posts_, dispatch] = React.useReducer(postsReducer, initState);

  const { token } = React.useContext(UserContext);
  const [, setPosts] = React.useState([]);
  React.useEffect(() => {
    if (token) {
      const getData = async () => {
        await getPosts(token, (result, code) => {
          if (code === 200) {
            setPosts(result);
            dispatch({type: ADD_POSTS, payload: result});
          } else {
            toast.error("Something wrong has happened", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: 0,
              transition: Slide,
            });
          }
        });
      };
      getData();
    }
  }, [token, dispatch]);
  return (
    <div>
      <PostContext.Provider
        value={{
          posts: posts_,
          dispatch: dispatch,
        }}
      >
        <PostsController />
        <ToastContainer />
      </PostContext.Provider>
    </div>
  );
};

export default Home;
