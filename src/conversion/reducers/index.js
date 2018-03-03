import {combineReducers} from 'redux'
import commonReducer from '../../common/reducers/commonreducer';
import searchOptReducers from '../../components/searchOpt/reducers'
import {
    baseInfo, modalmodelInfo, tablemodelInfo,PaginationmodelInfo,
} from '../actions'

function Infos(state = {}, action) {
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
                        visible: false,
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
                        data: [],
                        count: 0,
                        selectedRowKeys:[],
                        loading:true,
                    }
    , action) {
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

function Paginationmodel(state = {
                             pageNumber: 1,
                             total:0,
                             pageData:10,
                         }
    , action) {
    switch (action.type) {
        case PaginationmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    ...commonReducer,...searchOptReducers,Infos, modalmodel, tablemodel,Paginationmodel,
})

export default rootReducer
