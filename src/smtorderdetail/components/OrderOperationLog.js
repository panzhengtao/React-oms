import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Table
} from 'antd'
import '../css/css.css'


class OrderOperationLog extends React.Component {


    render() {
        const dataSource = [{
            key: '1',
            attribute: 'US $ 13.89',
            msg: 32,
            userName: '',
            userId: 'US $ 0.00',
            time: 'US $ 17.42',

        }, {
            key: '2',
            attribute: 'US $ 13.89',
            msg: 42,
            userName: '',
            userId: 'US $ 0.00',
            time: 'US $ 17.42',
        }];
        const columns = [
            {
                title: '操作属性（25）',
                dataIndex: 'attribute',
                key: 'attribute',
            }, {
                title: '描述（64）',
                dataIndex: 'msg',
                key: 'msg',
            }, {
                title: '用户名（64）',
                dataIndex: 'userName',
                key: 'userName',
            }, {
                title: '用户ID',
                dataIndex: 'userId',
                key: 'userId',
            }, {
                title: '操作时间',
                dataIndex: 'time',
                key: 'time',
            }];

        return (
            <div className="newCluenk">
                <div className="title" id='operation-log'>订单操作日志</div>
                <div className="content">
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        size="small" />
                </div>
            </div>
        )
    }
}

export default OrderOperationLog;
