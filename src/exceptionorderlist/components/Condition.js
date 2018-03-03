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
    Radio,
    DatePicker,
    Checkbox,
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
import {levelOptions} from '../../util/options';


class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        platformVisible: false
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
            console.log(values)
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
        or && this.props.fetchPosts({key: 'data', value: newobj});
    }


    rangeConfig = {
        rules: [{type: 'array', required: false, message: '请选择'}],
    }


    handleReset = () => {
        this.props.form.resetFields();
    }

    platformSelect = () => {
        this.props.platformsearchaction({visible: true, fileds: {name: 'platformname', id: 'platformId'}})
        this.props.fetchsearchplatform({key: 'data', value: {isPass: 'no',}})
    }

    countrySelect = () => {
        this.props.countrysearchaction({visible: true, fileds: {name: 'countryname', id: 'countryId'}})
        this.props.fetchsearchcountry({key: 'data', value: {isPass: 'no',}})
    }

    selectValues = ({url, title, name, id, type = 'single'}) => () => {
        this.props.searchVluesaction({url, title, name, id, visible: true, type})
        this.props.fetchsearchValues({url,})
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (

            <div className="newCluenk" style={{border: 'none', marginBottom: '0px'}}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">

                        <Row style={{'padding': '8px 0px'}}>


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
                                    {getFieldDecorator('platformname', {
                                            rules: [{required: false, message: '请选择销售平台'}],
                                        },
                                    )(
                                        <Input readOnly placeholder={`请选择销售平台`} onClick={this.selectValues({
                                            url: '/api/oms/order/platform',
                                            title: '销售平台',
                                            name: 'platformname',
                                            id: 'platformId'
                                        })}
                                               maxLength="100"/>
                                    )}
                                    {getFieldDecorator('platformId')(
                                        <Input readOnly maxLength="100" type="hidden"/>
                                    )}

                                </FormItem>
                            </Col>

                            <Col span={6}>
                                <FormItem {...this.formItemLayout2}
                                          label="销售账号" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('saleAccountName', {
                                            rules: [{required: false, message: '请选择销售账号'}],
                                        },
                                    )(
                                        <Input readOnly placeholder={`请选择销售账号`}
                                               onClick={this.selectValues({
                                                   url: '/api/oms/order/saleAccount',
                                                   title: '销售账号',
                                                   name: 'saleAccountName',
                                                   id: 'saleAccountId'
                                               })}
                                               maxLength="100"/>
                                    )}
                                    {getFieldDecorator('saleAccountId')(
                                        <Input readOnly maxLength="100" type="hidden"/>
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
                                    {getFieldDecorator('countryname', {
                                            rules: [{required: false, message: '请选择国家'}],
                                        },
                                    )(
                                        <Input readOnly placeholder={`请选择国家`} onClick={this.selectValues({
                                            url: '/api/oms/order/country',
                                            title: '国家',
                                            name: 'countryname',
                                            id: 'countryId'
                                        })}
                                               maxLength="100"/>
                                    )}
                                    {getFieldDecorator('countryId')(
                                        <Input readOnly maxLength="100" type="hidden"/>
                                    )}


                                </FormItem>
                            </Col>


                            <Col span={6}>
                                <FormItem {...this.formItemLayout2}
                                          label="客服" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('customerServiceName', {
                                            rules: [{required: false, message: '请选择客服'}],
                                        },
                                    )(
                                        <Input readOnly placeholder={`请选择客服`}
                                               onClick={this.selectValues({
                                                   url: '/api/oms/order/customer',
                                                   title: '客服',
                                                   name: 'customerServiceName',
                                                   id: 'customerServiceId'
                                               })}
                                               maxLength="100"/>
                                    )}
                                    {getFieldDecorator('customerServiceId')(
                                        <Input readOnly maxLength="100" type="hidden"/>
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

                            <Col span={18}>
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