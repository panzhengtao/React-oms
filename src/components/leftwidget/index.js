import React from 'react'
import PropTypes from 'prop-types'
import './layout.css';
import {Menu, Dropdown, Icon} from 'antd';
import _ from 'lodash'
import querystring from 'querystring';
import url from 'url';

import {getUrlParams, getLoginInfo} from '../../util/baseTool';
import menuobj from '../../util/menuConfig';
import { Link } from 'react-router-dom'

const SubMenu = Menu.SubMenu;


class Sider extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired, //菜单原始数据必须的
    }
    state = {
        openKeys: [],
        selectedKeys: [],
        data: [],
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    }
    onSelect = (item, key, selectedKeys) => {
        this.setState({selectedKeys});
    }
    setDatafromProp = ({data, selectedKeys, openKeys}) => {
        if (!data || data.length == 0) {
            return;
        }
        this.setState({openKeys, selectedKeys, data});
    }


    componentWillReceiveProps(nextProps) {
        const pathname = location.pathname;
        const data = nextProps.data;
        let openKeys = [];
        let selectedKeys = [];
        let or = false;
        for (var o of data) {
            for (var p of o.son) {
                if (p.url == pathname || (menuobj[pathname]&&menuobj[pathname].includes(p.url))) {
                    selectedKeys = [p.key];
                    or = true;
                    break;
                }
            }
            if (or) {
                openKeys = [o.key];
                break
            }

        }
        console.log({data, selectedKeys, openKeys})
        this.setDatafromProp({data, selectedKeys, openKeys});
    }


    renderChildMenu = () => {
        var addChild = (o) => {
            var r = o.son.map((p) => {
                return <Menu.Item key={p.key}><Link to={p.url}>{p.name}</Link></Menu.Item>
            })
            return r;
        }
        var result = this.state.data.map((o) => {
            if (o.son.length == 0) {
                return <Menu.Item key={o.key}><Link to={o.url} className="pdl5">{o.name}</Link></Menu.Item>
            } else {
                return <SubMenu key={o.key} title={o.name}>
                    {addChild(o)}
                </SubMenu>
            }
        })
        return result;
    }

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
                style={{width: 240}}
            >
                {this.renderChildMenu()}
            </Menu>
        );
    }
}

class LeftWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getMenuData()
    }

    render() {
        const data = this.props.Infos.data.leftmenudata;
        console.log(this.props.Infos.data)
        return (
            <div className="leftwidget">
                <div className="leftlogo">
                    <span className="sp1"><img src={require('./img/logo.png')}/></span>
                    <span className="sp2">OMS</span>
                </div>
                <div className="switch">
                    <div className='system'>有棵树OMS管理系统</div>
                </div>
                <div>
                    <Sider data={data}/>
                </div>
            </div>
        )
    }
}

export default LeftWidget