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

class ConsigneeAddress extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    formItemLayout3 = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
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


    provincehandle = (name, returnName) => (value) => {
        const url = this.props.Infos.orOut.value == 2 ? `${config.connect_srm}/clue/getZone.do` : `${config.connect_srm}/clue/getArea.do`
        this.props.fetchzonesPosts({url, name, value: value['key'], returnName})
    }

    render() {

        const {getFieldDecorator} = this.props.form;


        const {
            provincebase, provinces, citybase, citys, countybase, countys, townbase, towns
        } = this.props.Infos;

        const provincesarr = provinces ? provinces.map((v, i, a) => (<Option key={v['id']}>{v['name']}</Option>)) : []
        const citysarr = citys ? citys.map((v, i, a) => (<Option key={v['id']}>{v['name']}</Option>)) : []
        const countysarr = countys ? countys.map((v, i, a) => (<Option key={v['id']}>{v['name']}</Option>)) : []
        const townsarr = towns ? towns.map((v, i, a) => (<Option key={v['id']}>{v['name']}</Option>)) : []

        const provinceText = provincebase ? provincebase.value ? provincebase.value.label ? provincebase.value.label + ' ' : '' : '' : '';
        const cityText = citybase ? citybase.value ? citybase.value.label ? citybase.value.label + ' ' : '' : '' : '';
        const countyText = countybase ? countybase.value ? countybase.value.label ? countybase.value.label + ' ' : '' : '' : '';
        const townText = townbase ? townbase.value ? townbase.value.label ? townbase.value.label + ' ' : '' : '' : '';

        const addressText = provinceText + cityText + countyText + townText


        return (
            <div className="newCluenk">
                <div className="title">收货人地址信息</div>
                <div className="content">

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="收货人"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('consignee', {
                                    rules: [{required: false, message: '请输入收货人'}],
                                })(
                                    <Input placeholder="请输入收货人" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="国家全称"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('caCountry', {
                                    rules: [{required: false, message: '请输入国家全称'}],
                                })(
                                    <Input placeholder="请输入国家全称" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="国家简称"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('countryAbb', {
                                    rules: [{required: false, message: '请输入国家简称'}],
                                })(
                                    <Input placeholder="请输入国家简称" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="邮编"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('zip', {
                                    rules: [{required: false, message: '请输入邮编'}],
                                })(
                                    <Input placeholder="请输入邮编" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="固定电话"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('tel', {
                                    rules: [{required: false, message: '请输入固定电话'}],
                                })(
                                    <Input placeholder="请输入固定电话" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="移动电话"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('phone', {
                                    rules: [{required: false, message: '请输入移动电话'}],
                                })(
                                    <Input placeholder="请输入移动电话" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>


                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="邮箱地址"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('email', {
                                    rules: [{required: false, message: '请输入邮箱地址'}],
                                })(
                                    <Input placeholder="请输入邮箱地址" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="社交账号"  {...this.formItemLayout} style={{"width": "100%"}}
                            >
                                {getFieldDecorator('socialAccount', {
                                    rules: [{required: false, message: '请输入社交账号'}],
                                })(
                                    <Input placeholder="请输入社交账号" id="success" maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{'padding': '8px 0px'}}>
                        <Col span={12} style={{textAlign: 'left'}}>
                            <FormItem
                                label="详细地址"  {...this.formItemLayout}
                                style={{"width": "100%", 'marginTop': '5px'}}
                            >
                                {getFieldDecorator('province', {
                                    rules: [{required: false, message: '请选择省'}],
                                    initialValue: this.props.Infos.provincebase ? this.props.Infos.provincebase : undefined
                                })(
                                    <Select labelInValue style={{"width": "25%", paddingRight: "5px"}}
                                            placeholder="请选择省"
                                            onChange={this.provincehandle('id', 'citys')}>
                                        {provincesarr}
                                    </Select>
                                )}

                                {getFieldDecorator('city', {
                                    rules: [{required: false, message: '请选择市'}],
                                })(
                                    <Select labelInValue style={{"width": "25%", paddingRight: "5px"}}
                                            placeholder="请选择市"
                                            onChange={this.provincehandle('id', 'countys')}>
                                        {citysarr}
                                    </Select>
                                )}

                                {getFieldDecorator('county', {
                                    rules: [{required: false, message: '请选择镇'}],
                                })(
                                    <Select labelInValue style={{"width": "25%", paddingRight: "5px"}}
                                            placeholder="请选择镇"
                                            onChange={this.provincehandle('id', 'towns')}>
                                        {countysarr}
                                    </Select>
                                )}

                                {getFieldDecorator('town', {
                                    rules: [{required: false, message: '请选择县'}],
                                })(
                                    <Select labelInValue style={{"width": "25%"}}
                                            placeholder="请选择县">
                                        {townsarr}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label=""  {...{
                                ...this.formItemLayout, ...{
                                    wrapperCol: {
                                        span: 19,
                                        offset: 5
                                    }
                                }
                            }} style={{"width": "100%", 'marginTop': '10px'}} colon={false}
                            >
                                {getFieldDecorator('address', {
                                    rules: [{required: false, message: '详细地址'}],
                                    initialValue: this.props.Infos.address && this.props.Infos.address.value
                                })(
                                    <Input addonBefore={addressText} maxLength="200"
                                           placeholder="详细地址（注意：只填写路、门号等详细地址）"
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default ConsigneeAddress
