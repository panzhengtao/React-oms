import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    DatePicker,
    Icon,
    Tag
} from 'antd'

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
        this.props.platformsearchaction({visible:true,})
        this.props.fetchsearchplatform({key: 'data', value: {isPass: 'no',}})
    }


    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        return (
                <div className="newCluenk">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={24}>
                                <div className={"quiteState"}>
                                    <Tag>
                                        <span><Icon type="copy" />全部</span>
                                        <span>(888)</span>
                                    </Tag>
                                    <Tag>
                                        <span><Icon type="copy" />今日新订单</span>
                                        <span>(888)</span>
                                    </Tag>
                                    <Tag>
                                        <span><Icon type="copy" />需紧急发货</span>
                                        <span>(888)</span>
                                    </Tag>
                                    <Tag>
                                        <span><Icon type="copy" />等待发货订单</span>
                                        <span>(888)</span>
                                    </Tag>
                                    <Tag>
                                        <span><Icon type="copy" />有纠纷订单</span>
                                        <span>(888)</span>
                                    </Tag>
                                    <Tag>
                                        <span><Icon type="copy" />等待放款的订单</span>
                                        <span>(888)</span>
                                    </Tag>
                                    <Tag>
                                        <span><Icon type="copy" />标记失败订单</span>
                                        <span>(888)</span>
                                    </Tag>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="商品名称" style={{"width": "100%", paddingRight: '10px'}}
                                >
                                    {getFieldDecorator('goodsName', {
                                        rules: [{
                                            required: false,
                                            message: `请输入商品名称`
                                        }],
                                    })(
                                        <Input placeholder={`请输入商品名称`}
                                               maxLength="100"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="平台单号" style={{"width": "100%", paddingRight: '10px'}}
                                >
                                    {getFieldDecorator('platformNumber', {
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
                                          label="状态" style={{"width": "100%", paddingRight: '10px'}}
                                >
                                    {getFieldDecorator('orderState', {
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
                                          label="下单日期" style={{"width": "100%", paddingRight: '10px'}}
                                >
                                    {getFieldDecorator('orderDate', this.rangeConfig)(
                                        <RangePicker style={{"width": "100%"}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6}>
                                <FormItem  {...this.formItemLayout}
                                           label="销售账号" style={{"width": "100%", paddingRight: '10px'}}
                                >
                                    {getFieldDecorator('shopAccount', {
                                        rules: [{
                                            required: false,
                                            message: `请输入销售账号`
                                        }],
                                    })(
                                        <Input placeholder={`请输入销售账号`}
                                               maxLength="100"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="商品编码" style={{"width": "100%", paddingRight: '10px'}}
                                >
                                    {getFieldDecorator('goodsNumber', {
                                        rules: [{
                                            required: false,
                                            message: `请输入商品编码`
                                        }],
                                    })(
                                        <Input placeholder={`请输入商品编码`}
                                               maxLength="100"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="运单号" style={{"width": "100%", paddingRight: '10px'}}
                                >
                                   {getFieldDecorator('waybillNumber', {
                                        rules: [{
                                            required: false,
                                            message: `请输入运单号`
                                        }],
                                    })(
                                        <Input placeholder={`请输入运单号`}
                                               maxLength="100"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem {...this.formItemLayout3}
                                          label="付款日期" style={{"width": "100%", paddingRight: '10px'}}
                                >
                                    {getFieldDecorator('paymentDate', this.rangeConfig)(
                                        <RangePicker style={{"width": "100%"}}/>
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