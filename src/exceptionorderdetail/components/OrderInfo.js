import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import moment from 'moment'
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

class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <div className="newCluenk">
                <div className="title">基础资料</div>
                <div className="content">


                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="平台订单号"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('platformOrderId', {
                                    rules: [{required: false, message: '请输入平台订单号'}],
                                })(
                                    <Input placeholder="请输入平台订单号" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="销售账号"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('marketAccount', {
                                    rules: [{required: false, message: '请输入销售账号'}],
                                })(
                                    <Input placeholder="请输入销售账号" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="YKS订单号"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('yksorderNumber', {
                                    rules: [{required: false, message: '请输入订单号'}],
                                })(
                                    <Input placeholder="请输入订单号" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="买家邮箱"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('buyerEmail', {
                                    rules: [{required: false, message: '请输入买家邮箱'}],
                                })(
                                    <Input placeholder="请输入买家邮箱" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="订单状态"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('orderState', {
                                    rules: [{required: false, message: '请选择订单状态'}],

                                })(
                                    <Select style={{width: '100%'}} disabled
                                            placeholder="请选择订单状态">
                                        {levelOptions('订单状态').map(item => {
                                            return (
                                                <Option key={item.value} value={item.value}
                                                >
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="订单类型"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('orderType', {
                                    rules: [{required: false, message: '请选择订单类型'}],

                                })(
                                    <Select style={{width: '100%'}} disabled
                                            placeholder="请选择订单类型">
                                        {levelOptions('经营模式').map(item => {
                                            return (
                                                <Option key={item.value} value={item.value}
                                                >
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}

                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="销售平台"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('platformName', {
                                    rules: [{required: false, message: '请输入销售平台'}],
                                })(
                                    <Input placeholder="请输入销售平台" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="国家"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('country', {
                                    rules: [{required: false, message: '请输入国家'}],
                                })(
                                    <Input placeholder="请输入国家" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="汇率"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('rate', {
                                    rules: [{required: false, message: '请输入汇率'}],
                                })(
                                    <Input placeholder="请输入汇率" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="付款方式"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('payway', {
                                    rules: [{required: false, message: '请选择付款方式'}],

                                })(
                                    <Select style={{width: '100%'}} disabled
                                            placeholder="请选择付款方式">
                                        {levelOptions('经营模式').map(item => {
                                            return (
                                                <Option key={item.value} value={item.value}
                                                >
                                                    {item.label}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                )}

                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="买家账号"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('buyerAccount', {
                                    rules: [{required: false, message: '请输入买家账号'}],
                                })(
                                    <Input placeholder="请输入买家账号" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="客服人员"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('customerService', {
                                    rules: [{required: false, message: '请输入客服人员'}],
                                })(
                                    <Input placeholder="请输入客服人员" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="平台佣金"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('platformCommission', {
                                    rules: [{required: false, message: '请输入平台佣金'}],
                                })(
                                    <Input placeholder="请输入平台佣金" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="平台交易费"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('platformFee', {
                                    rules: [{required: false, message: '请输入平台交易费'}],
                                })(
                                    <Input placeholder="请输入平台交易费" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>


                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="订单金额"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('orderPayment', {
                                    rules: [{required: false, message: '请输入订单金额'}],
                                })(
                                    <Input placeholder="请输入订单金额" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="优惠金额"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('discount', {
                                    rules: [{required: false, message: '请输入优惠金额'}],
                                })(
                                    <Input placeholder="请输入优惠金额" id="success" maxLength="100"/>
                                )}
                            </FormItem>


                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="实付金额"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('payment', {
                                    rules: [{required: false, message: '请输入实付金额'}],
                                })(
                                    <Input placeholder="请输入实付金额" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="客付运费"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('freight', {
                                    rules: [{required: false, message: '请输入客付运费'}],
                                })(
                                    <Input placeholder="请输入客付运费" id="success" maxLength="100"/>
                                )}
                            </FormItem>


                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="异常类型"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('abnormalType', {
                                    rules: [{required: false, message: '请输入异常类型'}],
                                })(
                                    <Input placeholder="请输入异常类型" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="异常原因"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('abnormalContent', {
                                    rules: [{required: false, message: '请输入异常原因'}],
                                })(
                                    <Input placeholder="请输入异常原因" id="success" maxLength="100"/>
                                )}
                            </FormItem>


                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="客选物流"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('logisticsBusiness', {
                                    rules: [{required: false, message: '请输入客选物流'}],
                                })(
                                    <Input placeholder="请输入客选物流" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default OrderInfo
