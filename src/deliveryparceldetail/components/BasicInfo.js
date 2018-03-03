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

class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    formItemLayout3 = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <div className="newCluenk">
                <div className="title">基础信息</div>
                <div className="content">


                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="平台订单号"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('platformOrderNumber', {
                                    rules: [{required: false, message: '平台订单号'}],
                                })(
                                    <Input placeholder="1136347008083" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="YKS订单号"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('yksOrderNumber', {
                                    rules: [{required: false, message: 'YKS订单号'}],
                                })(
                                    <Input placeholder="S18012921897254" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="分仓订单号"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('warehouseOrderNumber', {
                                    rules: [{required: false, message: '分仓订单号'}],
                                })(
                                    <Input placeholder="S18012921897254" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="订单类型"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('name', {
                                    rules: [{required: false, message: '订单类型'}],
                                })(
                                    <Input placeholder="线上订单" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>


                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="物流渠道"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('logisticsBusiness', {
                                    rules: [{required: false, message: '物流渠道'}],
                                })(
                                    <Input placeholder="东莞邮局挂号" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="渠道编码"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('logisticsNumber', {
                                    rules: [{required: false, message: '渠道编码'}],
                                })(
                                    <Input placeholder="Y04S" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="物流追踪码"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('waybillNumber', {
                                    rules: [{required: false, message: '物流追踪码'}],
                                })(
                                    <Input placeholder="Y04S" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="国家全称"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('country', {
                                    rules: [{required: false, message: '国家全称'}],
                                })(
                                    <Input placeholder="中国" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>



                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="国家简称"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('countryAbb', {
                                    rules: [{required: false, message: '国家简称'}],
                                })(
                                    <Input placeholder="US" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="试算运费"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('trialFreight', {
                                    rules: [{required: false, message: '试算运费'}],
                                })(
                                    <Input placeholder="24.0000" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="付款时间"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('paymentTime', {
                                    rules: [{required: false, message: '付款时间'}],
                                })(
                                    <Input placeholder="2018-01-10 23:00" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="币种"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('currencyName', {
                                    rules: [{required: false, message: '币种'}],
                                })(
                                    <Input placeholder="USD" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="分配仓库"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('distribution', {
                                    rules: [{required: false, message: '分配仓库'}],
                                })(
                                    <Input placeholder="5号仓" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="销售账号"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('account', {
                                    rules: [{required: false, message: '销售账号'}],
                                })(
                                    <Input placeholder="cn1520688900bkim" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="买家账号"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('buyerAccount', {
                                    rules: [{required: false, message: '买家账号'}],
                                })(
                                    <Input placeholder="us118839" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>


                        <Col span={6}>
                            <FormItem
                                label="订单金额"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('orderSum', {
                                    rules: [{required: false, message: '订单金额'}],
                                })(
                                    <Input placeholder="12.760" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="是/否负利润"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('isProfit', {
                                    rules: [{required: false, message: '是/否负利润'}],
                                })(
                                    <Input placeholder="是" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="利润"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('profit', {
                                    rules: [{required: false, message: '利润'}],
                                })(
                                    <Input placeholder="-13" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="分仓订单状态"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('warehouseOrderState', {
                                    rules: [{required: false, message: '分仓订单状态'}],
                                })(
                                    <Input placeholder="已推送" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="买家留言"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator(' buyerMessage', {
                                    rules: [{required: false, message: '买家留言'}],
                                })(
                                    <Input placeholder="1111" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="备注"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('remarks', {
                                    rules: [{required: false, message: '备注'}],
                                })(
                                    <Input placeholder="1111" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default BasicInfo
