import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import {
    Form,
    Button,
    Select,
    Radio,
    Table,
    Pagination,
    Spin,
} from 'antd'
import '../css/css.css'
import '../../common/css/css.css'
const FormItem = Form.Item
const Option = Select.Option
import {timestampFromat,datasaddkey} from '../../util/baseTool';
import { Link } from 'react-router-dom'


class Tablelist extends Component {

    constructor(props) {
        super(props);
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'sid',
            width: 50,
            render: (text, record, index) => ++index
        },{
        title: '平台订单号',
        dataIndex: 'platformOrderNumber',
        width: 100,
        render: (text, record, index) => {
            const url = `/orderdetail/?orderId=${record.orderId}`
            return (<Link  to={url}>{text}</Link>)
        }
    }, {
        title: '有棵树订单号',
        className: '',
        dataIndex: 'yksOrderNumber',
        width: 120,
    }, {
        title: '销售账号',
        dataIndex: 'saleAccount',
        render: this.addinputdata,
        width: 80,
    },
        {
            title: '买家账号',
            dataIndex: 'buyerAccount',
            width: 80,
        },
        {
            title: '国家',
            width: 60,
            dataIndex: 'countryName',
        },
        {
            title: '销售平台',
            dataIndex: 'platformName',
            width: 80,

        },
        {
            title: '实付金额',
            dataIndex: 'payment',
            width: 80,
        },
        {
            title: '客付运费',
            dataIndex: 'freight',
            width: 80,
        },
        {
            title: '付款时间',
            dataIndex: 'paymentTime',
            render: (text, record) => timestampFromat(text,2),
            width: 90,
        },
        {
            title: '订单状态',
            dataIndex: 'orderStateName',
            width: 80,
        },
        {
            title: '订单类型',
            dataIndex: 'orderTypeName',
            width: 80,
        },
        {
            title: '客服',
            dataIndex: 'customerService',
            width: 60,
        },
        {
            title: '操作',
            width: 50,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const url = `/orderdetail/?orderId=${record.orderId}`
                return (<Link to={url}>查看</Link>)
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

        const {data} = this.props.tablemodel;

        const newdata =datasaddkey(data)
        console.log(newdata)
        const columns = this.columns;

        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: true,
            }),
        };

        return (
            <div className="newCluenk">
                <div className="title"><Button
                    type="primary" style={{padding: '5px 15px', marginRight: '5px', border: 'none'}}
                    ghost size="large" onClick={this.handleSubmit}
                >
                    导出订单列表
                </Button>
                </div>
                <div className="content">

                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                        <Table rowSelection={null} columns={columns} dataSource={data} bordered
                               pagination={false}/>
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
            </div>
        );
    }
}

export default Tablelist