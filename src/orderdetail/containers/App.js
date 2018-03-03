import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import moment from 'moment'
import qs from 'QS'
import OrderInfo from '../components/OrderInfo'
import Times from '../components/Times'
import ConsigneeAddress from '../components/ConsigneeAddress'
import ProductInfo from '../components/ProductInfo'
import WarehouseOrder from '../components/WarehouseOrder'
import OrderLog from '../components/OrderLog'
import {
    Form,
    Button,
    Row,
    message,
    Spin,
} from 'antd'
import '../css/css.css'
import '../../common/css/css.css'


const FormItem = Form.Item
import axios from '../../util/axios'
import * as config from '../../util/connectConfig'
import {
    getUrlParams,
    timestampFromat,
    objTodata,
    objToarrsort,
    datasaddkey,
    sortarrToobj,
    objvaluesformat
} from '../../util/baseTool';

class UserForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        readonly: true,
        formloading: true,
    }

    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    fileListhanddle = (list) => {
        return list ? list.split('@').map((v, i) => ({
            uid: i,
            name: `${i}`,
            status: 'done',
            url: `${v}`,
        })) : []
    }

    componentDidMount() {
        this.props.fetchzonesPosts({
            url: `${config.connect_srm}/clue/getZone.do`,
            name: 'id',
            value: '',
            returnName: 'provinces'
        })
        this.props.fetchzonesPosts({
            url: `${config.connect_srm}/clue/getArea.do`,
            name: 'id',
            value: '',
            returnName: 'Hareas'
        })
        const locationarr = window.location.href.split('?');
        const orderId = locationarr.length > 1 ? qs.parse(locationarr[1])['orderId'] ? qs.parse(locationarr[1])['orderId'] : '' : '';
        if (orderId) {
            axios.get(`${config.api_url}/api/oms/order/list/detail`, {
                params: {
                    orderId: orderId
                }
            }).then(response => {

                if (response.status == 200) {

                    const {
                        platformOrderId, marketAccount, yksorderNumber, buyerEmail, orderState, orderType, platformName, oiCountry, rate, payway, buyerAccount,
                        customerService, platformCommission, platformFee, orderPayment, discount, payment, freight, abnormalType,
                        abnormalContent, logisticsBusiness,
                    } = response.data.data.orderInfo

                    const {
                        timeGet, timeImport, timeWarehouse, timeDeliver, timeStateUpdate, timeOrder, timePayment,
                    } = response.data.data.times;

                    const {
                        consignee, caCountry, countryAbb, zip, tel, phone, email, socialAccount, province, city, county, town, address,
                    } = response.data.data.ConsigneeAddress;

                    const productInfo = response.data.data.productInfo;
                    const productInfoarr = datasaddkey(productInfo)
                    const newtimeGet = timeGet ? moment(timestampFromat(timeGet)) : '';
                    const newtimeImport = timeImport ? moment(timestampFromat(timeImport)) : '';
                    const newtimeWarehouse = timeWarehouse ? moment(timestampFromat(timeWarehouse)) : '';
                    const newtimeDeliver = timeDeliver ? moment(timestampFromat(timeDeliver)) : '';
                    const newtimeStateUpdate = timeStateUpdate ? moment(timestampFromat(timeStateUpdate)) : '';
                    const newtimeOrder = timeOrder ? moment(timestampFromat(timeOrder)) : '';
                    const newtimePayment = timePayment ? moment(timestampFromat(timePayment)) : '';

                    this.props.form.setFieldsValue({
                        platformOrderId,
                        marketAccount,
                        yksorderNumber,
                        buyerEmail,
                        orderState,
                        orderType,
                        platformName,
                        oiCountry,
                        rate,
                        payway,
                        buyerAccount,
                        customerService,
                        platformCommission,
                        platformFee,
                        orderPayment,
                        discount,
                        payment,
                        freight,
                        abnormalType,
                        abnormalContent,
                        logisticsBusiness,
                        timeGet: newtimeGet,
                        timeImport: newtimeImport,
                        timeWarehouse: newtimeWarehouse,
                        timeDeliver: newtimeDeliver,
                        timeStateUpdate: newtimeStateUpdate,
                        timeOrder: newtimeOrder,
                        timePayment: newtimePayment,
                        consignee,
                        caCountry,
                        countryAbb,
                        zip,
                        tel,
                        phone,
                        email,
                        socialAccount,
                        province: province ? {key: town} : undefined,
                        city: city ? {key: city} : undefined,
                        county: county ? {key: county} : undefined,
                        town: town ? {key: town} : undefined,
                        address: address || undefined,
                    });

                    const newproductInfoarr = productInfoarr.length ? productInfoarr.map((v, i) => {

                        return ({
                            key: ++i + '',
                            No: i + '',
                            img: {
                                name: `img${v.key}`,
                                initialValue: this.fileListhanddle(v.img),
                                message: '请上传图片',
                                placeholder: '请上传图片',
                                num: 3,
                            },
                            sku: {
                                name: `sku${v.key}`,
                                initialValue: v.sku,
                                message: '请输入规格',
                                placeholder: '规格',
                            },
                            unit: {
                                name: `unit${v.key}`,
                                initialValue: v.unit,
                                message: '请输入销售单价',
                                placeholder: '销售单价',

                            },
                            num: {
                                name: `num${v.key}`,
                                initialValue: v.num,
                                message: '请输入销售数量',
                                placeholder: '销售数量',

                            },
                            amount: {
                                name: `amount${v.key}`,
                                initialValue: v.amount,
                                message: '请输入销售金额',
                                placeholder: '销售金额',

                            },
                            Operation: '删除',
                        })
                    }) : [{
                        key: '1',
                        No: '1',
                        img: {name: 'img1', message: '请上传图片', placeholder: '请上传图片', num: 3,},
                        sku: {name: 'sku1', message: '请输入规格', placeholder: '请输入规格',},
                        unit: {name: 'unit1', message: '请输入销售单价', placeholder: '请输入销售单价',},
                        num: {name: 'num1', message: '请输入销售数量', placeholder: '请输入销售数量',},
                        amount: {name: 'amount1', message: '请输入销售金额', placeholder: '请输入销售金额',},
                        Operation: '删除',
                    }]

                    this.props.tablemodelaction2({data2: newproductInfoarr, count: newproductInfoarr.length + 1,})

                    this.props.baseInfoForm({orderId: orderId})

                    const warehouseOrder = response.data.data.warehouseOrder;
                    const warehouseOrderarr = datasaddkey(warehouseOrder)
                    const newwarehouseOrder = warehouseOrderarr.length ? warehouseOrderarr.map((v, i) => {

                        return ({
                            key: ++i + '',
                            No: i + '',
                            warehouseOrderId: {
                                name: `warehouseOrderId${v.key}`,
                                initialValue: v.warehouseOrderId,
                                message: '请输入分仓订单号',
                                placeholder: '请输入分仓订单号',
                            },
                            warehouseOrderState: {
                                name: `warehouseOrderState${v.key}`,
                                initialValue: v.warehouseOrderState,
                                message: '请输入分仓订单状态',
                                placeholder: '请输入分仓订单状态',
                            },
                            deliveryState: {
                                name: `deliveryState${v.key}`,
                                initialValue: v.deliveryState,
                                message: '请输入发货状态',
                                placeholder: '请输入发货状态',

                            },
                            deliveryBay: {
                                name: `deliveryBay${v.key}`,
                                initialValue: v.deliveryBay,
                                message: '请输入发货仓',
                                placeholder: '请输入发货仓',

                            },
                            channelName: {
                                name: `channelName${v.key}`,
                                initialValue: v.channelName,
                                message: '请输入物流渠道',
                                placeholder: '请输入物流渠道',

                            },
                            skuNum: {
                                name: `skuNum${v.key}`,
                                initialValue: v.sku.map(k => `${k.skuNum}*${k.skuId}`).join(','),
                                message: '请输入SKU/数量',
                                placeholder: '请输入SKU/数量',

                            },
                            weight: {
                                name: `weight${v.key}`,
                                initialValue: v.weight,
                                message: '请输入重量',
                                placeholder: '请输入重量',

                            },
                            Operation: '删除',
                        })
                    }) : [{
                        key: '1',
                        No: '1',
                        warehouseOrderId: {name: 'warehouseOrderId1', message: '请输入分仓订单号', placeholder: '请输入分仓订单号',},
                        warehouseOrderState: {
                            name: 'warehouseOrderState1',
                            message: '请输入分仓订单状态',
                            placeholder: '请输入分仓订单状态',
                        },
                        deliveryState: {name: 'deliveryState1', message: '请输入发货状态', placeholder: '请输入发货状态',},
                        deliveryBay: {name: 'deliveryBay1', message: '请输入发货仓', placeholder: '请输入发货仓',},
                        channelName: {name: 'channelName1', message: '请输入物流渠道', placeholder: '请输入物流渠道',},
                        skuNum: {name: 'skuNum1', message: '请输入SKU/数量', placeholder: '请输入SKU/数量',},
                        weight: {name: 'weight1', message: '请输入重量', placeholder: '请输入重量',},
                    }]


                    this.props.tablemodelaction({data: newwarehouseOrder, count: newwarehouseOrder.length + 1,})


                    const orderLog = response.data.data.orderLog;
                    const neworderLog = orderLog.length ? orderLog.map((v, i) => {

                        return ({
                            key: v.id,
                            No: ++i + '',
                            attribute: v.attribute,
                            msg: v.msg,
                            userName: v.userName,
                            userId: v.userId,
                            time: timestampFromat(v.time, 2),
                        })
                    }) : []

                    this.props.tablemodelaction5({data: neworderLog, count: neworderLog.length + 1,})

                    var allcitys = {}
                    var allcitysarr = [['Harea', harea], ['Hvenue', hvenue], ['Hfloor', hfloor], ['Hdistrict', hdistrict], ['provincebase', provincebase], ['citybase', citybase], ['countybase', countybase], ['townbase', townbase]]

                    var allcitysarrlen = allcitysarr.length;
                    for (let i = 0; i < allcitysarrlen; i++) {

                        if (allcitysarr[i][1]) {
                            allcitys[allcitysarr[i][0]] = {
                                name: allcitysarr[i][0],
                                value: {key: allcitysarr[i][1], label: allcitysarr[i][1]}
                            }
                        }
                    }

                    this.props.baseInfoForm(allcitys)
                }
                this.setState({formloading: false})
            }).catch(e => {
                this.setState({formloading: false});
            })
        } else {
            this.setState({formloading: false})
        }

    }

    componentDidUpdate(nextProps, nextState) {

    }

    handleSubmit = (e) => {
        typeof e == 'object' && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const newarrobj = objToarrsort(values);
                const params = sortarrToobj(newarrobj);
                const newparams = objvaluesformat(params);
                newparams.orderId = this.props.Infos.orderId
                typeof e == 'string' && (() => newparams[e] = 'ok')()
                const data = objTodata(newparams)
                axios.post(`${config.api_url}/api/oms/order/list/detail/examine`, data)
                    .then(response => {
                        const state = response.data.state
                        if (state == 200) {
                            message.error(`${response.data.msg}`);
                        } else {
                            message.success(`${response.data.msg}`);
                            setTimeout(() => {
                                // location.href = location.href;
                            }, 1000)
                        }
                    }).catch(e => {
                    console.log(e);
                })
            }
        });
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <div className="newClue">
                <h2>订单详情</h2>
                <div className="newCluewk">
                    <Spin spinning={this.state.formloading} delay={500} tip="Loading...">
                        <Form layout="inline" onSubmit={this.handleSubmit}>

                            <OrderInfo {...this.props} />
                            <Times {...this.props} />
                            <ConsigneeAddress {...this.props} />
                            <ProductInfo {...this.props} />
                            <WarehouseOrder {...this.props} />
                            <OrderLog {...this.props} />

                            <div className="submit">
                                <Row style={{'padding': '8px 0px'}}>
                                    <FormItem>
                                        <Button style={{
                                            padding: '0px 50px',
                                            height: '40px',
                                            lineHeight: '40px',
                                            fontSize: '16px'
                                        }}
                                                type="primary"
                                                htmlType="submit"
                                                disabled={this.hasErrors(getFieldsError())}
                                        >
                                            提交
                                        </Button>

                                    </FormItem>
                                </Row>
                            </div>
                        </Form>
                    </Spin>
                </div>
            </div>
        );
    }
}


export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            const Infos = {}
            for (let i in props.Infos) {
                if (props.Infos[i].name) {
                    Infos[i] = Form.createFormField(props.Infos[i])
                }
            }
            return Infos
        },
        onFieldsChange(props, fields) {
            props.baseInfoForm(fields)

        },
    })(UserForm));

