import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import MaxWidthContainer from '../../../UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../UI/Container/PaddingContainer/PaddingContainer'
import classes from './NavTop.module.css'

const NavTop = () => {
    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.side}>
                    {/* <Button 
                        className={cx(classes.langBut, currentLanguage === "ru" ? classes.activeLang : undefined)} 
                        onClick={() => handleLanguage("ru")}
                    >
                        РУС
                    </Button>
                    <Button 
                        className={cx(classes.langBut, currentLanguage === "ua" ? classes.activeLang : undefined)} 
                        onClick={() => handleLanguage("ua")}
                    >
                        УКР
                    </Button> */}
                </div>
                <div className={classes.side}>
                    <NavLink to="/contacts">{t("navigation.contact")}</NavLink>
                    <NavLink to="/delivery_and_shipping">{t("navigation.delivery")}</NavLink>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default NavTop