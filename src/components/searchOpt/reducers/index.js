import {
    platformsearchInfo,platformsearchPaginationInfo,serchplatformListInfo
} from '../actions'

function serchplatformList(state = {}, action) {
    switch (action.type) {
        case serchplatformListInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function searchplatformPaginationInfo(state = {
                             current: 1,
                             total:0,
                             pageSize:10,
                         }
    , action) {
    switch (action.type) {
        case platformsearchPaginationInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function platformsearch(state = {
                        title: "选择销售平台", ModalContent: '内容',
                        visible: false,type:'multiple',
                    }
    , action) {
    switch (action.type) {
        case platformsearchInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = {
    platformsearch,searchplatformPaginationInfo,serchplatformList
}

export default rootReducer
