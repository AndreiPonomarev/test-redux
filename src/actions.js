import _ from 'lodash'
import * as types from './action-types'

var trafficMeister = require('./service')


export function getVehicleList () {
    return async (dispatch, getState) => {
        const filters = _.pickBy(getState().filters, (filter) => filter!=='')

        trafficMeister.fetchData((err, data) => {
            let vehicleList = data

            if (filters.type) {
                vehicleList =  _.filter(vehicleList, { type: filters.type } )
            }
            if (filters.brand) {
                vehicleList =  _.filter(vehicleList, { brand: filters.brand } )
            }

            if (filters.colors) {
                vehicleList =  _.filter(vehicleList, (vehicle) => _.includes(vehicle.colors, filters.colors) )
            }

            return dispatch({
                type: types.GET_VEHICLES,
                payload: { vehicleList }
            })
        })
    }
}

export function setFilter (type, value) {
    return (dispatch, getState) => {
        Promise.resolve()
           .then(() => dispatch({ type: types.SET_FILTERS, payload: { type, value } }) )
           .then(() => dispatch(getVehicleList()))
    }
}

export function clearFilter () {
    return (dispatch, getState) => {
        Promise.resolve()
           .then(() => dispatch({ type: types.CLEAR_FILTERS, payload: { } }) )
           .then(() => dispatch(getVehicleList()))
    }
}
