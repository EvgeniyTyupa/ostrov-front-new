import React from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import Catalog from './Catalog'

const CatalogContainer = (props) => {
    const { 
        isFetching
    } = props

    return (
        <>
            {isFetching ? <Preloader/> :
                <Catalog/>
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {

})(CatalogContainer)