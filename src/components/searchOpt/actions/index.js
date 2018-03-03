import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'

export const platformsearchInfo = 'platformsearchInfo'
export const platformsearchPaginationInfo = 'platformsearchPaginationInfo'
export const serchplatformListInfo = 'serchplatformListInfo'


const serchplatformListaction = value=> ({
    type: serchplatformListInfo,
    payload: value
})

const platformsearchaction = value=> ({
    type: platformsearchInfo,
    payload: value
})


const searchplatformaction = value=> ({
    type: platformsearchPaginationInfo,
    payload: value
})


const fetchsearchplatform = ({key, value}) => (dispatch, getState) => {

    dispatch(platformsearchaction({loading: true}))
    return axios.get(`${config.api_url}/api/oms/order/platform`, {params: value})
        .then(response => {
            if (response.status == 200) {
                const total = response.data.total||100
                dispatch(searchplatformaction({
                    current: value['pageSize'] || 1,
                    total: total,
                    pageSize: value['offset'] || 10
                }))
                dispatch(platformsearchaction({[key]: response.data.data, loading: false}))
            }
        }).catch(e=> {
            console.log(e);
        })
}

const actions = {
    searchplatformaction,
    serchplatformListaction,
    platformsearchaction,
    fetchsearchplatform,
}

export default actions




