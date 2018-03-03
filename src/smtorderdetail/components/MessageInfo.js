import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Input,
    Row,
    Col
} from 'antd'
import '../css/css.css'


class ProductInfo extends React.Component {


    render() {

        const { TextArea } = Input;

        return (
            <div className="newCluenk">
                <div className="title" id='client-msg'>留言信息</div>
                <div className="content">
                    <div>
                        <Row style={{padding: '20px'}}>
                            <Col span={4}>
                                <div style={{textAlign: 'right'}}>信息内容：</div>
                            </Col>
                            <Col span={20}>
                                <TextArea rows={6} value={'hi, gladly if the order arrives I make the payment, wait 3 days before returning me the money if it arrives in that time'}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductInfo
