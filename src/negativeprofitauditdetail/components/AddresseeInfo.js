import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import moment from 'moment'
import Modalmodel from '../components/Modalmodel'
import qs from 'QS'
import {levelOptions} from '../../util/options'
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    Spin,
} from 'antd'
import '../css/css.css'

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class AddresseeInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    formItemLayout3 = {
        labelCol: {span: 11},
        wrapperCol: {span: 13}
    }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <div className="newCluenk">
                <div className="title">收货人信息111</div>
                <div className="content">

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="收货人"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('consignee', {
                                    rules: [{required: false, message: '收货人'}],
                                })(
                                    <Input placeholder="Sam" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="邮箱地址"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('email', {
                                    rules: [{required: false, message: '邮箱地址'}],
                                })(
                                    <Input placeholder="123456@163.com" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="固定电话"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('tel', {
                                    rules: [{required: false, message: '固定电话'}],
                                })(
                                    <Input placeholder="无" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="移动电话"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('mobilephone', {
                                    rules: [{required: false, message: '移动电话'}],
                                })(
                                    <Input placeholder="232323232323232323" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>


                    </Row>

                    <Row style={{'padding': '8px 0px'}}>


                        <Col span={6}>
                            <FormItem
                                label="国家全称"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('country', {
                                    rules: [{required: false, message: '国家全称'}],
                                })(
                                    <Input placeholder="中华人民共和国" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="国家简称"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('countryAdd', {
                                    rules: [{required: false, message: '国家简称'}],
                                })(
                                    <Input placeholder="US" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="省/州"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('province', {
                                    rules: [{required: false, message: '省/州'}],
                                })(
                                    <Input placeholder="湖南" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="城市"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('city', {
                                    rules: [{required: false, message: '城市'}],
                                })(
                                    <Input placeholder="深圳" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>



                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="社交账号"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('userName', {
                                    rules: [{required: false, message: '社交账号'}],
                                })(
                                    <Input placeholder="1104654037" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="街道1"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('street1', {
                                    rules: [{required: false, message: '街道1'}],
                                })(
                                    <Input placeholder="xxxxx" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="街道2"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('street2', {
                                    rules: [{required: false, message: '街道2'}],
                                })(
                                    <Input placeholder="xxxxxx" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>


                    </Row>


                </div>
            </div>
        );
    }
}

export default AddresseeInfo
