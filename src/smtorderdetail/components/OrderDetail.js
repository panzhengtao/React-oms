import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Row,
    Col,
} from 'antd'
import '../css/css.css'

class OrderDetail extends React.Component {
    render () {
        return(
            <div className="newCluenk">
                <div className="title" id="order-detail"> 订单详情</div>
                <div className="content">
                    <div>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>买家ID</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                                A2 max SILVA
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>收件人</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>地址</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>邮编</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>手机</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>电话</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>传真</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
export default OrderDetail;