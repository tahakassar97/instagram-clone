import React from "react";
import "../Style.css";
import { TogglePasswordInput } from "../TogglePasswordInput";
import { login } from "../Server/Functions";
import { ToastContainer, toast, Slide } from "react-toastify";
import { saveToken, saveUsername } from "../StaticFunctions";
import { useHistory } from "react-router-dom";
import UserContext from "../Context";
import { ADD_TOKEN, ADD_USERNAME } from "../Redux";

const Login = () => {
  const [hidePassword, setToggle] = React.useState(true);
  const [username_, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const { dispatch } = React.useContext(UserContext);

  const togglePassword = () => {
    setToggle(hidePassword === true ? false : true);
  };

  const handlUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlPassword = (e) => {
    setPassword(e.target.value);
  };
  const handlLogin = async () => {
    const data = {
      username: username_,
      password: password,
    };
    await login(data, (result, code) => {
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
  };

  return (
    <div>
      <div className="card auth-card">
        <h2 className="brand-logo">Instagram</h2>
        <input
          type="text"
          value={username_}
          placeholder="Username"
          className="input-field"
          onChange={handlUsername}
        />
        <TogglePasswordInput
          hide={hidePassword}
          togglePassword={togglePassword}
          onChange={handlPassword}
          value={password}
        />
        <button
          className="btn btn-btn #1565c0 blue darken-3"
          onClick={handlLogin}
        >
          Login
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
