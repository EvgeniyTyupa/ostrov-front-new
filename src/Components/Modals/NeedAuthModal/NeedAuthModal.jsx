import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { setIsOpenLogin } from '../../../Redux/commonReducer'
import Modal from '../../UI/Modal/Modal'
import classes from './NeedAuthModal.module.css'

const NeedAuthModal = (props) => {
    const { onClose, setIsOpenLogin } = props

    const { t } = useTranslation()

    const onClick = () => {
        setIsOpenLogin(true)
        onClose()
    }

    return (
        <Modal title="" onClose={onClose}>
            <div className={classes.main}>
                <p>{t("modals.auth.needAuth")}</p>
                <button onClick={onClick}>{t("modals.auth.action")}.</button>
            </div>
        </Modal>
    )
}

export default connect(null, {
    setIsOpenLogin
})(NeedAuthModal)