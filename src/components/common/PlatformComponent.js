import React, {Component} from 'react';
import { connect_nodeapi,api_url } from '../../util/connectConfig';
import { getLoginInfo ,setLoginAccount} from '../../util/baseTool';
import axios from '../../util/axios';
import { message } from 'antd';

export default class PlatformComponent extends Component {
  constructor(props,context) {
    super(props,context);
    this.state={
      isExpand: true, //左侧是否收缩
      loginAcct:{}
    }
  }
  /**
   * 展开收缩左侧菜单
   */

	handleExpandOrCollapse =()=>{
		this.setState({isExpand:!this.state.isExpand});
	}


  /**
   * 获取左侧菜单和顶部菜单的原始数据
   */
  getMenuData=()=>{
    // this.setState({ platformMenu:data }); //默认设置mock数据为了开发
    var loginInfo = getLoginInfo(); //从localstorage得到platformId,token 如果没有使用mock
    var platformId = loginInfo.platformId;//srm默认的platformId
    axios.get(connect_nodeapi + '/api/menudata', { params: { platformId } }).then((res) => {
        if (res.status == '200') {
          this.setState({platformMenu:res.data.data});
        }
      });
  }
  getLoginAcct=()=>{
    axios.get(api_url + '/api/oms/user/login', { params: {} }).then((res) => {
      if (res.status == '200') {
        //setLoginAccount(res.data);
        //this.setState({ loginAcct: res.data.data});
      }
    });
  }



}
