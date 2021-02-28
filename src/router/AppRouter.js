import React from 'react'
import {JournalScreen} from '../components/journal/JournalScreen'
import {AuthRouter} from './AuthRouter'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/auth">
                    <AuthRouter/>
                </Route>
                <Route path="/home">
                    <JournalScreen/>
                </Route>
                <Route path="/">
                    <Redirect to="/auth/login"/>
                </Route>
            </Switch>
        </Router>

    )
}
