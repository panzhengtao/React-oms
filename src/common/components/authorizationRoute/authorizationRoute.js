import React from 'react'
import {Route} from 'react-router-dom'
import {getCookie} from '../../../util/baseTool';
import {Redirect } from 'react-router'
class AuthorizationRoute extends React.Component {

    componentWillMount() {

    }

    render() {
        const {component: Component, ...rest} = this.props
        const loginabled = getCookie('username') ? true : false
        const content = loginabled ? <Route {...rest} render={props => {
            return <Component {...props} />
        }}/> : <Redirect to="/" />
        if(!loginabled){
            location.href=location.href;
        }

        return (
            content
        )
    }
}

export default AuthorizationRoute
