import React from 'react'
import { Route } from 'react-router-dom'

class AuthorizationRoute extends React.Component {

    componentWillMount() {
        console.log(1)
    }

    render() {
        const { component: Component, success, ...rest } = this.props

        return (
            <Route {...rest} render={props => {
                return <Component {...props} />
            }} />
        )
    }
}

export default AuthorizationRoute
