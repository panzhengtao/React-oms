import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Row,
    Col
} from 'antd'
import '../css/css.css'

class TimesRecord extends React.Component {
    render() {
        return (
            <div className="newCluenk">
                <div className="title" id="time-record">时间记录</div>
                <div className="content">
                    <div>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>发货时间</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                                2018-02-01 22:26:18
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>付款时间</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                                2018-02-01 18:43:04
                            </Col>
                        </Row>
                        <Row style={{'padding': '8px 0px'}}>
                            <Col span={6} style={{textAlign: 'center'}}>
                                <strong>订单创建时间</strong>
                            </Col>
                            <Col span={18} style={{textAlign: 'center'}}>
                                2018-02-01 18:42:23
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
export default TimesRecord;