import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useFooterNavigation } from '../../../../Hooks/useFooterNavigation'
import MaxWidthContainer from '../../../UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../UI/Container/PaddingContainer/PaddingContainer'
import classes from './FootBot.module.css'

import visa from '../../../../Assets/visa.png'
import mastercard from '../../../../Assets/mastercard.svg'
import monopay from "../../../../Assets/monopay.png"
import applepay from "../../../../Assets/applepay.png"
import gpay from "../../../../Assets/gpay.png"

const FootBot = (props) => {
    const { siteInfo } = props

    const navigationItems = useFooterNavigation()

    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.top}>
                    {navigationItems.map(item => (
                        <div className={classes.navBlock} key={item.title}>
                            <h4>{item.title}</h4>
                            {item.items.map(el => (
                                <NavLink to={el.href} key={el.title}>{el.title}</NavLink>
                            ))}
                        </div>
                    ))}
                    <div className={classes.infoBlock}>
                        <div className={classes.navBlock}>
                            <h4>{t("navigation.contact")}</h4>
                            {siteInfo && siteInfo[0].phones.map(el => (
                                <a href={`tel:${el.replace(/[^a-zA-Z0-9 ]/g, '')}`} key={el}>{el}</a>
                            ))}
                        </div>
                        <div className={classes.navBlock}>
                            <h4>{t("navigation.footer.workingTitle")}</h4>
                            <span>{t("navigation.footer.workDays")}&nbsp; 10.00 - 18.00</span>
                            <span>{t("navigation.footer.relDays")} &nbsp; 11.00 - 18.00</span>
                        </div>
                    </div>
                </div>
                <div className={classes.bot}>
                    <div className={classes.botLinks}>
                        <NavLink to="/rules">{t("navigation.footer.rules")}</NavLink>
                        <NavLink to="/confidentiality">{t("navigation.footer.conf")}</NavLink>
                    </div>
                    <div className={classes.logos}>
                        <img src={monopay} alt="monopay"/>
                        <img src={applepay} alt="applepay"/>
                        <img src={gpay} alt="gpay"/>
                        <img src={visa} alt="visa"/>
                        <img src={mastercard} alt="mastercard"/>
                    </div>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

let mapStateToProps = (state) => ({
    siteInfo: state.common.siteInfo
})

export default connect(mapStateToProps, null)(FootBot)