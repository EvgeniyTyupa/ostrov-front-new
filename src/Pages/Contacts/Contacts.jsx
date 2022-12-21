import React from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../Components/Common/Breadcrumbs/Breadcrumbs'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './Contacts.module.css'
import { BsInstagram } from 'react-icons/bs';
import AnimatedBlock from '../../Components/Animation/AnimatedBlock/AnimatedBlock'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

const Contacts = (props) => {
    const { siteInfo } = props

    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <Helmet 
                    htmlAttributes={{"lang": "ua", "amp": undefined}}
                    title={`${t("siteName")} | ${t("navigation.contact")}`}
                    meta={[{"name": "description", "content": t("siteDescription")}]}
                />
                <Breadcrumbs active={t("navigation.contact")}/>
                <AnimatedBlock className={classes.header}>
                    <div className={classes.phone}>
                        <h4>{t("contact.phone")}</h4>
                        <div className={classes.phoneNumbers}>
                            {siteInfo && siteInfo[0].phones.map(el => (
                                <a href={`tel:${el.replace(/[^a-zA-Z0-9 ]/g, '')}`}>{el}</a>
                            ))}
                        </div>
                        <div className={classes.email}>
                            <h4>Email</h4>
                            <a href="mailto:ostrovokdetstvazp1@gmail.com">ostrovokdetstvazp1@gmail.com</a>
                        </div>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.infoBlock}>
                            <h4>{t("contact.graphic")}</h4>
                            <div className={classes.items}>
                                <div className={classes.item}>
                                    <h5>{t("navigation.footer.workingTitle")}</h5>
                                    <div className={classes.days}>
                                        <span>{t("navigation.footer.workDays")}&nbsp; 10.00 - 18.00</span>
                                        <span>{t("navigation.footer.relDays")} &nbsp; 11.00 - 18.00</span>
                                    </div>
                                </div>
                                <div className={classes.item}>
                                    <h5>{t("contact.sending")}</h5>
                                    <div className={classes.days}>
                                        <span>{t("contact.sendingDays")}&nbsp; 10.00 - 20.00</span>
                                    </div>
                                </div>
                                <div className={classes.item}>
                                    <h5>{t("navigation.footer.delivery")}</h5>
                                    <div className={classes.days}>
                                        <span>{t("navigation.footer.workDays")}&nbsp; 10.00 - 18.00</span>
                                        <span>{t("navigation.footer.relDays")} &nbsp; 11.00 - 18.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.social}>
                            <h4>{t("contact.social")}</h4>
                            <a href='https://www.instagram.com/ostrovokdetstva_zp_reserv' target={"_blank"} rel="noopener noreferrer">
                                <BsInstagram/>
                            </a>
                        </div>
                    </div>
                </AnimatedBlock>
                <AnimatedBlock className={classes.bot}>
                    <div className={classes.address}>
                        <h4>{t("contact.addressTitle")}</h4>
                        <address>{t("contact.address")}</address>
                    </div>
                    <div className={classes.map}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11118.521786333404!2d35.06784288947411!3d47.88497249816503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dc654f5025e7ed%3A0x5e5532aa2551b444!2z0J7RgdGC0YDQvtCy0L7QuiDQlNC10YLRgdGC0LLQsA!5e0!3m2!1sru!2sua!4v1648656721637!5m2!1sru!2sua"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </AnimatedBlock>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

let mapStateToProps = (state) => ({
    siteInfo: state.common.siteInfo
})

export default connect(mapStateToProps, null)(Contacts)