import React from "react";
import {Route,Switch} from "react-router-dom";
import Home from "./core/Home"
import Signup from "./user/Signup"

const MainRouter = ()=>{
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={Signup}></Route>
        </Switch>
      </div>
    );
}
export default MainRouter;