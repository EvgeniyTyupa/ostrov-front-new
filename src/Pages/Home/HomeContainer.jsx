import React from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import Home from './Home'

const HomeContainer = (props) => {
    const {
        categories,
        isFetching
    } = props

    return (
        <>
            {isFetching ? <Preloader/> 
            :
                <Home 
                    categories={categories}
                />
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    categories: state.categories.categories,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {

})(HomeContainer)