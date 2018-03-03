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
    Radio,
    Table,
    Pagination,
    Spin,
    Divider
} from 'antd'
import '../css/css.css'
import '../../common/css/css.css'
const FormItem = Form.Item
const Option = Select.Option
import {timestampFromat} from '../../util/baseTool';

class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    columns = [{
        title: '平台',
        className: '',
        dataIndex: 'platform',
        width: 80,
        // render: (text, record, index) => {
        //     return ('aliexpress')
        // },
    }, {
        title: '配置规则名称',
        dataIndex: 'rule',
        width: 180,
        // render: (text, record, index) => {
        //     return ('普通订单配置')
        // },
    },{
            title: '状态',
            dataIndex: 'state',
            width: 80,
            // render: (text, record, index) => {
            //     return ('启用')
            // },
         },{
            title: '优先级',
            width: 60,
            dataIndex: 'priority',
            // render: (text, record, index) => {
            //     return ('1')
            // },
        },
        {
            title: '修改时间',
            dataIndex: 'modifitime',
            render: (text, record) => timestampFromat(text,2),
            width: 80,

        },
        {
            title: '操作人',
            dataIndex: 'operator',
            width: 80,
            // render: (text, record, index) => {
            //     return ('Bose')
            // },
        },{
            title: '操作',
            width: 80,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const urlDetail = `/orderdetail/?orderId=${record.orderId}`
                const urlModifile = `/orderdetail/?orderId=${record.orderId}`

                return (
                    <div>
                        <a target="_blank" href={urlDetail}>查看</a>
                        <Divider type="vertical" />
                        <a target="_blank" href={urlModifile}>修改</a>
                        <Divider type="vertical" />
                        <a>删除</a>
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
        this.props.fetchPosts({key: 'data', value: {...this.handleSubmit(), pageData: page, pageNumber: pageSize}});
        this.props.tablemodelaction({selectedRowKeys: []});
    }


    render() {

        const {data} = this.props.tablemodel;
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
                    ghost size="large"  onClick={this.platformSelect}
                >
                新增
                </Button>
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