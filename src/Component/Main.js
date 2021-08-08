import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter, useHistory } from "react-router-dom";
import { tokenReducer, initStatus } from "./Redux";
import UserContext from "./Context";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import CreatePost from "./Pages/CreatePost";
import { Route, Switch } from "react-router-dom";
import { getToken, getUsername } from "./StaticFunctions";
import { ADD_TOKEN, ADD_USERNAME } from "./Redux";

const Routing = () => {
  const history = useHistory();
  const { token, dispatch } = React.useContext(UserContext);
  React.useEffect(() => {
    if (getToken()) {
      dispatch({ type: ADD_TOKEN, payload: getToken() });
      dispatch({ type: ADD_USERNAME, payload: getUsername() });
    } else {
      history.push("/login");
    }
  }, [dispatch, history, token]);
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/post" component={CreatePost} />
      </Switch>
    </div>
  );
};

const Main = () => {
  try {
    const [state, dispatch] = React.useReducer(tokenReducer, initStatus);
    return (
      <UserContext.Provider
        value={{
          username: state.username,
          token: state.token,
          dispatch: dispatch,
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    );
  } catch (error) {
    return;
  }
};
export default Main;
