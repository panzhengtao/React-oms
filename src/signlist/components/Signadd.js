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


class Signadd extends Component {

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

    platformSelect =() =>{
        this.props.platformsearchaction({visible:true,fileds:'platformId'})
        this.props.fetchsearchplatform({key: 'data', value: {isPass: 'no',}})
    }


    render() {
        console.log(this.props)
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const RadioGroup = Radio.Group;

        return (

            <div className="newCluenk">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">

                        <Row style={{'padding': '8px 0px'}}>


                            <Col span={24}>
                                <FormItem {...this.formItemLayout3}
                                          label="选择平台" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('platform', {
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
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={24}>
                                <FormItem {...this.formItemLayout3}
                                          label="订单类型" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('orderType', {
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
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={24}>
                                <FormItem {...this.formItemLayout3}
                                          label="标记发货状态" style={{"width": "100%", paddingRight: '10px'}}
                                >
                                   {getFieldDecorator('signStats', {
                                        rules: [{required: false, message: '请选择标记发货状态'}], initialValue: ''
                                    })(
                                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                                            <Radio value={1}>已通过</Radio>
                                            <Radio value={2}>已打印</Radio>
                                            <Radio value={3}>已核对</Radio>
                                            <Radio value={4}>已发货</Radio>
                                            <Radio value={5}>海外仓已发</Radio>
                                        </RadioGroup>
                                    )}

                                </FormItem>
                            </Col>
                        </Row>


                        <Row style={{'padding': '8px 0px'}}>

                            <Col span={24}>
                                <div style={{textAlign: 'center'}}>
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
                                            新增
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
                                            取消
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
export default Signadd