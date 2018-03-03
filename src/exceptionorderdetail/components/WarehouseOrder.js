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
import * as config from "../../util/connectConfig";

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class WarehouseOrder extends React.Component {
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

    columns = [{
        title: '序号',
        dataIndex: 'No',
        render: text => text,
        width: 50,
    }, {
        title: '分仓订单号',
        className: 'column-order',
        dataIndex: 'warehouseOrderId',
        render: this.addinputdata,
        width: 120,
    }, {
        title: '分仓订单状态',
        dataIndex: 'warehouseState',
        render: this.addinputdata,
        width: 120,
    },
        {
            title: '发货状态',
            dataIndex: 'deliveryState',
            render: this.addinputdata,
            width: 100,
        },
        {
            title: '发货仓',
            dataIndex: 'deliveryBay',
            render: this.addinputdata,
            width: 120,
        },
        {
            title: '物流渠道',
            dataIndex: 'channelName',
            render: this.addinputdata,

        },
        {
            title: 'SKU/数量',
            dataIndex: 'skuNum',
            render: this.addinputdata,
            width: 100,
        },
        {
            title: '重量',
            dataIndex: 'weight',
            render: this.addinputdata,
            width: 80,
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
                <div className="title">分仓订单</div>
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

export default WarehouseOrder
