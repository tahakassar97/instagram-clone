import React from "react";
import "../Style.css";
import { TogglePasswordInput } from "../TogglePasswordInput";
import { register } from "../Server/Functions";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveToken, saveUsername } from "../StaticFunctions";
import { useHistory } from "react-router-dom";
import UserContext from "../Context";
import { ADD_TOKEN, ADD_USERNAME } from "../Redux";

const Register = () => {
  const [hidePassword, setToggle] = React.useState(true);
  const [name, setName] = React.useState("");
  const [username, setusername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const { dispatch } = React.useContext(UserContext);

  const togglePassword = () => {
    setToggle(hidePassword === true ? false : true);
  };

  const handlName = (e) => {
    setName(e.target.value);
  };
  const handlusername = (e) => {
    setusername(e.target.value);
  };
  const handlPassword = (e) => {
    setPassword(e.target.value);
  };
  const handlRegister = async () => {
    if (name !== "" && username !== "" && password !== "") {
      let user = {
        name: name,
        username: username,
        password: password,
      };
      await register(user, (result, code) => {
        if (code === 200) {
          toast.success(result.msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: 0,
            transition: Slide,
          });
          saveToken(result.token);
          saveUsername(result.username);
          dispatch({ type: ADD_TOKEN, paylaod: result.token });
          dispatch({ type: ADD_USERNAME, paylaod: result.username });
          history.push("/");
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
    } else {
      toast.error("Please enter all fields", {
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
    <div>
      <div className="card auth-card">
        <h2 className="brand-logo">Instagram</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="input-field"
          value={name}
          onChange={handlName}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={username}
          onChange={handlusername}
        />
        <TogglePasswordInput
          hide={hidePassword}
          togglePassword={togglePassword}
          value={password}
          onChange={handlPassword}
        />
        <button
          className="btn #1565c0 blue darken-3 btn-btn"
          onClick={handlRegister}
        >
          Register
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
