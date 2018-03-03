import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Form,
    Input,
    Select,
    Radio,
    Table,
    Button,
    Modal,
    Row,
    Col,
} from 'antd'
import '../css/css.css'
import * as config from "../../util/connectConfig";

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
import Modalmodel from './Modalmodel'
import {levelOptions} from "../../util/options";

class LogisticInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 17}
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
        visible: false,
        confirmLoading: false,
    }

    addinputdata = ({name, message, placeholder = '', initialValue = '', required = false, type = 'string',}) => (
        <FormItem style={{width: '100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, message: message, type: type}, {
                    validator: this.contactsvalid,
                }], initialValue: initialValue,
                onChange: name.match(/^remark/g) ? this.companyIntroductionHandle(name, 30) : null,
            })(
                <Input placeholder={placeholder} style={{width: '100%'}} maxLength="30"/>
            )}
        </FormItem>)

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }



    columns = [
        {
            title: '国际物流方式',
            className: 'column-order',
            dataIndex: 'warehouseOrderId',
            render: (text, record, index) => {
                return (
                    <div>China Post Registered Air Mail</div>
                )
            }
         },
        {
            title: '货运跟踪号',
            dataIndex: 'warehouseState',
            render: (text, record, index) => {
                const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
                const { visible, confirmLoading, ModalText } = this.state;
                const Option = Select.Option;
                function handleChange(value) {
                    console.log(`selected ${value}`);
                }

                function handleBlur() {
                    console.log('blur');
                }

                function handleFocus() {
                    console.log('focus');
                }
                return (
                    <div>
                        <div>RY514071819CN <a href onClick={this.showModal}>修改</a></div>
                        <Modal title="标记追踪号"
                               visible={visible}
                               onOk={this.handleOk}
                               confirmLoading={confirmLoading}
                               onCancel={this.handleCancel}
                               okText='提交'
                        >
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
                        </Modal>
                    </div>

                 )
            }
        },
        {
            title: '备注',
            dataIndex: 'deliveryState',
            render: (text, record, index) =>{
                return "aaaaaaaaaa"
            }
        },
        {
            title: '详情',
            dataIndex: 'deliveryBay',
            render: (text, record, index) => {
                return (
                    <div>
                        <p> 2017.11.05 21:14 (GMT-7): Started customs clearance process</p>
                        <p>2017.11.04 19:50 (GMT-7): Cleared customs</p>
                        <p>2017.10.31 23:44 (GMT-7): Shipment with local shipping company</p>
                        <div style={{textAlign: 'right',marginTop: '10px'}}>
                            <Button>展开详情</Button>
                            <Button>刷新</Button>
                            <Button>查看详情</Button>
                        </div>
                    </div>
                )
            }
        }];

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

    ModalhandleOk2 = () => {
        const data = [...this.props.tablemodel.data];
        const delkey2 = this.props.tablemodel2.delkey2;
        data.splice(delkey2, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.tablemodelaction({data: data,});
            this.props.modalmodelaction({
                visible2: false,
                confirmLoading: false,
            });

        }, 500);
    }
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    }

    handleAdd2 = () => {
        const {count, data} = this.props.tablemodel;
        const newData = {
            key: count + '',
            No: count + '',
            warehouseOrderId: {name: 'warehouseOrderId' + count, message: '请输入分仓订单号', placeholder: '请输入分仓订单号',},
            warehouseState: {name: 'warehouseState' + count, message: '请输入分仓订单状态', placeholder: '请输入分仓订单状态',},
            deliveryState: {name: 'deliveryState' + count, message: '请输入发货状态', placeholder: '请输入发货状态',},
            deliveryBay: {name: 'deliveryBay' + count, message: '请输入发货仓', placeholder: '请输入发货仓',},
            channelName: {name: 'channelName' + count, message: '请输入物流渠道', placeholder: '请输入物流渠道',},
            skuNum: {name: 'skuNum' + count, message: '请输入SKU/数量', placeholder: '请输入SKU/数量',},
            weight: {name: 'weight' + count, message: '请输入重量', placeholder: '请输入重量',},
        };

        this.props.tablemodelaction({data: [...data, newData], count: count + 1,})
    }


    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const {data} = this.props.tablemodel;
        const columns = this.columns;

        return (
            <div className="newCluenk">
                <div className="title" id="logistic-info">物流信息</div>
                <div className="content">

                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data}
                        bordered

                    />


                </div>
            </div>
        );
    }
}

export default LogisticInfo
