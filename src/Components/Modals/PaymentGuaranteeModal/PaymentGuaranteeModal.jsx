import { IconButton, Tab, Tabs } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineClose } from 'react-icons/ai'
import { connect } from 'react-redux'
import OverflowLayout from '../../UI/OverflowLayout/OverflowLayout'
import GuaranteeTab from './Guarantee/GuaranteeTab'
import PayTab from './Pay/PayTab'
import classes from './PaymentGuaranteeModal.module.css'

const useTabStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTab-textColorPrimary': {
            color: "white",
            textTransform: "initial",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "Montserrat",
            textTransform: "uppercase",
            transitionDuration: ".3s",
            color: "rgba(75, 94, 163, .5)"
        },
        '& .MuiTab-textColorPrimary:last-child': {
            borderTopRightRadius: "16px",
        },
        '& .Mui-selected': {
            opacity: 1,
            color: "#4B5EA3 !important",
        },
        '& .MuiTabs-indicator': {
            backgroundColor: "#E86589",
            height: "2px"
        }
    }
}));

const PaymentGuaranteeModal = (props) => {
    const { onClose, modalValue } = props

    const { t } = useTranslation()

    const material = useTabStyles()

    const [currentTab, setCurrentTab] = useState(modalValue)

    const handleTab = (e, value) => {
        setCurrentTab(value)
    }

    return (
        <OverflowLayout>
            <div className={classes.window}>
                <div className={classes.header}>
                    <Tabs 
                        value={currentTab} 
                        onChange={handleTab}
                        classes={material}
                    >
                        <Tab label={t("modals.payment_guarantee.tabs.payment.title")}/>
                        <Tab label={t("modals.payment_guarantee.tabs.guarantee.title")}/>
                    </Tabs>
                    <IconButton onClick={onClose}>
                        <AiOutlineClose/>
                    </IconButton>
                </div>
                <div className={classes.content}>
                    {currentTab === 0 && <PayTab/>}
                    {currentTab === 1 && <GuaranteeTab/>}
                </div>
            </div>
        </OverflowLayout>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, null)(PaymentGuaranteeModal)