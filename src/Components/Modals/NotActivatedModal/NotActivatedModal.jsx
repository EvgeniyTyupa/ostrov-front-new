import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { setServerMessage } from '../../../Redux/commonReducer'
import { sendActivationMail } from '../../../Redux/userReducer'
import Modal from '../../UI/Modal/Modal'
import classes from './NotActivatedModal.module.css'

const SomeInfoModal = (props) => {
    const { 
        onClose, 
        emailToSendMail, 
        serverMessage, 
        sendActivationMail,
        setServerMessage
    } = props

    const { t } = useTranslation()

    const handleClose = () => {
        onClose()
        setServerMessage(null)
    }

    const sendMail = () => {
        sendActivationMail(emailToSendMail)
    }

    return (
        <Modal title="" onClose={handleClose}>
            {serverMessage ?
                <div className={classes.main}>
                    <p>{serverMessage}</p>
                </div>
                :
                <div className={classes.main}>
                    <p>{t("not_activated")}</p>
                    <button className={classes.activateBut} onClick={sendMail}>{t("send_activation_link")}</button>
                </div>
            }
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    emailToSendMail: state.user.emailToSendMail,
    serverMessage: state.common.serverMessage
})

export default connect(mapStateToProps, {
    sendActivationMail,
    setServerMessage
})(SomeInfoModal)