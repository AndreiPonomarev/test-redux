import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Panel, Form, Button } from 'react-bootstrap'
import _ from 'lodash'
import './App.css'
import Selector from './components/Selector'

import * as actions from './actions'

class App extends Component {
    componentWillMount () {
        this.props.actions.getVehicleList()
    }


    render() {
        const { filters, vehicleList } = this.props

        const handleClear = () => {
            this.props.actions.clearFilter()
        }

        return (
            <div className="App">
                <header className="appHeader">
                    <img src='' className="appLogo" alt="logo" />
                    <h1 className="appTitle">Traffic Meister</h1>
                </header>
                <Row>
                    <Col sm={4}>
                        <Panel className="inputsWrap">
                            <Form>
                                {_.map(Object.keys(filters), ((filter) =>
                                    <Selector key={filter} filterType={filter} />
                                ))}
                            </Form>

                            <Button onClick={handleClear}>Clear</Button>
                        </Panel>
                    </Col>
                    <Col sm={8} >
                        <Panel className="listWrap">
                            <ul className="vehicleList">
                                {_.map(vehicleList, ( (vehicle, index) =>

                                    <li key={vehicle.id} className="listItem">
                                        <Row>
                                            <Col sm={1}>{++index}</Col>
                                            <Col sm={3}>{vehicle.type}</Col>
                                            <Col sm={3}>{vehicle.brand}</Col>
                                            <Col sm={3}>
                                                {_.map(vehicle.colors, (color) =>
                                                    <div key={vehicle.id+color} className="colorBox" style={{backgroundColor: color}}></div>
                                                )}
                                            </Col>
                                        </Row>
                                    </li>
                                ))}
                            </ul>
                        </Panel>
                    </Col>
                </Row>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        filters: state.filters,
        vehicleList: state.vehicleList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
