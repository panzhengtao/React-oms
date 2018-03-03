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

class ActualDeliveryInfo extends React.Component {
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
                <div className="title">实际发货信息</div>
                <div className="content">


                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="内单号"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('yksOrderNumber', {
                                    rules: [{required: false, message: '内单号'}],
                                })(
                                    <Input placeholder="1136347008083" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="状态"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('state', {
                                    rules: [{required: false, message: '状态'}],
                                })(
                                    <Input placeholder="已发货" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="发货仓库"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('warehouseDeliver', {
                                    rules: [{required: false, message: '发货仓库'}],
                                })(
                                    <Input placeholder="5号" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

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


                    </Row>

                    <Row style={{'padding': '8px 0px'}}>


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
                                label="追踪码1"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('waybillNumber1', {
                                    rules: [{required: false, message: '追踪码1'}],
                                })(
                                    <Input placeholder="RS304206989CN" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="追踪码2"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('waybillNumber2', {
                                    rules: [{required: false, message: '追踪码2'}],
                                })(
                                    <Input placeholder="RS304206989CN" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="重量"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('weight', {
                                    rules: [{required: false, message: '重量'}],
                                })(
                                    <Input placeholder="1584G" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>



                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="运费"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('freight', {
                                    rules: [{required: false, message: '运费'}],
                                })(
                                    <Input placeholder="158.208" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="客服"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('customerService', {
                                    rules: [{required: false, message: '客服'}],
                                })(
                                    <Input placeholder="小林" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="回标名称"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('callbackName', {
                                    rules: [{required: false, message: '回标名称'}],
                                })(
                                    <Input placeholder="CPAM" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="发货时间"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('deliverTime', {
                                    rules: [{required: false, message: '发货时间'}],
                                })(
                                    <Input placeholder="2018-01-10 23:00" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={6}>
                            <FormItem
                                label="挂号"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('isRegister', {
                                    rules: [{required: false, message: '挂号'}],
                                })(
                                    <Input placeholder="是否" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <FormItem
                                label="交易号"  {...this.formItemLayout3} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('tradeNumber', {
                                    rules: [{required: false, message: '交易号'}],
                                })(
                                    <Input placeholder="sa1183513228qwzr" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>


                    </Row>

                   

                </div>
            </div>
        );
    }
}

export default ActualDeliveryInfo
