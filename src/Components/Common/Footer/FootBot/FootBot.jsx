import react from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useFooterNavigation } from '../../../../Hooks/useFooterNavigation'
import MaxWidthContainer from '../../../UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../UI/Container/PaddingContainer/PaddingContainer'
import classes from './FootBot.module.css'

const FootBot = (props) => {
    const navigationItems = useFooterNavigation()

    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.top}>
                    {navigationItems.map(item => (
                        <div className={classes.navBlock}>
                            <h4>{item.title}</h4>
                            {item.items.map(el => (
                                <NavLink to={el.href}>{el.title}</NavLink>
                            ))}
                        </div>
                    ))}
                    <div className={classes.infoBlock}>
                        <div className={classes.navBlock}>
                            <h4>{t("navigation.contact")}</h4>
                            <a href='tel:0(800) 400-546'>0(800) 400-546</a>
                            <a href='tel:0(800) 400-546'>0(800) 400-546</a>
                            <a href='tel:0(800) 400-546'>0(800) 400-546</a>
                        </div>
                        <div className={classes.navBlock}>
                            <h4>{t("navigation.footer.workingTitle")}</h4>
                            <span>{t("navigation.footer.workDays")}&nbsp; 10.00 - 18.00</span>
                            <span>{t("navigation.footer.relDays")} &nbsp; 11.00 - 18.00</span>
                        </div>
                    </div>
                </div>
                <div className={classes.bot}>
                    <NavLink to="/rules">{t("navigation.footer.rules")}</NavLink>
                    <NavLink to="/confidentiality">{t("navigation.footer.conf")}</NavLink>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default FootBot