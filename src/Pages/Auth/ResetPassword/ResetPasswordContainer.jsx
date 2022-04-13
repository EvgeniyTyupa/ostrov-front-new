import React, { useEffect } from 'react'
import Preloader from '../../../Components/Common/Preloader/Preloader'
import { Navigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { validateResetHash } from '../../../Redux/userReducer'

const ResetPasswordContainer = (props) => {
    const { 
        isReceivedResetHashStatus,
        isValidResetHash,
        validateResetHash
    } = props

    const { hash } = useParams()

    useEffect(() => {
        validateResetHash(hash)
    }, [])

    return (
        <>
            {!isReceivedResetHashStatus ? <Preloader/> :
                <>
                    {isValidResetHash ? <Navigate to="/profile/settings"/> :
                        <Navigate to="/"/>
                    }
                </>
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    isReceivedResetHashStatus: state.user.isReceivedResetHashStatus,
    isValidResetHash: state.user.isValidResetHash
})

export default connect(mapStateToProps, {
    validateResetHash
})(ResetPasswordContainer)