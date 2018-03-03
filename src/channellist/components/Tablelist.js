import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel  from '../../components/modalmodel'
import {
    Form,
    Button,
    Select,
    Radio,
    Table,
    Pagination,
    Spin,
    Divider,
    Modal
} from 'antd'
import '../css/css.css'
import '../../common/css/css.css'
const FormItem = Form.Item
const Option = Select.Option
import {timestampFromat} from '../../util/baseTool';
import Channelmodify from './Channelmodify';
class Tablelist extends Component {

    constructor(props) {
        super(props);
    }

    columns = [{
        title: '平台',
        className: '',
        dataIndex: 'platform',
        width: 60,
    }, {
        title: '渠道名称',
        dataIndex: 'channelName',
        width: 80,
    },
        {
            title: '渠道编号',
            dataIndex: 'channelNumber',
            width: 80,
        },
        {
            title: '渠道类型',
            width: 60,
            dataIndex: 'channelType',
        },
        {
            title: '渠道分组',
            dataIndex: 'channelGroup',
            width: 80,

        },
        {
            title: '是否追踪',
            dataIndex: 'trackabled',
            width: 60,
        },
        {
            title: '平台标记',
            dataIndex: 'platformSign',
            width: 80,
        },
        {
            title: '标记网址',
            dataIndex: 'signWebsite',
            width: 90,
        },
        {
            title: '追踪号位数',
            dataIndex: ' trackNumDigit',
            width: 60,
        },
        {
            title: '追踪号前三位',
            dataIndex: 'trackNumLimit',
            width: 60,
        },
        {
            title: '操作',
            width: 80,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const urlDetail = `/orderdetail/?orderId=${record.orderId}`
             //   const urlModifile = `/orderdetail/?orderId=${record.orderId}`
                return (
                    <div>
                        <a target="_blank" href={urlDetail}>查看</a>
                        <Divider type="vertical" />
                        <a onClick={this.showModifyModal}>修改</a>
                        <Divider type="vertical" />
                        <a onClick={this.showDeleteModal}>删除</a>

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

    ModalhandleCancel=()=>{
        this.props.modalmodelaction({visible:false})
    }

    openModalhandle=()=>{
        this.props.modalmodelaction({visible:true})
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

        const content =<Channelmodify {...this.props} />;
        return (
            <div className="newCluenk">
                <div className="title"><Button
                    type="primary" style={{padding: '5px 15px', marginRight: '5px', border: 'none'}}
                    ghost size="large" onClick={this.openModalhandle}
                >
                    新增
                </Button>
                <Button
                    type="primary" style={{padding: '5px 15px', marginRight: '5px', border: 'none'}}
                    ghost size="large" onClick={this.infoModal}>
                    同步渠道
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
