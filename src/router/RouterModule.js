// *****************************************************************
//                                              Imports
// *****************************************************************
import React, {Fragment} from 'react'
import {DashboardScreen} from '../components/dashboard/DashboardScreen'
import PublicRoute from './PublicRoute'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {LoginScreen} from "../components/auth/LoginScreen";
import PrivateRoute from "./PrivateRoute";
import {RegisterScreen} from "../components/auth/RegisterScreen";
import {ResetStep1Screen} from "../components/auth/ResetStep1Screen";
import {ResetStep2Screen} from "../components/auth/ResetStep2Screen";
import {DarkToggle} from "../services/darkThemeService";

// *****************************************************************
//                                              JSX
// *****************************************************************
export const RouterModule = () => {
    return (
        <Fragment>

            <Router>
                <Switch>
                    {/*Publics Routes*/}
                    <PublicRoute component={LoginScreen} path="/auth/login" exact/>
                    <PublicRoute component={RegisterScreen} path="/auth/register" exact/>
                    <PublicRoute component={ResetStep1Screen} path="/auth/reset-password/step1" exact/>
                    <PublicRoute component={ResetStep2Screen} path="/auth/reset-password/step2" exact/>

                    {/*Private Routes*/}
                    <PrivateRoute component={DashboardScreen} path="/dashboard" exact/>

                    <Route path="/">
                        <Redirect to="/auth/login"/>
                    </Route>
                </Switch>
            </Router>

            <DarkToggle/>

        </Fragment>

    )
}
