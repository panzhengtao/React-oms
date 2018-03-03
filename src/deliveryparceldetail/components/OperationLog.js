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


class OperationLog extends React.Component {
    constructor(props) {
        super(props);
    }

    columns = [
        {
        title: '销售平台',
        dataIndex: 'platformName',
        render: text => text,
        width: 120,
       },
        {
        title: '销售账号',
        dataIndex: 'saleAccount',
        render: text => text,
        width: 120,
       },
        {
        title: '审核人',
        dataIndex: 'processingperson',
        render: text => text,
        width: 120,
       },
        {
            title: '处理结果',
            dataIndex: 'processingstate',
            render: text => text,
            width: 120
        },
        {
            title: '操作时间',
            dataIndex: ' operationtime',
            render: text => text,
            width: 120
        },
        {
            title: '备注',
            dataIndex: 'remarks',
            render: text => text,
            width: 100,

        }];


    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const {data} = this.props.tablemodel5;
        const columns = this.columns;

        return (
            <div className="newCluenk">
                <div className="title">操作日志</div>
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

export default OperationLog
