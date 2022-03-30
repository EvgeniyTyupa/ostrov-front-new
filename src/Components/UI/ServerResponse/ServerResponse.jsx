import React, { useEffect } from 'react'
import classes from './ServerResponse.module.css'
import { IconButton } from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai';
import { connect } from 'react-redux';
import { setServerError, setServerResponse } from '../../../Redux/commonReducer';
import { cx } from '../../../Utils/classnames';

import Aos from 'aos'
import 'aos/dist/aos.css'

const ServerResponse = (props) => {
    const {
        setServerError,
        setServerResponse,
        serverError,
        serverResponse
    } = props

    const handleServerError = () => {
        setServerError(null)
    }
    const handleServerResponse = () => {
        setServerResponse(null)
    }

    const onClose = () => {
        handleServerError()
        handleServerResponse()
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000);
        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])


    return (
        <div 
            className={cx(
                classes.main, 
                serverError ? classes.error : "", 
                serverResponse ? classes.good : ""
            )}
        >
            <div className={classes.head}>
                <IconButton onClick={onClose}>
                    <AiOutlineClose/>
                </IconButton>
            </div>
            <div className={classes.body}>
                {serverResponse && <p>{serverResponse}</p>}
                {serverError && <p>{serverError}</p>}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError
})

export default connect(mapStateToProps, {
    setServerError,
    setServerResponse
})(ServerResponse)