import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import Modalmodel from '../components/Modalmodel'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
    Checkbox,
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
import {levelOptions} from '../../util/options';
import {platformsearchaction} from "../actions";

class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state={
        platformVisible:false
    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }

    formItemLayout2 = {
        labelCol: {span: 9},
        wrapperCol: {span: 15}
    }

    formItemLayout3 = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    }


    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        const newobj = {}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'range-time') {
                            const arr = values[i].map(v => v.format("YYYY-MM-DD"))
                            newobj['startTime'] = arr[0] ? arr[0] : ''
                            newobj['endTime'] = arr[1] ? arr[1] : ''
                        } else if (i == 'other') {
                            newobj[i] = values[i].join(',')
                        } else if (i == 'compNameOrAddressOrMobile') {
                            newobj[i] = values[i].key
                        } else {
                            newobj[i] = values[i]
                        }
                    }
                }
                newobj.isPass = 'no';
                newobj.markToDistinguish = 'my';
                or && this.props.fetchPosts({key: 'data', value: newobj});

            }
        });
        return newobj
    }


    rangeConfig = {
        rules: [{type: 'array', required: false, message: '请选择'}],
    }


    handleReset = () => {
        this.props.form.resetFields();
    }

    platformSelect =() =>{
        this.props.platformsearchaction({visible:true,platforms:'platform1s'})
        this.props.fetchsearchplatform({key: 'data', value: {isPass: 'no',}})
    }


    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
const  platforms =this.props.platformsearch.platform1s
        return (

                <div className="newCluenk">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">

                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={24}>
                                <Button className="bts" type="default">全部<br/>(223)</Button>
                                <Button className="bts" type="default">留言订单<br/>(20)</Button>
                                <Button className="bts" type="default">无存储<br/>(5)</Button>
                                <Button className="bts" type="default">黑名单<br/>(58)</Button>
                                <Button className="bts" type="default">手工单<br/>(24)</Button>
                                <Button className="bts" type="default">产品信息错误<br/>(3)</Button>
                                <Button className="bts" type="default">收货人信缺失<br/>(9)</Button>
                                <Button className="bts" type="default">0单价订单<br/>(46)</Button>
                                <Button className="bts" type="default">分仓失败订单<br/>(25)</Button>
                                <Button className="bts" type="default">超200美金订单<br/>(35)</Button>
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>


                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="平台订单号" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('platformOrderNumber', {
                                        rules: [{
                                            required: false,
                                            message: `请输入平台订单号`
                                        }],
                                    })(
                                        <Input placeholder={`请输入请输入平台订单号`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>


                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="异常类型" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('orderStateId', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择">
                                            {levelOptions('企业性质').map(item => {
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

                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="销售平台" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('platformId', {
                                        rules: [{required: false, message: '请选择销售平台'}], initialValue: platforms},
                                    )(
                                        <Input readOnly placeholder={`请选择`} onClick={this.platformSelect}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>

                            <Col span={8}>
                                <FormItem {...this.formItemLayout3}
                                          label="付款时间" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('range-time', this.rangeConfig)(
                                        <RangePicker style={{"width": "100%"}}/>
                                    )}

                                </FormItem>
                            </Col>


                        </Row>

                        <Row style={{'padding': '8px 0px'}}>


                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="YKS订单号" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('yksorderId', {
                                        rules: [{
                                            required: false,
                                            message: `请输入YKS订单号`
                                        }],
                                    })(
                                        <Input placeholder={`请输入YKS订单号`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>


                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="订单类型" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('orderTypeId', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择">
                                            {levelOptions('企业性质').map(item => {
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

                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="国家全称" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('countryId', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择">
                                            {levelOptions('企业性质').map(item => {
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

                            <Col span={8}>
                                <FormItem {...this.formItemLayout3}
                                          label="实付金额" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('paymentMin')(
                                        <Input placeholder={`请输入`} style={{"width": "45%"}}
                                               maxLength="100"/>
                                    )}
                                    <span style={{
                                        display: 'inline-block',
                                        textAlign: 'center',
                                        width: '10%'
                                    }}>~</span>
                                    {getFieldDecorator('paymentMax')(
                                        <Input placeholder={`请输入`} style={{"width": "45%"}}
                                               maxLength="100"/>
                                    )}

                                </FormItem>
                            </Col>


                        </Row>


                        <Row style={{'padding': '8px 0px'}}>


                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="买家账号" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('buyerAccount', {
                                        rules: [{
                                            required: false,
                                            message: `请输入`
                                        }],
                                    })(
                                        <Input placeholder={`请输入`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>


                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="销售账号" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('saleAccountId', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择">
                                            {levelOptions('企业性质').map(item => {
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

                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="客服" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('customerServiceId', {
                                        rules: [{required: false, message: '请选择销售平台'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择销售平台">
                                            {levelOptions('企业性质').map(item => {
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


                            <Col span={8}>
                                <FormItem  {...this.formItemLayout}
                                           label="SKU" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('beforeSku', {
                                        rules: [{
                                            required: false,
                                            message: `请输入`
                                        }],
                                    })(
                                        <Input placeholder={`请输入`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>

                        </Row>


                        <Row style={{'padding': '8px 0px'}}>

                            <Col span={24}>
                                <div style={{textAlign: 'right'}}>
                                    <FormItem>
                                        <Button
                                            type="primary" style={{
                                            height: '35px',
                                            lineHeight: '35px',
                                            padding: '0px 30px'
                                        }}
                                            htmlType="submit"
                                            disabled={this.hasErrors(getFieldsError())}
                                        >
                                            查询
                                        </Button>
                                    </FormItem>
                                    <FormItem style={{marginLeft: '20px'}}>
                                        <Button
                                            type="primary"
                                            style={{
                                                height: '35px', lineHeight: '35px',
                                                backgroundColor: '#f5f5f5',
                                                borderColor: '#e6e6e6',
                                                padding: '0px 30px',
                                                color: '#a8a8a8'
                                            }}
                                            htmlType="submit"
                                            onClick={this.handleReset}
                                        >
                                            重置
                                        </Button>
                                    </FormItem>
                                </div>
                            </Col>

                        </Row>


                    </div>
                    </Form>
                </div>
        );
    }
}

export default Condition