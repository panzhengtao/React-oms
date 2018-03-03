import React, {Component} from 'react'
import {render} from 'react-dom'
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

class Times extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    state = {
        readonly: true,
        numb1: {len: 0, color: ''},
        numb2: {len: 0, color: ''},
        numb3: {len: 0, color: ''},
        brandSelectorVisible: false,
        categorySelectorVisible: false,
        Selectortype: 'multiple',
        formloading: true,
    }

    companyIntroductionHandle = (n, v) => (e) => {
        const {value} = e.target;
        var len = value.length
        const reg = new RegExp('(.{' + v + '}).*', 'g');
        var color = ''
        if (len > v) {
            e.target.value = e.target.value.replace(reg, '$1');
            len = v
            color = "#ff0000";
        }
        this.setState({[n]: {len: len, color: color}})
    }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <div className="newCluenk">
                <div className="title">时间信息</div>
                <div className="content">

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="抓单时间"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('timeGet', {
                                    rules: [{required: false, message: '请输入抓单时间'}],
                                })(
                                    <DatePicker placeholder="请输入抓单时间" style={{width: '100%'}}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="导入时间"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('timeImport', {
                                    rules: [{required: false, message: '请输入导入时间'}],
                                })(
                                    <DatePicker placeholder="请输入导入时间" style={{width: '100%'}}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="分仓时间"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('timeWarehouse', {
                                    rules: [{required: false, message: '请输入分仓时间'}],
                                })(
                                    <DatePicker placeholder="请输入分仓时间" style={{width: '100%'}}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="发货时间"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('timeDeliver', {
                                    rules: [{required: false, message: '请输入发货时间'}],
                                })(
                                    <DatePicker placeholder="请输入发货时间" style={{width: '100%'}}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>


                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="状态更新时间"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('timeStateUpdate', {
                                    rules: [{required: false, message: '请输入状态更新时间'}],
                                })(
                                    <DatePicker placeholder="请输入状态更新时间" style={{width: '100%'}}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="下单时间"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('timeOrder', {
                                    rules: [{required: false, message: '请输入下单时间'}],
                                })(
                                    <DatePicker placeholder="请输入下单时间" style={{width: '100%'}}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="付款时间"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('timePayment', {
                                    rules: [{required: false, message: '请输入付款时间'}],
                                })(
                                    <DatePicker placeholder="请输入付款时间" style={{width: '100%'}}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="买家留言"  {...this.formItemLayout}
                                style={{"width": "100%", 'marginTop': '0px'}}
                            >
                                {getFieldDecorator('buyerMessage', {
                                    rules: [{required: false, message: '请填写买家留言(100个字符)'}],
                                    onChange: this.companyIntroductionHandle('numb3', 100)
                                })(
                                    <div style={{position: 'relative'}}>
                                        <Input.TextArea rows={3}
                                                        placeholder="请填写买家留言（100个字符）"
                                                        value={this.props.Infos.buyerMessage && this.props.Infos.buyerMessage.value}/>
                                        <p style={{
                                            position: 'relative',
                                            position: 'absolute',
                                            bottom: '0px',
                                            right: '0px',
                                            paddingRight: '10px',
                                            color: this.state.numb3.color,
                                        }}
                                            /* ref={(node) => {this.numb3 = node}}*/>{this.state.numb3.len}/100</p>
                                    </div>
                                )}

                            </FormItem>
                        </Col>
                    </Row>


                </div>
            </div>
        );
    }
}

export default Times
