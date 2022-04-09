import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Preloader from '../../../Components/Common/Preloader/Preloader'
import { getAction, setCurrentAction } from '../../../Redux/actionsReducer'
import NotFound from '../../NotFound/NofFound'
import Action from './Action'

const ActionContainer = (props) => {
    const { 
        isFetching,
        currentAction,
        currentLanguage,
        getAction
    } = props

    const { title } = useParams()

    useEffect(() => {
        getAction(title)

        return () => {
            setCurrentAction(null)
        }
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> :
                <>
                    {!currentAction ? <NotFound/> :
                        <Action
                            action={currentAction}
                            currentLanguage={currentLanguage}
                        />
                    }
                </>
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    currentAction: state.actions.currentAction,
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {
    getAction
})(ActionContainer)