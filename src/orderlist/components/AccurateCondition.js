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
const RadioGroup = Radio.Group;



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
            console.log(values)
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'searchType'||i == 'searchContent') {
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
        this.props.platformsearchaction({visible:true,fileds:{name:'platformname',id:'platformId'}})
        this.props.fetchsearchplatform({key: 'data', value: {isPass: 'no',}})
    }

    countrySelect =() =>{
        this.props.countrysearchaction({visible:true,fileds:{name:'countryname',id:'countryId'}})
        this.props.fetchsearchcountry({key: 'data', value: {isPass: 'no',}})
    }


    render() {
        console.log(this.props)
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (

                <div className="newCluenk" style={{border:'none',marginBottom:'0px'}}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">

                        <Row style={{'padding': '8px 0px'}}>


                            <Col span={24}>
                                <FormItem  {...this.formItemLayout}
                                           label="搜索类型" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('searchType', {
                                        rules: [{
                                            required: false,
                                            message: `请输入`
                                        }],initialValue: 1
                                    })(
                                        <RadioGroup>
                                            <Radio value={1}>平台订单号</Radio>
                                            <Radio value={2}>YKS订单号</Radio>
                                            <Radio value={3}>转换前sku</Radio>
                                            <Radio value={4}>转换后SKU</Radio>
                                        </RadioGroup>
                                    )}


                                </FormItem>
                            </Col>

                        </Row>

                        <Row style={{'padding': '8px 0px'}}>


                            <Col span={24}>
                                <FormItem  {...this.formItemLayout}
                                           label="搜索内容" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('searchContent', {
                                        rules: [{
                                            required: false,
                                            message: `请输入`
                                        }],
                                    })(
                                        <Input.TextArea style={{"width": "400px", }} rows={3} placeholder="支持多个搜索条件换行精确搜索，最多15个" autosize={{ minRows: 3, maxRows: 15 }}
                                                        />
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