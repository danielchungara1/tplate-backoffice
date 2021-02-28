import React from 'react'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

export const AuthRouter = () => {
    return (
        <div>
            <Switch>
                <Route path="/auth/login">
                    <LoginScreen />
                </Route>
                <Route path="/auth/register">
                    <RegisterScreen />
                </Route>
                <Route path="/">
                    <Redirect to="/auth/login"/>
                </Route>
            </Switch>
        </div>
    )
}
