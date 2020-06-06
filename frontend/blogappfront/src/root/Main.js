import React from "react";
import Navi from "./Navi";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "../pages/Users/Login";
import Register from "../pages/Users/Register";
import UserPage from "../pages/Users/UserPage";
import { useSelector } from "react-redux";
import UserList from "../pages/Users/UserList";
import ChangePassword from "../pages/Users/ChangePassword";
import CreateBlog from "../pages/blog/CreateBlog";
import BlogDetail from "../pages/blog/BlogDetail";
import UpdateBlog from "../pages/blog/UpdateBlog";

const Main = () => {
  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.auth.isLoggedIn,
    };
  });
  return (
    <div>
      <Navi />
      <div className="container mt-4">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          {!isLoggedIn && <Route exact path="/login" component={Login} />}
          {isLoggedIn && <Route exact path="/createBlog" component={CreateBlog} />}
          {isLoggedIn &&<Route exact path="/updateBlog/:id" component={UpdateBlog} />}
          <Route exact path="/register" component={Register} />
          <Route exact path="/user/:id" component={UserPage} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/changePassword" component={ChangePassword} />
          <Route exact path="/blog/:id" component={BlogDetail} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
