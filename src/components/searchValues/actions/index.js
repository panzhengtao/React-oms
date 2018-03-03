import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'

export const searchValuesInfo = 'searchValuesInfo'
export const searchValuesPaginationInfo = 'searchValuesPaginationInfo'
export const serchVluesListInfo = 'serchVluesListInfo'


const serchVluesListaction = value=> ({
    type: serchVluesListInfo,
    payload: value
})

const searchVluesaction = value=> ({
    type: searchValuesInfo,
    payload: value
})


const searchValuesPaginationaction = value=> ({
    type: searchValuesPaginationInfo,
    payload: value
})


const fetchsearchValues = ({url,key='data',value=''}) => (dispatch, getState) => {

    dispatch(searchVluesaction({loading: true}))
    return axios.post(`${config.api_url}${url}`, value)
        .then(response => {
            if (response.status == 200) {
                const total = response.data.total||100
                dispatch(searchValuesPaginationaction({
                    current: value['pageSize'] || 1,
                    total: total,
                    pageSize: value['offset'] || 10
                }))
                dispatch(searchVluesaction({[key]: response.data.data, loading: false}))
            }
        }).catch(e=> {
            console.log(e);
        })
}

const actions = {
    serchVluesListaction,
    searchVluesaction,
    searchValuesPaginationaction,
    fetchsearchValues,
}

export default actions




