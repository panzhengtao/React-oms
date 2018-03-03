import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'

import {
    Form,
} from 'antd'

import '../css/css.css'
import '../../common/css/css.css'

import Condition from '../components/Condition';
import Tablelist from '../components/Tablelist';
import Searchplatform from '../../components/searchOpt/containers/App';


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
                <h2>速卖通订单列表</h2>
                <div className="newCluewk">
                    <Condition {...this.props} />
                    <Tablelist {...this.props} />
                    <Searchplatform {...this.props} />
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