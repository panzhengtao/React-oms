import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel  from '../components/Modalmodel'
import {
    Form,
    Button,
    Select,
    Input,
    Row,
    Col,
    Radio,
    Table,
    Pagination,
    Spin,
    Modal
} from 'antd'
import '../css/css.css'
import '../../common/css/css.css'
const FormItem = Form.Item
const Option = Select.Option
import {timestampFromat} from '../../util/baseTool';
import {levelOptions} from '../../util/options';
import { Link } from 'react-router-dom';


class Tablelist extends Component {
    constructor(props) {
        super(props);
    }
    formItemLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 17}
    }
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    columns = [
        {
            title: '平台单号',
            dataIndex: 'platformNumber',
            key:  'platformNumber',
            width: 100,
            render: (text, record, index) => {
                const url = `/orderdetail/?orderId=${record.orderId}`
                return (<a target="_blank" href={url}>{text}</a>)
            }
        }, 
        {
            title: '商品信息',
            dataIndex: 'goods',
            key: 'goods',
            width: 280,
            render: (text, record, index) => {
            const url = `/orderdetail/?orderId=${record.orderId}`
            return (
            <div>
                <div>
                    <ul className='goodsInfo'>
                        {record.goods.map((item, index) => {
                         return (<li key={index}>
                                     <div className='img'>
                                         <img style={{width: '60px',height: '60px'}} src={item.image} />
                                     </div>
                                     <div className='info'>
                                         <a href="true" className='name'>{item.name}</a>
                                         <a href="true"><strong>商品编码:{item.number}</strong></a>
                                     </div>
                                 </li>)
                        })}
                    </ul>
                </div>
            </div>)
            }
        }, 
        {
            title: '日期',
            dataIndex: 'orderTime',
            key: 'orderTime',
            render: (text, record, index) => {
                return (
                    <div>
                        <p>下单：<span>{timestampFromat(record.orderTime,2)}</span></p>
                        <p>付款：<span>{timestampFromat(record.paymentTime,2)}</span></p>
                        <p>剩余：<span>{timestampFromat(record.deliveryTime,2)}</span></p>
                    </div>
                )
            },
            width:200,
        },
        {
            title: '单价',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            width: 80,
            render: (text, record, index) =>{
                return (
                    <div className="flex">
                        <ul className="flex-items">
                            {record.goods.map((item, index) =>{
                                return <li key={index}>￥{item.unitPrice}</li>
                            })}
                        </ul>
                    </div>
                )
            }
        },
        {
            title: '数量',
            width: 60,
            dataIndex: 'num',
            key: 'num',
            render: (text, record, index) =>{
                return (
                    <div className="flex">
                        <ul className="flex-items">
                            {record.goods.map((item, index) =>{
                                return <li key={index}>{item.num}</li>
                            })}
                        </ul>
                    </div>
                )
            }
        },
        {
            title: '未读留言',
            dataIndex: 'message',
            key: 'message',
            width: 80,
            render: (text, record, index) =>{
                return (
                    <div className="flex">
                        <ul className="flex-items">
                            {record.goods.map((item, index) =>{
                                return <li key={index}><a href="true">{item.unitPrice}</a></li>
                            })}
                        </ul>
                    </div>
                )
            }
        },
        {
            title: '店铺帐号',
            dataIndex: 'platformAccount',
            key: 'platformAccount',
            width: 90,
            render: (text, record, index) =>{
                return <span>{text}</span>
            }
        },
        {
            title: '买家',
            dataIndex: 'buyers',
            key: 'buyers',
            width: 80,
            render: (text, record, index) =>{
                return (
                    <div><strong style={{color: 'red'}}>{text.grade}</strong>{text.account}</div>
                )
            }
        },
        {
            title: '订单类型',
            dataIndex: 'isPhoneState',
            key: 'isPhoneState',
            width: 80,
            render: (text, record, index) =>{
                return (
                    <div>
                        <p>等待您发货</p>
                        <p>{text ?"手机订单" : "PC订单"}</p>
                    </div>
                )
            }
        },
        {
            title: '金额',
            dataIndex: 'sum',
            key: 'sum',
            width: 80,
            render: (text, record, index) => {
                return <span>${text}</span>
            }
        },
        {
            title: '操作',
            width: 90,
            dataIndex: 'Operation',
            key: 'Operation',
            fixed: 'right',
            render: (text, record, index) => {
                const url = `/smtorderdetail/?orderId=${record.orderId}`;
                return (
                    <div>
                        <p><a onClick={this.showModal}>标记跟踪号</a></p>
                        <p><a >同步订单</a></p>
                        <p><Link to={url}>订单详情</Link></p>
                    </div>
                )
            },
        }];

    componentDidMount() {

    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.tablemodelaction({selectedRowKeys, selectedRows});
    }


    Paginatihandle = (page, pageSize)=> {
        this.props.fetchPosts({key: 'data', value: {...this.handleSubmit(), pageSize: page, offset: pageSize}});
        this.props.tablemodelaction({selectedRowKeys: []});
    }


    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const {data} = this.props.tablemodel;
        const columns = this.columns;
        const { visible, confirmLoading, ModalText } = this.state;
        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: true,
            }),
        };
        return (
            <div className="newCluenk">
                <Row style={{'padding': '8px 10px'}}>
                    <Col span={3}>
                        <Select style={{width: '100%'}} placeholder="请选择">
                            {levelOptions('企业性质').map(item => {
                                return (
                                    <Option key={item.value} value={item.value}
                                    >
                                        {item.label}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Col>
                    <Col span={21} style={{textAlign: 'right'}}>
                        <Button style={{marginRight: '10px'}}>同步订单</Button>
                        <Button>订单导出</Button>
                    </Col>
                </Row>
                <div className="content">
                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                        <Table rowSelection={rowSelection}
                               columns={columns}
                               dataSource={data}
                               pagination={false}
                               className= "table-smtlist"
                               scroll={{x: 1300}}
                        />
                    </Spin>
                    <Pagination style={{padding: '10px 0px', textAlign: 'right'}}
                                showTotal={total => `共 ${total} 条`}
                                pageSizeOptions={['20', '30', '40', '50']}
                                showSizeChanger showQuickJumper
                                current={this.props.Paginationmodel.current}
                                defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                                total={this.props.Paginationmodel.total}
                                pageSize={this.props.Paginationmodel.pageSize}
                                onChange={this.Paginatihandle}/>

                </div>
                <Modal title="标记追踪号"
                       visible={visible}
                       onOk={this.handleOk}
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                       okText='提交'
                >
                    <div className="edit-trackid">
                        <Row>
                            <Col span={24}>
                                <FormItem  {...this.formItemLayout}
                                           label="关联平台单号" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('platformOrderNumber', {
                                        initialValue: '503324344523443322',
                                        rules: [{
                                            required: false,
                                        }],
                                    })(
                                        <Input maxLength="100"/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem {...this.formItemLayout}
                                          label="发货地" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('orderStateId', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择">
                                            {levelOptions('企业性质').map(item => {
                                                return (
                                                    <Option key={item.value} value={item.value}
                                                    >
                                                        {item.label}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem {...this.formItemLayout}
                                          label="物流服务类型" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('orderStateId', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择">
                                            {levelOptions('企业性质').map(item => {
                                                return (
                                                    <Option key={item.value} value={item.value}
                                                    >
                                                        {item.label}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem {...this.formItemLayout}
                                          label="物流服务名称" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('orderStateId', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择">
                                            {levelOptions('企业性质').map(item => {
                                                return (
                                                    <Option key={item.value} value={item.value}
                                                    >
                                                        {item.label}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem  {...this.formItemLayout}
                                           label="货物跟踪号" style={{"width": "100%", paddingRight: '10px'}}
                                >

                                    {getFieldDecorator('platformOrderNumber', {
                                        rules: [{
                                            required: false,
                                        }],
                                    })(
                                        <Input maxLength="100"/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div style={{color: 'red', textAlign: 'center'}}>在第一次填写完发货通知后的10天内有2次修改机会</div>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Tablelist