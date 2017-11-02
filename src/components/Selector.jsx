import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import * as actions from '../actions'


const Selector = (props) => {
    const { filterType, options, filterValue } = props

    const handleChange = () => {
        if (this[filterType]) {
            props.actions.setFilter(this[filterType].id, this[filterType].value)
        }
    }

    const handleClear = () => {
        if (this[filterType]) {
            props.actions.setFilter(this[filterType].id, '')
        }
    }

    return (
        <FormGroup controlId={filterType}>
            <Row>
                <Col sm={3}>
                    <ControlLabel>{filterType}</ControlLabel>
                </Col>
                <Col sm={9}>
                    <InputGroup>
                        <FormControl
                            componentClass="select"
                            onChange={handleChange}
                            inputRef={ el => this[filterType]=el }
                            value={filterValue}
                            >
                                <option value=''></option>
                                {_.map(options, (option) =>
                                    <option key={option} value={option} >{option}</option>
                                )}
                            </FormControl>
                            <InputGroup.Addon onClick={handleClear}>
                                <Glyphicon glyph="remove-circle" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </Row>
            </FormGroup>
        )
    }

const mapStateToProps = (state, props) => {
    return {
        options: _.get(state.options, props.filterType),
        filterValue: _.get(state.filters, props.filterType)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector)
