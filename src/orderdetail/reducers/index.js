import {combineReducers} from 'redux'
import commonReducer from '../../common/reducers/commonreducer'
import {
    baseInfo,
    modalmodelInfo,
    tablemodelInfo,
    tablemodelInfo2,
    tablemodelInfo3,
    tablemodelInfo4,
    tablemodelInfo5,
} from '../actions'

function Infos(state = {orOut: {name: 'orOut', value: '2'}}, action) {
    switch (action.type) {
        case baseInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function modalmodel(state = {
    title: "提示", ModalText: '内容',
    visible: false, previewVisible: false, visible2: false, jsbuttionVisible: false, submitVisible: false,
}
    , action) {
    switch (action.type) {
        case modalmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function tablemodel(state = {
    data: [{
        key: '1',
        No: '1',
        warehouseOrderId: {name: 'warehouseOrderId1', message: '请输入分仓订单号', placeholder: '请输入分仓订单号', },
        warehouseOrderState: {name: 'warehouseOrderState1', message: '请输入分仓订单状态', placeholder: '请输入分仓订单状态',},
        deliveryState: {name: 'deliveryState1', message: '请输入发货状态', placeholder: '请输入发货状态',},
        deliveryBay: {name: 'deliveryBay1', message: '请输入发货仓', placeholder: '请输入发货仓',},
        channelName: {name: 'channelName1', message: '请输入物流渠道', placeholder: '请输入物流渠道',},
        skuNum: {name: 'skuNum1', message: 'SKU/数量', placeholder: 'SKU/数量',},
        weight: {name: 'weight1', message: '请输入重量', placeholder: '请输入重量', required: false, }
    }],
    count: 2,
}, action) {

    switch (action.type) {
        case tablemodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function tablemodel2(state = {
    data2: [{
        key: '1',
        No: '1',
        img: {name: 'img1', message: '请上传缩略图', placeholder: '缩略图',},
        sku: {name: 'sku1', message: '请输入规格', placeholder: '请输入规格',},
        unit: {name: 'unit1', message: '请输入销售单价', placeholder: '请输入销售单价',},
        num: {name: 'num1', message: '请输入销售数量', placeholder: '请输入销售数量',},
        amount: {name: 'amount1', message: '请输入销售金额', placeholder: '请输入销售金额',},
        Operation: '删除',
    }],
    count: 2,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo2:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function tablemodel3(state = {
    data3: [],
    count: 0,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo3:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function tablemodel4(state = {
    data4: [],
    count: 0,
}
    , action) {
    switch (action.type) {
        case tablemodelInfo4:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function tablemodel5(state = {
                         data: [],
                         count: 0,
                     }
    , action) {
    switch (action.type) {
        case tablemodelInfo5:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    ...commonReducer, Infos, modalmodel, tablemodel, tablemodel2, tablemodel3, tablemodel4,tablemodel5
})

export default rootReducer
