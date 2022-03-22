import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getActions } from '../../Redux/actionsReducer'
import Home from './Home'

const HomeContainer = (props) => {
    const {
        categories,
        isFetching,
        getActions,
        actions
    } = props

    console.log(actions)

    useEffect(() => {
        getActions(1, 1, "", "", "", false)
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> 
            :
                <Home 
                    categories={categories}
                    actions={actions}
                />
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    categories: state.categories.categories,
    isFetching: state.common.isFetching,
    actions: state.actions.actions
})

export default connect(mapStateToProps, {
    getActions
})(HomeContainer)