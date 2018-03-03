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


class ProductInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const dataSource = [{
            key: '1',
            productInfo: 'US $ 13.89',
            price: 32,
            num: '1',
            sum: 'US $ 0.00',
            state: '等待买家付款',
            shippingTime: '2018-2-14',
            remarks: 'REPAY ',
            productSum: '$1.00',
            freight: '$1.00',
            orderSum: '$1.00',
            estimate: 'US $ 16.13'
        }];
        const columns = [
            {
                title: '产品信息',
                dataIndex: 'productInfo',
                key: 'productInfo',
                width: 280,
                render: (text, record, index) => {
                    const url = `/orderdetail/?orderId=${record.orderId}`
                    return (
                        <div>
                            <div>
                                <ul class='goodsInfo'>
                                    <li>
                                        <div class='img'>
                                            <img style={{width: '60px',height: '60px'}} src="https://ae01.alicdn.com/kf/HTB1kSpuLpXXXXX8XpXXq6xXFXXXX/new-2014-t-shirt-men-collar-polo-shirt-clothing-solid-men-polo-slim-t-shirt-brand.jpg_220x220.jpg" />
                                        </div>
                                        <div class='info'>
                                            <a href="#" class='name'>U-Kiss 16 Tips Ear Cleaner Earpick Swab Easy Earwax Removal Remove Soft Spiral Cleaner Prevent Ear-pick Clean Tools Ear Care Kit</a>
                                            <a href="#"><strong>商品编码:USR&amp;A301_CD</strong></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>)
                }
            },{
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                width: 60,
            },{
                title: '数量',
                dataIndex: 'num',
                key: 'num',
                width: 60,
            },{
                title: '订单金额',
                dataIndex: 'sum',
                key: 'sum',
                width: 80,
            },{
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: 100,
            },{
                title: '物流时间',
                dataIndex: 'shippingTime',
                key: 'shippingTime',
                width: 100,
            }, {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
                width: 100,
            }, {
                title: '产品总额',
                dataIndex: 'productSum',
                key: 'productSum',
                width: 80,
            }, {
                title: '运费总额',
                dataIndex: 'freight',
                key: 'freight',
                width: 80,
            }, {
                title: '订单总额',
                dataIndex: 'orderSum',
                key: 'orderSum',
                width: 80,
            }, {
                title: '预计可得',
                dataIndex: 'estimate',
                key: 'estimate',
                width: 80,
            }];
        return (
            <div className="newCluenk">
                <div className="title" id='product-info'>产品信息</div>
                <div className="content">
                    <div>
                        <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered
                        pagination={false}
                        size="small" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductInfo
