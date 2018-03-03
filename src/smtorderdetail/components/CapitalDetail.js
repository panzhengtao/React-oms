import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Table
} from 'antd'
import '../css/css.css'

class CapitalDetail extends React.Component {
    render() {
        const dataSource = [{
            key: '1',
            productPrice: 'US $ 13.89',
            freight: 32,
            priceAdjustment: '',
            discount: 'US $ 0.00',
            sum: 'US $ 17.42',
            adtransactionFeedress: 'US $ 1.29',
            estimate: 'US $ 16.13'
        }, {
            key: '2',
            productPrice: 'US $ 13.89',
            freight: 42,
            priceAdjustment: '',
            discount: 'US $ 0.00',
            sum: 'US $ 17.42',
            adtransactionFeedress: 'US $ 1.29',
            estimate: 'US $ 16.13'
        }];
        const columns = [
            {
                title: '产品价格',
                dataIndex: 'productPrice',
                key: 'productPrice',
            }, {
                title: '运费',
                dataIndex: 'freight',
                key: 'freight',
            }, {
                title: '价格调整',
                dataIndex: 'priceAdjustment',
                key: 'priceAdjustment',
            }, {
                title: '优惠金额',
                dataIndex: 'discount',
                key: 'discount',
            }, {
                title: '订单总额',
                dataIndex: 'sum',
                key: 'sum',
            }, {
                title: '交易手续费',
                dataIndex: 'adtransactionFeedress',
                key: 'transactionFee',
            }, {
                title: '预计可得',
                dataIndex: 'estimate',
                key: 'estimate',
            }];

        const dataSource1 = [{
            key: '1',
            meet: 'US $ 13.89',
            payment: 32,
            payWay: '',
            paymentTime: '2018-02-01 18:43',
        }];
        const columns1 = [
            {
                title: '买家应付',
                dataIndex: 'meet',
                key: 'meet',
            }, {
                title: '已付款',
                dataIndex: 'payment',
                key: 'payment',
            }, {
                title: '支付方式',
                dataIndex: 'payWay',
                key: 'payWay',
            }, {
                title: '收款日期',
                dataIndex: ' paymentTime',
                key: ' paymentTime',
            }];

        return (
            <div className="newCluenk">
                <div className="title" id="capital-detail">资金详情</div>
                <div className="content">
                    <h4 className="title">订单总额</h4>
                    <div class="capital-detail">
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={false}
                            size="small" />
                    </div>
                    <h4 className="title">收款金额</h4>
                    <div class="capital-detail">
                        <Table
                            columns={columns1}
                            dataSource={dataSource1}
                            pagination={false}
                            bordered
                            size="small" />
                    </div>
                </div>
            </div>
        )
    }
}

export default CapitalDetail;