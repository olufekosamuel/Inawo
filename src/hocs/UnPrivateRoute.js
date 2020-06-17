import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const UnPrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = Boolean(localStorage.getItem('userData'));
    return (
        <Route {...rest} render ={props => {
            if(isAuthenticated)
                return <Redirect to={{pathname: '/dashboard', state: {from: props.location}}}/>
            
            return <Component {...props} />
        }} />
    )
}

export default UnPrivateRoute;