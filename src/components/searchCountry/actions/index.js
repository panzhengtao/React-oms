import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'

export const countrysearchInfo = 'countrysearchInfo'
export const countrysearchPaginationInfo = 'countrysearchPaginationInfo'
export const serchcountryListInfo = 'serchcountryListInfo'


const serchcountryListaction = value=> ({
    type: serchcountryListInfo,
    payload: value
})

const countrysearchaction = value=> ({
    type: countrysearchInfo,
    payload: value
})


const searchcountryaction = value=> ({
    type: countrysearchPaginationInfo,
    payload: value
})


const fetchsearchcountry = ({key, value}) => (dispatch, getState) => {

    dispatch(countrysearchaction({loading: true}))
    return axios.get(`${config.api_url}/api/oms/order/country`, {params: value})
        .then(response => {
            if (response.status == 200) {
                const total = response.data.total||100
                dispatch(searchcountryaction({
                    current: value['pageSize'] || 1,
                    total: total,
                    pageSize: value['offset'] || 10
                }))
                dispatch(countrysearchaction({[key]: response.data.data, loading: false}))
            }

        }).catch(e=> {
            console.log(e);
        })
}

const actions = {
    serchcountryListaction,
    countrysearchaction,
    searchcountryaction,
    fetchsearchcountry,
}

export default actions




