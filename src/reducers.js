import * as types from './action-types'
import _ from 'lodash'

const initialState = {
    filters: {
        type: '',
        brand: '',
        colors: ''
    },
    options: {
        type: [],
        brand: [],
        colors: []
    },
    vehicleList: []
}

export default function reducers(state = initialState, action) {

    switch (action.type) {

        case types.GET_VEHICLES:
            const type = _.transform(action.payload.vehicleList, (options, vehicle) => {
                !_.includes(options, vehicle.type) && options.push(vehicle.type)
            })
            const brand = _.transform(action.payload.vehicleList, (options, vehicle) => {
                options.push(vehicle.brand)
            })
            const colors =  _.transform(action.payload.vehicleList, (options, vehicle) => {
                {_.map(vehicle.colors, color =>
                    !_.includes(options, color) && options.push(color)
                )}
            })
            return {
                ...state,
                vehicleList: action.payload.vehicleList,
                options: { type, brand, colors }
            }

        case types.SET_FILTERS:
            const filters = state.filters
            filters[action.payload.type] = action.payload.value
            return { ...state, filters }

        case types.CLEAR_FILTERS:
            console.log('!!initialState', initialState);
            return {
                ...state,
                filters: {
                    type: '',
                    brand: '',
                    colors: ''
                }
            }

        default:
        return state;
    }

}
