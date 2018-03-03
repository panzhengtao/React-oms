import React, {Component} from 'react'
import {
    Modal,
    Button,
    Steps,
    Table,
    Row,
    Col
} from 'antd';

class OrderInfo extends React.Component {

    render() {
        const Step = Steps.Step;
        const {data} = this.props.tablemodel;
        const columns = this.columns;

        return (
            <div className="newCluenk">
                <div className="title" id="order-info"> 订单信息</div>
                <div className="content">
                    <div>
                        <Steps size="small" current={1}>
                            <Step title="买家下单" />
                            <Step title="买家付款" />
                            <Step title="卖家发货" />
                            <Step title="订单完成" />
                        </Steps>
                    </div>
                    <div style={{color: '#666', fontSize: '14px', paddingTop: '20px'}}>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>平台</strong>
                            </Col>
                            <Col span={6} style={{textAlign: 'center'}}>
                                aliexpress
                            </Col>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>账号</strong>
                            </Col>
                            <Col span={6} style={{textAlign: 'center'}}>
                                US1232312cn
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>平台单号</strong>
                            </Col>
                            <Col span={6} style={{textAlign: 'center'}}>
                                213456789098765
                            </Col>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>状态</strong>
                            </Col>
                            <Col span={6} style={{textAlign: 'center'}}>
                                等待买家付款
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>剩余发货时间</strong>
                            </Col>
                            <Col span={6} style={{textAlign: 'center'}}>
                                4天 23小时 31分钟 23秒
                            </Col>
                        </Row>
                    </div>
                 </div>
            </div>
        );
    }
}

export default OrderInfo;