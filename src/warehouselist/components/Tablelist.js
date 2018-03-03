import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel  from '../components/Modalmodel'
import { Link } from 'react-router-dom'
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
import {timestampFromat} from '../../util/baseTool';

class Tablelist extends Component {

    constructor(props) {
        super(props);
    }

    columns = [{
        title: '销售平台',
        className: '',
        dataIndex: 'salesPlatform',
        width: 80,
    }, {
        title: '规则名称',
        dataIndex: 'ruleName',
        render: this.addinputdata,
        width: 180,
    },{
            title: '优先级',
            width: 60,
            dataIndex: 'priority',
        },{
            title: '最后更新时间',
            dataIndex: 'lastTime',
            width: 120,

        },
        {
            title: '操作人',
            dataIndex: 'operator',
            width: 80,
        },{
            title: '操作',
            width: 50,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const url = `/orderdetail/?orderId=${record.orderId}`
                return (<a target="_blank" href={url}>查看</a>)
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
                    ghost size="large"
                >
                新增规则
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