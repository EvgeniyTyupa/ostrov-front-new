import React from 'react'
import { useTranslation } from 'react-i18next'
import classes from './Baige.module.css'

const Baige = (props) => {
    const { type = 
        "new"
    } = props

    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <label>
                {type === "new" ? "NEW" : t("items.baige")}
            </label>
        </div>
    )
}

export default Baige