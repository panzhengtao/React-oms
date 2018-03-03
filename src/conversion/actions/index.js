import * as config from '../../util/connectConfig'
import axios from '../../util/axios'
import searchOptactions from '../../components/searchOpt/actions'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
import {objTodata} from '../../util/baseTool'

export const baseInfoForm = value => ({
    type: baseInfo,
    payload: value
})


export const modalmodelaction = value => ({
    type: modalmodelInfo,
    payload: value
})

export const tablemodelaction = value => ({
    type: tablemodelInfo,
    payload: value
})

export const Paginationmodelaction = value => ({
    type: PaginationmodelInfo,
    payload: value
})


export const fetchPosts2 = value => (dispatch, getState) => {

    return axios(`http://localhost:3333/testApi/bd`)
        .then(response => {
            if (response.status == 200) {
                dispatch(tablemodelaction({[value]: response.data.data,}))
            }
        }).catch(e => {
            console.log(e);
        })
}

export const fetchcitysPosts = ({name, value, returnName}) => (dispatch, getState) => {
    return axios(`http://localhost:3333/testApi/citys?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        }).catch(e => {
            console.log(e);
        })
}


export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    const current=value['pageSize'] || 1;
    const pageSize=value['offset'] ||20;
   // const params = objTodata(value)
    return axios.post(`${config.api_url}/api/grab/package/conversion/configList`, value)
        .then(response => {
            if (response.status == 200) {
                const total = response.data.total
                dispatch(Paginationmodelaction({
                    current: current,
                    total: total,
                    pageSize: pageSize
                }))
                dispatch(tablemodelaction({[key]: response.data.data, loading: false}))
            }
        }).catch(e => {
            console.log(e);
        })
}



const actions = {
    ...searchOptactions,
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    fetchPosts2,
    fetchcitysPosts,
    fetchPosts,
}

export default actions




