import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import Preloader from '../../../Components/Common/Preloader/Preloader'
import { activateProfile } from '../../../Redux/userReducer'
import Activate from './Activate'

const ActivateContainer = (props) => {
    const { 
        activateProfile,
        isValidActivationHash,
        isReceivedHashStatus
    } = props

    const { hash } = useParams()

    useEffect(() => {
        activateProfile(hash)
    }, [])

    return (
        <>
            {!isReceivedHashStatus ? <Preloader/> :
               <>
                    {isValidActivationHash ? <Activate/> :
                        <Navigate to="/"/>
                    }
               </> 
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    isValidActivationHash: state.user.isValidActivationHash,
    isReceivedHashStatus: state.user.isReceivedHashStatus
})

export default connect(mapStateToProps, {
    activateProfile
})(ActivateContainer)