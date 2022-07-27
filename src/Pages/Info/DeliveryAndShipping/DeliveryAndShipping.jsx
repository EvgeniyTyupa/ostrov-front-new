import React from 'react';
import classes from './DeliveryAndShipping.module.css';
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet"
import { connect } from 'react-redux';
import PaddingContainer from '../../../Components/UI/Container/PaddingContainer/PaddingContainer';
import MaxWidthContainer from '../../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer';
import AnimatedBlock from '../../../Components/Animation/AnimatedBlock/AnimatedBlock';
import Breadcrumbs from '../../../Components/Common/Breadcrumbs/Breadcrumbs';
import { FaShippingFast } from 'react-icons/fa'
import { Collapse } from '@mui/material';
import { useState } from 'react';
import { cx } from '../../../Utils/classnames';
import { IconButton } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai'

const DeliveryAndShipping = (props) => {
    const { siteInfo } = props

    const { t } = useTranslation();

    const [openOne, setOpenOne] = useState(false)
    const [openTwo, setOpenTwo] = useState(false)
    const [openThree, setOpenThree] = useState(false)

    return(
        <PaddingContainer>
            <MaxWidthContainer className={classes.main}>
                <Helmet 
                    htmlAttributes={{"lang": "ua", "amp": undefined}}
                    title={`${t("siteName")} | ${props.currentLanguage === "ru" ? "Оплата и доставка" : "Оплата і доставка"}`}
                    meta={[{"name": "description", "content": t("siteDescription")}]}
                />
                <AnimatedBlock className={classes.body}>
                    <Breadcrumbs active={t("navigation.delivery")}/>
                    <h1>{t("delivery.header")}</h1>
                    <div className={classes.content}>
                        <div className={classes.leftSide}>
                            <div className={classes.law}>
                                <FaShippingFast/>
                                <p>{t("delivery.1")}
                                    <a rel="noreferrer" target={"_blank"} href="https://zakon.rada.gov.ua/laws/show/1702-18#Text"> {t("delivery.2")} </a> <br/> №361-ІХ 06.12.19.
                                </p>
                            </div>
                            <div className={classes.deliveryPrice}>
                                <p>{t("delivery.3")} <strong>{t("delivery.newPost")}</strong> {t("delivery.4")} {siteInfo && siteInfo[0].office_delivery} грн. <strong>{t("delivery.4_1")}</strong></p>
                                <p>{t("delivery.5")} <strong>{t("delivery.newPost")}</strong> {t("delivery.5_2")} {siteInfo && siteInfo[0].courier_delivery} грн. <strong>{t("delivery.5_3")}</strong></p>
                            </div>
                            <div className={classes.types}>
                                <h2>{t("delivery.6")}</h2>
                                {/* SELF */}
                                <div className={cx(classes.backs, classes.label_one)}>
                                    <div className={classes.deliveryInfo}>
                                        <span>{t("delivery.7")}</span>
                                        <IconButton onClick={() => setOpenOne(!openOne)} className={openOne ? classes.active : ""}>
                                            <AiOutlinePlus/>
                                        </IconButton>
                                    </div>
                                    <Collapse in={openOne} timeout="auto" unmountOnExit>
                                        <div className={classes.type  + " " + classes.typeOne}>
                                            <div className={classes.typeContent  + " " + classes.typeContentOne}>
                                                <ol>
                                                    <li>{t("delivery.8")}</li>
                                                    <li>{t("delivery.9")}</li>
                                                </ol>
                                                <p>{t("delivery.10")}</p>
                                                <p>{t("delivery.11")}</p>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                                
                                
                                {/* COURIER */}
                                <div className={cx(classes.backs, classes.label_two)}>
                                    <div className={classes.deliveryInfo}>
                                        <div className={classes.titleContainer}>
                                            <span>{t("delivery.12")}</span>
                                            <span className={classes.time}>{t("delivery.13")}</span>
                                        </div>
                                        <IconButton onClick={() => setOpenTwo(!openTwo)} className={openTwo ? classes.active : ""}>
                                            <AiOutlinePlus/>
                                        </IconButton>
                                    </div>
                                    <Collapse in={openTwo} timeout="auto" unmountOnExit>
                                        <div className={classes.type + " " + classes.typeTwo}>
                                            <div className={classes.typeContent + " " + classes.typeContentTwo}>
                                                <span>{t("delivery.14")}</span>
                                                <ol>
                                                    <li>{t("delivery.15")}</li>
                                                    <li>{t("delivery.16")}</li>
                                                    <li>{t("delivery.17")}</li>
                                                    <li>{t("delivery.18")} <a rel="noreferrer" target={"_blank"} href="https://novaposhta.ua/ru/poluchit_po_adresu">https://novaposhta.ua/ru/poluchit_po_adresu</a></li>
                                                    <li>{t("delivery.19")}</li>
                                                </ol>
                                                <p>{t("delivery.20")}</p>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>

                                {/* POST */}
                                <div className={cx(classes.backs, classes.label_three)}>
                                    <div className={classes.deliveryInfo}>
                                        <div className={classes.titleContainer}>
                                            <span>{t("delivery.21")}</span>
                                            <span className={classes.time}>{t("delivery.22")}</span>
                                        </div>
                                        <IconButton onClick={() => setOpenThree(!openThree)} className={openThree ? classes.active : ""}>
                                            <AiOutlinePlus/>
                                        </IconButton>
                                    </div>
                                    <Collapse in={openThree} timeout="auto" unmountOnExit>
                                        <div className={classes.type + " " + classes.typeThree}>
                                            <div className={classes.typeContent + " " + classes.typeContentThree}>
                                                <span>{t("delivery.23")}</span>
                                                <ol>
                                                    <li>{t("delivery.24")}</li>
                                                    <li>{t("delivery.25")}</li>
                                                    <li>{t("delivery.26")}</li>
                                                    <li>{t("delivery.27")} <a rel="noreferrer" target={"_blank"} href="https://novaposhta.ua">«Нова пошта»</a></li>
                                                    <li>{t("delivery.28")} <a rel="noreferrer" target={"_blank"} href="https://novaposhta.ua/ru/poluchit_s_otdeleniya">https://novaposhta.ua/ru/poluchit_s_otdeleniya</a></li>
                                                    <li>{t("delivery.29")}</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                        <div className={classes.rightSide}>
                            <div className={classes.rightSideContainer}>
                                <h3>{t("delivery.30")}</h3>
                                <p>{t("delivery.31")} {siteInfo && <a href={`tel:${siteInfo[0].phones[0].replace(/[^a-zA-Z0-9 ]/g, '')}`}>{siteInfo[0].phones[0]}</a>} {t("delivery.32")}</p>
                            </div>
                        </div>
                    </div>
                </AnimatedBlock>
            </MaxWidthContainer>
        </PaddingContainer>
    );
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage,
    siteInfo: state.common.siteInfo  
})

export default connect(mapStateToProps, {})(DeliveryAndShipping);