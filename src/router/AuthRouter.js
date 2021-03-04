import React from 'react'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import {ResetStep1Screen} from "../components/auth/ResetStep1Screen";
import {ResetStep2Screen} from "../components/auth/ResetStep2Screen";

export const AuthRouter = () => {
    return (
        <div className={'auth__layout'}>
            <Switch>
                <Route path="/auth/login">
                    <LoginScreen />
                </Route>
                <Route path="/auth/register">
                    <RegisterScreen />
                </Route>
                <Route path="/auth/reset-password/step1">
                    <ResetStep1Screen />
                </Route>
                <Route path="/auth/reset-password/step2">
                    <ResetStep2Screen />
                </Route>
                <Route path="/">
                    <Redirect to="/auth/login"/>
                </Route>
            </Switch>
        </div>
    )
}
