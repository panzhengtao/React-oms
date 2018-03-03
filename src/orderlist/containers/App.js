import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'

import {
    Form, Tabs
} from 'antd'

import '../css/css.css'
import '../../common/css/css.css'

import Condition from '../components/Condition';
import AccurateCondition from '../components/AccurateCondition';
import Tablelist from '../components/Tablelist';
import Searchplatform from '../../components/searchOpt/containers/App';
import Searchcountry from '../../components/searchCountry/containers/App';
import SearchValues from '../../components/searchValues/containers/App';

const TabPane = Tabs.TabPane;

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPosts({key: 'data', value: {isPass: 'no',}})
    }

    render() {

        return (
            <div className="newClue">
                <h2>订单列表</h2>
                <div className="newCluewk">
                    <Tabs type="card" style={{
                        background: '#fff',
                        paddingTop: '10px',
                        marginBottom: '20px',
                        border: '1px solid #e6eaee'
                    }}>
                        <TabPane tab="检索" key="1"><Condition {...this.props} /></TabPane>
                        <TabPane tab="精确搜索" key="2"><AccurateCondition {...this.props} /></TabPane>
                    </Tabs>
                    <Tablelist {...this.props} />
                    <SearchValues {...this.props} />
                </div>
            </div>
        );
    }
}

export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            const Infos = {}
            for (let i in props.Infos) {
                if (props.Infos[i].name) {
                    Infos[i] = Form.createFormField(props.Infos[i])
                }
            }
            return Infos
        },
        onFieldsChange(props, fields) {
            props.baseInfoForm(fields)

        },
    })(UserForm));