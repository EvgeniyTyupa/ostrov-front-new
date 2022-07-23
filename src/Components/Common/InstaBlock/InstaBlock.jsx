import React from 'react'
import classes from './InstaBlock.module.css'
import girl2 from '../../../Assets/girl2.svg'
import boy2 from '../../../Assets/boy2.svg'
import { BsInstagram } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

const InstaBlock = (props) => {
    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <img src={girl2} alt="girl" className={classes.girl}/>
            <div className={classes.info}>
                <p>{t("insta")}</p>
                <Button className={classes.button}>
                    <a href='https://www.instagram.com/ostrovokdetstva_zp_reserv/' target={"_blank"} rel="noopener noreferrer">
                        <BsInstagram/>
                        <span>{t("actions.subscribe")}</span>
                    </a>
                </Button>
            </div>
            <img src={boy2} alt="boy" className={classes.boy}/>
        </div>
    )
}

export default InstaBlock