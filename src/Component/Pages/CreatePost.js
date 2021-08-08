import React from "react";
import "../Style.css";
import { createPost } from "../Server/Functions";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../Context";

const CreatePost = () => {
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState("");
  const {token} = React.useContext(UserContext);

  const handlTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handlSubmit = async () => {
    let data = {
      title: title,
      file: image,
    };
    await createPost(token, data, (result, code) => {
      if (code === 200) {
        toast.success(result, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: 0,
          transition: Slide,
        });
      } else {
        toast.error(result, {
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

  return (
    <div>
      <div className="card auth-card">
        <h2 className="brand-logo">New Post</h2>
        <input
          type="text"
          value={title}
          onChange={handlTitle}
          placeholder="Write something .."
          className="input-field"
        />
        <div className="file-field input-field">
          <div className="btn" style={{ maxWidth: "100px" }}>
            <span>Image</span>
            <input type="file" name="image" onChange={handlImage} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              placeholder="Choose an image"
            />
          </div>
        </div>
        <button className="btn btn #1565c0 blue darken-3" onClick={handlSubmit}>
          Submit
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreatePost;
