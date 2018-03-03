import * as config from '../../util/connectConfig'
import axios from '../../util/axios'
import searchOptactions from '../../components/searchOpt/actions'
import {getLoginInfo} from "../../util/baseTool";
import {api_url} from "../../util/connectConfig";


export const menudataInfo = 'menudataInfo'


export const menudataaction = value => ({
    type: menudataInfo,
    payload: value
})



export const getMenuData = () => (dispatch, getState) => {
    return axios('http://localhost:3333/api/menudata')
        .then(response => {
            if (response.status == 200) {
                console.log(response)
                dispatch(menudataaction({data:response.data.data}))
            }
        }).catch(e => {
            console.log(e);
        })
}


const actions = {
    getMenuData,
}

export default actions




