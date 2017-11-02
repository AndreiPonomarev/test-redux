import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import configureStore from 'redux-mock-store'

import App from './App'
import Selector from './components/Selector'
import * as actions from './actions'

configure({ adapter: new Adapter() })

describe('<App />', () => {

    it('is available', () => {
        expect(App).toBeDefined()
    })


    const state = {
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
    let store, wrapper

    const mockStore = configureStore()


    beforeEach(() => {
        store = mockStore(state)
        wrapper = shallow(
            <App store={store} />
        )
    })

    it('Initial state is correct', () => {
        expect(wrapper.length).toEqual(1)
    })

    it('check Prop matches with initialState', () => {
        expect(wrapper.prop('vehicleList')).toEqual(state.vehicleList)
    })


})
