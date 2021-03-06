// *****************************************************************
//                                              Imports
// *****************************************************************
import React from 'react'
import {Redirect, Route} from "react-router-dom";

// *****************************************************************
//                                              Hooks
// *****************************************************************

// *****************************************************************
//                                              Handlers
// *****************************************************************

// *****************************************************************
//                                              JSX
// *****************************************************************
const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <div className={'dashboard__layout'}>
            <Route {...rest} render={props => (
                localStorage.getItem('token')
                    ? <Component {...props} />
                    : <Redirect to="/auth/login"/>
            )}/>
        </div>
    );
};

export default PrivateRoute;