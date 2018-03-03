import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel  from '../../components/modalmodel'
import { Link } from 'react-router-dom'
import {
    Form,
    Button,
    Select,
    Radio,
    Table,
    Pagination,
    Spin,
    Modal,
} from 'antd'
import '../css/css.css'
import '../../common/css/css.css'
const FormItem = Form.Item
const Option = Select.Option
import {timestampFromat} from '../../util/baseTool';
import Cancellation from './Cancellation';

class Tablelist extends Component {

    constructor(props) {
        super(props);
    }


    columns = [
    {
        title: '平台订单号',
        dataIndex: 'platformOrderNumber',
        width: 80,
        render: (text, record, index) => {
            const url = `/negativeprofitauditdetail/?orderId=${record.orderId}`
            return (<Link to={url}>{text}</Link>)
        }
    }, {
        title: 'YKS订单号',
        className: '',
        dataIndex: 'yksOrderNumber',
        width: 80,
    }, {
        title: '分仓订单号',
        dataIndex: 'warehouseOrderNumber',
        render: this.addinputdata,
        width: 80,
    },
        {
            title: '销售平台',
            dataIndex: 'platformName',
            width: 80,

        },
        {
            title: '物流渠道',
            dataIndex: 'logisticsChannel',
            width: 80,
        },
        {
            title: '物流追踪码',
            dataIndex: 'waybillNumber',
            width: 80,
        },
        {
            title: '国家全称',
            width: 80,
            dataIndex: 'country',
        },
        {
            title: '付款日期',
            dataIndex: 'paymentTime',
            render: (text, record) => timestampFromat(text,2),
            width: 80,
        },
        {
            title: '试算运费',
            dataIndex: 'trialFreight',
            width: 40,
        },
        {
            title: '净利润',
            dataIndex: 'profit',
            width: 50,
        },
        {
            title: '操作',
            width: 40,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const url = `/negativeprofitauditdetail/?orderId=${record.orderId}`
                return (<div><p style={{textAlign:'center'}}><a onClick={this.openModalhandle} style={{width:'65px',display:'block'}}>审核/撤销</a></p>
                    <p style={{textAlign:'center'}}><Link to={url}>查看</Link></p>
                </div>)
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
   
    //弹窗函数
    ModalhandleCancel=()=>{
        this.props.modalmodelaction({visible:false})
    }

    openModalhandle=()=>{
        this.props.modalmodelaction({visible:true})
    }

    render() {

        const {data} = this.props.tablemodel;
        const columns = this.columns;
        //弹窗content
        const content =<Cancellation {...this.props} />;

        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: false,
            }),
        };


        return (
            <div className="newCluenk">
                <div className="title">
                    <Button
                    type="primary" style={{padding: '5px 10px', marginRight: '5px', border:'none'}}
                    ghost size="large" onClick={this.handleSubmit}
                >
                    批量审核
                </Button>
                    <Button
                        type="primary" style={{padding: '5px 10px', marginRight: '5px', border:'none'}}
                        ghost size="large" onClick={this.handleSubmit}
                    >
                        批量撤销
                    </Button>
                     <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.visible,
                        ModalText: content,
                    }}
                                 footer={null}
                                 onCancel={this.ModalhandleCancel}/>
                </div>
                <div className="content">

                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered
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