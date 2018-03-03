import {
    countrysearchInfo,countrysearchPaginationInfo,serchcountryListInfo
} from '../actions'

function serchcountryList(state = {}, action) {
    switch (action.type) {
        case serchcountryListInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function searchcountryPaginationInfo(state = {
                             current: 1,
                             total:0,
                             pageSize:10,
                         }
    , action) {
    switch (action.type) {
        case countrysearchPaginationInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function countrysearch(state = {
                        title: "选择国家", ModalContent: '内容',
                        visible: false,type:'single',
                    }
    , action) {
    switch (action.type) {
        case countrysearchInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = {
    countrysearch,searchcountryPaginationInfo,serchcountryList
}

export default rootReducer
