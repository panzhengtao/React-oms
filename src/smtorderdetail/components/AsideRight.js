import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Tabs,
    Anchor,
} from 'antd'

class AsideRight extends React.Component {
    render() {
        const { Link } = Anchor;
        return (
            <div class="newCluenk" style={{}}>
                <div class="title">快速导航</div>
                <Anchor>
                    <Link href="#order-info" title="订单信息" />
                    <Link href="#logistic-info" title="物流信息" />
                    <Link href="#order-detail" title="订单详情"></Link>
                    <Link href="#capital-detail" title="资金详情" />
                    <Link href="#time-record" title="时间记录" />
                    <Link href="#product-info" title="产品信息" />
                    <Link href="#client-msg" title="客户留言" />
                    <Link href="#operation-log" title="操作日志" />
                </Anchor>
            </div>
        );
    }
}

export default AsideRight
