import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getActions } from '../../Redux/actionsReducer'
import Actions from './Actions'

const ActionsContainer = (props) => {
    const {
        isFetching,
        actions,
        getActions,
        currentLanguage
    } = props

    useEffect(() => {
        getActions(1, 25, "", "", "", true)
    }, [])

    return (
        <>
            {isFetching && <Preloader/>}
                <Actions
                    actions={actions}
                    currentLanguage={currentLanguage}
                />
            
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    actions: state.actions.actions,
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {
    getActions
})(ActionsContainer)