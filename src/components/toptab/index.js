import React from 'react'
import PropTypes from 'prop-types'
import './layout.css';
import {Menu, Dropdown, Icon} from 'antd';
import _ from 'lodash'
import querystring from 'querystring';
import url from 'url';

import {getUrlParams, getOneUrlParams} from '../../util/baseTool';
import menuobj from '../../util/menuConfig';
import { Link } from 'react-router-dom'

class TopTab extends React.Component {

    constructor(props) {
        super(props);
    }

    getTabData = () => {
        var data = this.props.Infos.data.topmenudata;
        if (!data || data.length == 0) {
            return [];
        }
        var pathname = location.pathname;
        var isMatched = false;

        for (var o of data) {


            if (o.url == pathname || (menuobj[pathname]&&menuobj[pathname].includes(o.url))) {
                isMatched = true;
                o['actived'] = true;
            }else{
                o['actived'] = false;
            }
        }


        if (!isMatched) {
            data[0]['actived'] = true; //都没有匹配的时候默认选中第一个
        }
        return data;
    }

    render() {
        return (
            <div className="toptaball">
                <ul>
                    {this.getTabData().map((o) => {
                        var className = o.actived ? 'actived' : '';
                        return <li key={o.key} className={className}>
                            <Link to={o.url}>{o.name}</Link>
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}


export default TopTab