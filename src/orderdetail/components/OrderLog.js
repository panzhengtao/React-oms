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
import {datasaddkey} from '../../util/baseTool';


class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    columns = [{
        title: '序号',
        dataIndex: 'No',
        render: text => text,
        width: 50,
    }, {
        title: '操作属性',
        className: 'column-order',
        dataIndex: 'attribute',
        render: text => text,
        width: 120,
    }, {
        title: '描述',
        dataIndex: 'msg',
        render: text => text,
    },
        {
            title: '用户名',
            dataIndex: 'userName',
            render: text => text,
            width: 120
        },
        {
            title: '用户ID',
            dataIndex: 'userId',
            render: text => text,
            width: 120
        },
        {
            title: '操作时间',
            dataIndex: 'time',
            render: text => text,
            width: 150,

        }];


    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const {data} = this.props.tablemodel5;
        const newdata = datasaddkey(data)
        const columns = this.columns;

        return (
            <div className="newCluenk">
                <div className="title">订单日志</div>
                <div className="content">
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={newdata}
                        bordered

                    />
                </div>
            </div>
        );
    }
}

export default WarehouseOrder
