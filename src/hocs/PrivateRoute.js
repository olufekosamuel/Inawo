import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, roles, ...rest}) => {
    const isAuthenticated = Boolean(localStorage.getItem('userData'));
    return (
        <Route {...rest} render ={props => {
            if(!isAuthenticated)
                return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            
           
            
            return <Component {...props} />
        }} />
    )
}

export default PrivateRoute;