import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    Spin,
} from 'antd'
import '../css/css.css'
import * as config from "../../util/connectConfig";

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
import Modalmodel from '../../components/modalmodel'
import {levelOptions} from "../../util/options";

class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    state = {
        readonly: true,
        numb1: {len: 0, color: ''},
        numb2: {len: 0, color: ''},
        numb3: {len: 0, color: ''},
        brandSelectorVisible: false,
        categorySelectorVisible: false,
        Selectortype: 'multiple',
        formloading: true,
    }


    addselectdata2 = ({name, message, initialValue = undefined, placeholder = ''}) => (
        <FormItem style={{width: '100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}], initialValue: initialValue
            })(
                <Select style={{width: '100%'}} placeholder="请选择">
                    {levelOptions('品牌类型').map(item => {
                        return (
                            <Option key={item.value} value={item.value}
                            >
                                {item.label}
                            </Option>
                        )
                    })}
                </Select>
            )}
        </FormItem>)

    upIcon = (<Icon type="plus" className="avatar-uploader-trigger"/>)

    uploadicon = (id, num, ic = this.upIcon) =>
        this.props.form.getFieldValue(id) && this.props.form.getFieldValue(id).length >= num ? null : ic

    normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    uploadonChange = (info) => {
        const status = info.file.status;
        const response = info.file.response;
        if (status === 'done') {
            message.success(`${info.file.name} 图片上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 图片上传失败.`);
        }
    }

    handlePreview = (file) => {

        this.props.modalmodelaction({
            previewVisible: true,
            previewImage: file.url || file.thumbUrl,
        });

    }

    uploadsprops2 = {
        name: 'Filedata',
        listType: 'picture-card',
        className: 'upload-list-inline',
        onPreview: this.handlePreview,
        multiple: true,
        accept: 'image/*',
        beforeUpload: this.beforeUpload,
        action: `${config.connect_img}/upload?type=approveLicensePic`,
    }

    adduploaddata = ({name, message, initialValue = [], placeholder = '', num = 1}) => {
        const newname = name.replace(/(.*?)s(\d+)$/g, '$1$2')
        console.log(num)
        return (<FormItem style={{width: '100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}],
                onChange: this.uploadonChange,
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: initialValue,
            })(
                <Upload {...this.uploadsprops2} >
                    {this.uploadicon(name, num)}
                </Upload>
            )}


        </FormItem>)
    }

    addinputdata = ({name, message, placeholder = '', initialValue = '', required = false, }) => (
        <FormItem style={{width: '100%'}} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, message: message, }, ], initialValue: initialValue,
                onChange: name.match(/^remark/g) ? this.companyIntroductionHandle(name, 30) : null,
            })(
                <Input placeholder={placeholder} style={{width: '100%'}} maxLength="30"/>
            )}
        </FormItem>)

    Modalshow2 = (index) => () => {
        this.props.modalmodelaction({visible2: true,})
        this.props.tablemodelaction2({delkey2: index,})
    }

    columns = [{
        title: '序号',
        dataIndex: 'No',
        width: 50,
        render: text => text,
    }, {
        title: '缩略图',
        className: 'column-img',
        dataIndex: 'img',
        width: 160,
        render: this.adduploaddata,
    }, {
        title: '规格',
        dataIndex: 'sku',
        render: this.addinputdata,
    },
        {
            title: '销售单价',
            dataIndex: 'unit',
            render: this.addinputdata,
            width: 120,
        },
        {
            title: '销售数量',
            dataIndex: 'num',
            render: this.addinputdata,
            width: 80,
        },
        {
            title: '销售金额',
            dataIndex: 'amount',
            render: this.addinputdata,
            width: 100,

        },
        {
            title: '操作',
            width: 60,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                return (
                    this.props.tablemodel2.data2.length > 1 ?
                        (
                            <div><a onClick={this.Modalshow2(index)}>{text}</a>
                            </div>) : null
                );
            },
        }];

    companyIntroductionHandle = (n, v) => (e) => {
        const {value} = e.target;
        var len = value.length
        const reg = new RegExp('(.{' + v + '}).*', 'g');
        var color = ''
        if (len > v) {
            e.target.value = e.target.value.replace(reg, '$1');
            len = v
            color = "#ff0000";
        }
        this.setState({[n]: {len: len, color: color}})
    }

    ModalhandleOk2 = () => {
        const data2 = [...this.props.tablemodel2.data2];
        const delkey2 = this.props.tablemodel2.delkey2;
        data2.splice(delkey2, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.tablemodelaction2({data2: data2,});
            this.props.modalmodelaction({
                visible2: false,
                confirmLoading: false,
            });

        }, 500);
    }
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    }

    handleAdd2 = () => {
        const {count, data2} = this.props.tablemodel2;
        const newData = {
            key: count + '',
            No: count + '',
            img: {name: 'img' + count, message: '缩略图', placeholder: '缩略图', num: 3,},
            sku: {name: 'sku' + count, message: '规格', placeholder: '规格',},
            unit: {name: 'unit' + count, message: '销售单价', placeholder: '销售单价',},
            num: {name: 'num' + count, message: '销售数量', placeholder: '销售数量',},
            amount: {name: 'amount' + count, message: '销售金额', placeholder: '销售金额',},
            Operation: '删除',
        };

        this.props.tablemodelaction2({data2: [...data2, newData], count: count + 1,})
    }


    handleCancel2 = (visible) => () => this.props.modalmodelaction({[visible]: false,})

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        console.log(this.props)
        const {data2} = this.props.tablemodel2;
        const columns = this.columns;


        return (
            <div className="newCluenk">
                <div className="title">产品信息</div>
                <div className="content">

                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data2}
                        bordered
                        footer={() => <div style={{textAlign: 'center'}}><Button
                            className="editable-add-btn" onClick={this.handleAdd2}>+添加商品</Button>
                        </div>}
                    />

                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.visible2,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.ModalhandleOk2}
                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                 onCancel={this.ModalhandleCancel('visible2')}/>

                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.previewVisible,
                        title: '',
                        width: '650px',
                        style: {'maxWidth': '100%'}
                    }} footer={null} onCancel={this.handleCancel2('previewVisible')}
                                 ModalText={(
                                     <img alt='example' style={{'maxWidth': '100%'}}
                                          src={this.props.modalmodel.previewImage}/>)}/>
                </div>
            </div>
        );
    }
}

export default ProductInfo
