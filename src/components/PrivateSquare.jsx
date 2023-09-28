import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

const PrivateRoute = props => {
    const { keycloak } = useKeycloak()
    const authenticated = keycloak.authenticated
    const isAuthenticated = authenticated ? true : false
    return (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    )
}

export default PrivateRoute