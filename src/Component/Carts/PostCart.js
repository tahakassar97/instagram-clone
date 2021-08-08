import React from "react";
import UserContext, { PostContext } from "../Context";
import { LOAD_IMAGE } from "../Server/APIs";
import "../Style.css";
import { unlikePost, likePost, comment, deletePost } from "../Server/Functions";
import { ToastContainer, Slide, toast } from "react-toastify";
import { REMOVE_POST } from "../Redux";

const favorite = "favorite";
const favorite_border = "favorite_border";

export const PostCart = (props) => {
  const { username, token } = React.useContext(UserContext);
  const { dispatch } = React.useContext(PostContext);
  const [like, setLike] = React.useState(
    props.like === undefined ? favorite_border : favorite
  );
  const [comment_, setComment] = React.useState("");
  const [comments, setComments] = React.useState(props.comments);

  const handleLike = async () => {
    setLike(like === favorite_border ? favorite : favorite_border);
    // here should be used the opposit
    if (like !== favorite_border) {
      const code = await unlikePost(token, username, props.id);
      if (code !== 200) {
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
    } else {
      const code = await likePost(token, username, props.id);
      if (code !== 200) {
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
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleComment = async () => {
    await comment(token, props.id, comment_, (result, code) => {
      if (code === 200) {
        setComment("");
        setComments(result);
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

  const handleDeletePost = async () => {
    console.log(token);
    const code = await deletePost(token, props.id, username);
    if (code === 200) {
      dispatch({ type: REMOVE_POST, payload: props.id });
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
  };

  return (
    <div className="card home-card noselect">
      <div>
        <div style={{ display: "inline" }}>
          <h5
            style={{
              paddingTop: "10px",
              paddingLeft: "5px",
            }}
          >
            {props.name}
            {username === props.username ? (
              <i
                className="material-icons right"
                style={{ position: "initial" }}
                onClick={handleDeletePost}
              >
                delete
              </i>
            ) : (
              ""
            )}
          </h5>
        </div>
        <div className="card-image">
          <img src={LOAD_IMAGE + props.image} alt="" />
        </div>
        <div className="card-content">
          <i
            className="small material-icons"
            style={{
              marginLeft: "-2px",
              position: "relative",
              color: "#b71c1c",
            }}
            onClick={handleLike}
          >
            {like}
          </i>
          <p>{props.title}</p>
          <div>
            {comments.map((comment) => (
              <h6 key={comment._id}>
                {" "}
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {" "}
                  {comment.postedBy.name}{" "}
                </span>{" "}
                {comment.body}
              </h6>
            ))}
          </div>
          <div style={{ display: "block" }}>
            <input
              type="text"
              placeholder="Add a comment"
              className="input-field"
              value={comment_}
              onChange={handleChangeComment}
            />
            <button
              className="btn waves-effect waves-light"
              type="submit"
              style={{
                display: "block",
                margin: "0 auto",
              }}
              onClick={handleComment}
            >
              Submit
              <i
                className="material-icons right"
                style={{ position: "revert", color: "white" }}
              >
                send
              </i>
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
