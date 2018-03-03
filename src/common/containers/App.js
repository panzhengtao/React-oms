import React, {Component} from 'react';
import Leftwidget from '../../components/leftwidget';
import TopWidget from '../../components/topwidget';
import TopTab from '../../components/toptab';
import {connect} from 'react-redux';
// import 'antd/dist/antd.css' //引入了antd自动引入了样式，加入后重复引入
import '../../common/css/layout.css';
import PlatformComponent from '../../components/common/PlatformComponent';
import {setLoginInfo,getCookie} from '../../util/baseTool';
import {LocaleProvider,} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {routes} from '../routers/routers'
import AuthorizationRoute from '../components/authorizationRoute/authorizationRoute'
import Entrance from '../../login'
import {bindActionCreators} from 'redux';
import actions from '../actions'


export default @connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))

class App extends PlatformComponent {
    constructor(props, context) {
        super(props, context);
        setLoginInfo();
    }

    render() {

        const {isExpand, loginAcct} = this.state;
        const mainClassName = isExpand ? 'oms_inx' : 'oms_inx collapse2';
        const loginabled=getCookie('username')?true:false
        if(!loginabled){
            history.pushState({}, null, '/');
        }

        const content = loginabled?(<Router>
            <LocaleProvider locale={zhCN}>
                <div className={mainClassName}>
                    <div className="g-fl lf"><Leftwidget {...this.props}/></div>
                    <div className="g-fl rg">
                        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <div style={{width: '100%'}}><TopWidget onTransform={this.handleExpandOrCollapse}
                                                                    data={loginAcct}/></div>
                            <div style={{width: '100%'}}><TopTab {...this.props}/></div>
                            <div className="main">
                                <Switch>
                                    {routes.map((route, i) => (
                                        <AuthorizationRoute key={i} {...route} />
                                    ))}
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </LocaleProvider>
        </Router>):<Entrance/>

        return (
            content
        );
    }
}





