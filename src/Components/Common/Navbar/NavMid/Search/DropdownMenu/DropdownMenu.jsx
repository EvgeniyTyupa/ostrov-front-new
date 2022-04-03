import React from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '../../../../../../Utils/classnames'
import classes from './DropdownMenu.module.css'
import DropdownMenuItem from './DropdownMenuItem/DropdownMenuItem'

const DropdownMenu = (props) => {
    const { items, active, currentLanguage } = props

    const { t } = useTranslation()

    return (
        <div 
            className={
                cx(
                    classes.main, 
                    active ? classes.active : undefined, 
                    items.length > 0 ? classes.filled : undefined
                )
            }
        >
            {items.length > 0 ? 
                items.map(el => <DropdownMenuItem item={el} currentLanguage={currentLanguage}/>) :
                <p className={classes.empty}>{t("catalog.empty")}...</p>
            }
        </div>
    )
}

export default DropdownMenu