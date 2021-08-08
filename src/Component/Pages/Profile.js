import React from "react";
import "../Style.css";
import { PorstCartProfile } from "../Carts/PostCartProfile";
import { getUserPosts } from "../Server/Functions";
import { ToastContainer, toast, Slide } from "react-toastify";
import UserContext from "../Context";

const Profile = () => {
  const [posts, setPosts] = React.useState([]);
  const { token, dispatch } = React.useContext(UserContext);
  React.useEffect(() => {
    if (token) {
      const getData = async () => {
        await getUserPosts(token, (result, code) => {
          if (code === 200) {
            setPosts(result);
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
      getData();
    }
  }, [dispatch, token]);

  return (
    <div id="nav-mobile" style={{ maxWidth: "680px", margin: "0px auto" }}>
      <div className="profile-div">
        <div>
          <img
            src="/images/profile.jpg"
            className="profile-img"
            alt="Profile"
          />
        </div>
        <div>
          <h4 style={{ marginLeft: "30%", marginTop: "20%" }}>Taha Kassar</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h6 style={{ marginLeft: "10px" }}>50 Posts</h6>
            <h6 style={{ marginLeft: "10px" }}>500 Followers</h6>
            <h6 style={{ marginLeft: "10px" }}>500 Followings</h6>
          </div>
        </div>
        <ToastContainer />
      </div>
      {posts.map((post) => (
        <div
          key={post._id}
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <PorstCartProfile
            title={post.title}
            image={post.image}
            name={post.userID.name}
          />
        </div>
      ))}
    </div>
  );
};

export default Profile;
