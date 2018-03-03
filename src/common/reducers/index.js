import {combineReducers} from 'redux'
import commonReducer from '../../common/reducers/commonreducer';
import searchOptReducers from '../../components/searchOpt/reducers'
import {
    menudataInfo,
} from '../actions'

function Infos(state = {data:{topmenudata:[],leftmenudata:[]}}, action) {
    switch (action.type) {
        case menudataInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    ...commonReducer,Infos,
})

export default rootReducer
