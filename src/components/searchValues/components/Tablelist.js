import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Button,
    Table,
    Pagination,
    Spin,
} from 'antd'
import {timestampFromat} from '../../../util/baseTool';

class Tablelist extends Component {

    constructor(props) {
        super(props);
    }

    columns = [{
        title: '序号',
        dataIndex: 'platformOrderNumber',
        width: 70,
        render: (text, record, index) => ++index
    }, {
        title: `${this.props.searchValues.title}`,
        className: '',
        dataIndex: 'name',
    },
        {
            title: '操作',
            width: 70,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                let type = '', value = '未选择';
                if (record.checked) {
                    type = 'primary';
                    value = '已选择'
                }
                return <Button type={type} onClick={() => {
                    this.onchangeHaddle(index)
                }}>{value}</Button>
            },
        }];

    onchangeHaddle = (index) => {
        const {data, type} = this.props.searchValues;
        if (type != 'multiple') {
            data.map(v => v.checked = false)
        }
        data[index].checked = !data[index].checked;

        this.props.searchVluesaction({data})
    }


    Paginatihandle = (page, pageSize) => {
        const value = this.props.form.getFieldValue('keywords');
        const newobj = {keywords: value}
        this.props.fetchsearchValues({
            key: 'data',
            value: {key: 'data', value: {...newobj, pageSize: page, offset: pageSize}}
        })
    }


    render() {

        const {data} = this.props.searchValues;
        const columns = this.columns;

        return (
            <Spin spinning={this.props.searchValues.loading} delay={500} tip="Loading...">
                <Table columns={columns} dataSource={data} bordered
                       pagination={false}/>

                <Pagination style={{padding: '10px 0px', textAlign: 'right'}}
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger showQuickJumper
                            current={this.props.searchValuesPagination.current}
                            defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                            total={this.props.searchValuesPagination.total}
                            pageSize={this.props.searchValuesPagination.pageSize}
                            onChange={this.Paginatihandle}/>
            </Spin>
        );
    }
}

export default Tablelist