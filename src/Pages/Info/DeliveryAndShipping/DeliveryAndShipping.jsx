import React from 'react';
import classes from './DeliveryAndShipping.module.css';
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet"
import { connect } from 'react-redux';
import PaddingContainer from '../../../Components/UI/Container/PaddingContainer/PaddingContainer';
import MaxWidthContainer from '../../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer';
import AnimatedBlock from '../../../Components/Animation/AnimatedBlock/AnimatedBlock';
import Breadcrumbs from '../../../Components/Common/Breadcrumbs/Breadcrumbs';

const DeliveryAndShipping = (props) => {
    const { t } = useTranslation();
    return(
        <PaddingContainer>
            <MaxWidthContainer className={classes.main}>
                <Helmet 
                    htmlAttributes={{"lang": "en", "amp": undefined}}
                    title={`${t("siteName")} | ${props.currentLanguage === "ru" ? "Оплата и доставка" : "Оплата і доставка"}`}
                    meta={[{"name": "description", "content": "Онлайн магазин дитячих іграшок"}]}
                />
                <AnimatedBlock className={classes.body}>
                    <Breadcrumbs active={t("navigation.delivery")}/>
                    <h1>{t("delivery.header")}</h1>
                    <div className={classes.content}>
                        <div className={classes.leftSide}>
                            <div className={classes.law}>
                                <i class="fas fa-truck"></i>
                                <p>{t("delivery.1")}
                                    <a rel="noreferrer" target={"_blank"} href="https://zakon.rada.gov.ua/laws/show/1702-18#Text"> {t("delivery.2")} </a> <br/> №361-ІХ 06.12.19.
                                </p>
                            </div>
                            <div className={classes.deliveryPrice}>
                                <p>{t("delivery.3")} <strong>{t("delivery.newPost")}</strong> {t("delivery.3_1")}</p>
                                <p>{t("delivery.3")} <strong>{t("delivery.newPost")}</strong> {t("delivery.4")}</p>
                                <p>{t("delivery.5")} <strong>{t("delivery.newPost")}</strong> {t("delivery.5_1")}</p>
                                <p>{t("delivery.5")} <strong>{t("delivery.newPost")}</strong> {t("delivery.5_2")}</p>
                            </div>
                            <div className={classes.types}>
                                <h2>{t("delivery.6")}</h2>
                                {/* SELF */}
                                <input type="checkbox" hidden id="type_one" className={classes.inputOne}/>
                                <label htmlFor="type_one" className={classes.label_one}>
                                    <div className={classes.deliveryInfo}>
                                        <span>{t("delivery.7")}</span>
                                    </div>
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
                                </label>
                                
                                {/* COURIER */}
                                <input type="checkbox" hidden id="type_two" className={classes.inputTwo}/>
                                <label htmlFor="type_two" className={classes.label_two}>
                                    <div className={classes.deliveryInfo}>
                                        <span>{t("delivery.12")}</span>
                                        <span className={classes.time}>{t("delivery.13")}</span>
                                    </div>
                                    
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
                                </label>

                                {/* POST */}
                                <input type="checkbox" hidden id="type_three" className={classes.inputThree}/>
                                <label htmlFor="type_three" className={classes.label_three}>
                                    <div className={classes.deliveryInfo}>
                                        <span>{t("delivery.21")}</span>
                                        <span className={classes.time}>{t("delivery.22")}</span>
                                    </div>
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
                                </label>
                            </div>
                        </div>
                        <div className={classes.rightSide}>
                            <div className={classes.rightSideContainer}>
                                <h3>{t("delivery.30")}</h3>
                                <p>{t("delivery.31")} <a href="tel:+380509790088">0 (50) 979 00 88</a> {t("delivery.32")}</p>
                            </div>
                        </div>
                    </div>
                </AnimatedBlock>
            </MaxWidthContainer>
        </PaddingContainer>
    );
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {})(DeliveryAndShipping);