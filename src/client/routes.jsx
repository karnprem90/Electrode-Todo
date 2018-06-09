import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from "./components/home";
import SignUp from "./components/signup";
import Login from "./components/login";
import ListToDo from "./components/list-todo";
import Auth from "./utils/auth";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.getToken() ? (
            <Component {...props}/>
        ) : (
            <Redirect to='/login' />
        )
    )}/>
)
export const routes = (
    <div>
        <Switch>
            <Route exact  path="/" component={SignUp} />,
            <Route  path="/login" component={Login} />,
            <AuthenticatedRoute path="/home" component={Home} />,
            <AuthenticatedRoute path="/list" component={ListToDo} />,
            <AuthenticatedRoute  path="/list/:text" component={ListToDo} />,
            <AuthenticatedRoute  path="/home/:id" component={Home} />
        </Switch>
    </div>
);


