import * as config from '../../util/connectConfig'
import axios from '../../util/axios'
import searchOptactions from '../../components/searchOpt/actions'
import searchCountryactions from '../../components/searchCountry/actions'
import searchValuesactions from '../../components/searchValues/actions'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'

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
    return axios.post(`${config.api_url}/api/oms/package/list`, {params: value})
        .then(response => {
            if (response.status == 200) {
                const total = response.data.total
                console.log(response.data)
                dispatch(Paginationmodelaction({
                    current: value['pageSize'] || 1,
                    total: total,
                    pageSize: value['offset'] || 20
                }))
                dispatch(tablemodelaction({[key]: response.data.data, loading: false}))
            }
        }).catch(e => {
            console.log(e);
        })
}

const actions = {
    ...searchOptactions,
    ...searchCountryactions,
    ...searchValuesactions,
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    Paginationmodelaction,
    fetchPosts2,
    fetchcitysPosts,
    fetchPosts,
}

export default actions




