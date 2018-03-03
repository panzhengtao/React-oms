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


class Cancellation extends Component {

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
        const { TextArea } = Input;
        return (
                <div className="newCluenk">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">
                        <div class="edit-trackid">
                            <Row>
                                <Col span={24}>
                                    <FormItem  {...this.formItemLayout}
                                               label="关联平台单号" style={{"width": "100%", paddingRight: '10px'}}
                                    >

                                        {getFieldDecorator('platformOrderNumber', {
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input value='503324344523443322' maxLength="100"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem {...this.formItemLayout}
                                              label="发货地" style={{"width": "100%", paddingRight: '10px'}}
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
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem {...this.formItemLayout}
                                              label="物流服务类型" style={{"width": "100%", paddingRight: '10px'}}
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
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem {...this.formItemLayout}
                                              label="物流服务名称" style={{"width": "100%", paddingRight: '10px'}}
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
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem  {...this.formItemLayout}
                                               label="货物跟踪号" style={{"width": "100%", paddingRight: '10px'}}
                                    >

                                        {getFieldDecorator('platformOrderNumber', {
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input maxLength="100"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div style={{color: 'red', textAlign: 'center'}}>在第一次填写完发货通知后的10天内有2次修改机会</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    </Form>
                </div>
        );
    }
}

export default Cancellation