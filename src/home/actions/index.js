import * as config  from '../../util/connectConfig'
import axios from '../../util/axios'

export const baseInfo = 'baseInfo'
export const tablemodelInfo = 'tablemodelInfo'
export const modalmodelInfo = 'modalmodelInfo'
export const PaginationmodelInfo = 'PaginationmodelInfo'
export const platformsearchInfo = 'platformsearchInfo'
export const platformsearchPaginationInfo = 'platformsearchPaginationInfo'
export const serchplatformListInfo = 'serchplatformListInfo'



export const baseInfoForm = value=> ({
    type: baseInfo,
    payload: value
})

export const serchplatformListaction = value=> ({
    type: serchplatformListInfo,
    payload: value
})


export const platformsearchaction = value=> ({
    type: platformsearchInfo,
    payload: value
})

export const modalmodelaction = value=> ({
    type: modalmodelInfo,
    payload: value
})

export const tablemodelaction = value=> ({
    type: tablemodelInfo,
    payload: value
})

export const Paginationmodelaction = value=> ({
    type: PaginationmodelInfo,
    payload: value
})

export const searchplatformaction = value=> ({
    type: platformsearchPaginationInfo,
    payload: value
})


export const fetchPosts2 = value => (dispatch, getState) => {

    return axios(`http://localhost:3333/testApi/bd`)
        .then(response => {
            if (response.status == 200) {
                dispatch(tablemodelaction({[value]: response.data.data,}))
            }
        }).catch(e=> {
            console.log(e);
        })
}

export const fetchcitysPosts = ({name, value, returnName}) => (dispatch, getState) => {
    return axios(`http://localhost:3333/testApi/citys?${name}=${value}`)
        .then(response => {
            if (response.status == 200) {
                dispatch(baseInfoForm({[returnName]: response.data.data,}))
            }
        }).catch(e=> {
            console.log(e);
        })
}


export const fetchPosts = ({key, value}) => (dispatch, getState) => {
    dispatch(tablemodelaction({loading: true}))
    return axios.get(`${config.api_url}/api/oms/order/list`, {params: value})
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
        }).catch(e=> {
            console.log(e);
        })
}

export const fetchsearchplatform = ({key, value}) => (dispatch, getState) => {
    console.log(123)
    dispatch(platformsearchaction({loading: true}))
    return axios.get(`${config.api_url}/api/oms/order/platform`, {params: value})
        .then(response => {
            if (response.status == 200) {
                const total = response.data.total||100
                dispatch(searchplatformaction({
                    current: value['pageSize'] || 1,
                    total: total,
                    pageSize: value['offset'] || 20
                }))
                dispatch(platformsearchaction({[key]: response.data.data, loading: false}))
            }
        }).catch(e=> {
            console.log(e);
        })
}

const actions = {
    baseInfoForm,
    modalmodelaction,
    tablemodelaction,
    platformsearchaction,
    Paginationmodelaction,
    fetchPosts2,
    fetchsearchplatform,
    fetchcitysPosts,
    fetchPosts,
}

export default actions




