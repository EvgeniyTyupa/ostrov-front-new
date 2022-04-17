import React from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Preloader from './Preloader/Preloader'

const LoadRouter = (props) => {
    const {
        isFetching,
    } = props

    return <Outlet/>

}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {

})(LoadRouter)