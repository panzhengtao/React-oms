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


class Channelmodify extends Component {

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
        return (

                <div className="newCluenk">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">



                        <Row style={{'padding': '8px 0px'}}>


                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="平台" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('platform', {
                                        rules: [{
                                            required: false,
                                            message: `请输入平台`
                                        }],
                                    })(
                                        <Input placeholder={`SMT`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道名称" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('channelName', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道名称`
                                        }],
                                    })(
                                        <Input placeholder={`运德比利时邮政平邮`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>


                        </Row>


                        <Row style={{'padding': '8px 0px'}}>


                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="平台标记" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('platformSign', {
                                        rules: [{
                                            required: false,
                                            message: `请输入平台标记`
                                        }],
                                    })(
                                        <Input placeholder={`BPOST`}
                                               maxLength="100"/>
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道编号" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('channelNumber', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道编号`
                                        }],
                                    })(
                                        <Input placeholder={`Y92S`}
                                               maxLength="100"/>
                                    )}
                                </FormItem>
                            </Col>

                        </Row>

                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="是否追踪" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('beforeSku', {
                                        rules: [{
                                            required: false,
                                            message: `是否追踪`
                                        }],
                                    })(
                                        <Input placeholder={`半程可追踪`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>


                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道类型" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('afterSku', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道类型`
                                        }],
                                    })(
                                        <Input placeholder={`邮政`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>

                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="渠道分组" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('beforeSku', {
                                        rules: [{
                                            required: false,
                                            message: `请输入渠道分组`
                                        }],
                                    })(
                                        <Input placeholder={`外国邮政`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>


                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="追踪号位数" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('afterSku', {
                                        rules: [{
                                            required: false,
                                            message: `请输入追踪号位数`
                                        }],
                                    })(
                                        <Input placeholder={`18`}
                                               maxLength="100"/>
                                    )}


                                </FormItem>
                            </Col>

                        </Row>

                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="追踪号前三位" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('beforeSku', {
                                        rules: [{
                                            required: false,
                                            message: `请输入追踪号前三位`
                                        }],
                                    })(
                                        <Input placeholder={`请输入LBX`}
                                               maxLength="100"/>
                                    )}

                                </FormItem>
                            </Col>

                            <Col span={12}>
                                <FormItem  {...this.formItemLayout}
                                           label="标记网址" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('afterSku', {
                                        rules: [{
                                            required: false,
                                            message: `请输入标记网址`
                                        }],
                                    })(
                                        <Input placeholder={`https:www.17track.net/zh-cn`}
                                               maxLength="100"/>
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

export default Channelmodify