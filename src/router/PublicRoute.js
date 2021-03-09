import React from 'react'
import {
    Route,
    Redirect
} from "react-router-dom";

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <div className={'auth__layout'}>
            <Route {...rest} render={props => (
                localStorage.getItem('token')
                    ? <Redirect to="/dashboard"/>
                    : <Component {...props} />
            )}/>
        </div>
    );
};

export default PublicRoute;