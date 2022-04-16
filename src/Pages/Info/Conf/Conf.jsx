import React from 'react';
import classes from './Conf.module.css';
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet"
import { connect } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import PaddingContainer from '../../../Components/UI/Container/PaddingContainer/PaddingContainer';
import MaxWidthContainer from '../../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer';

const Conf = (props) => {
    const { t } = useTranslation()

    return(
        <PaddingContainer>
            <MaxWidthContainer className={classes.main}>
                <Helmet 
                    htmlAttributes={{"lang": "en", "amp": undefined}}
                    title={`${t("siteName")} | ${props.currentLanguage === "ru" ? "Политика конфиденциальности" : "Політика конфіденційності"}`}
                    meta={[{"name": "description", "content": "Онлайн магазин дитячих іграшок"}]}
                />
                <Breadcrumbs active={t("navigation.footer.conf")}/>
                <div className={classes.body}>
                    <h1>{t("conf.header1")} <br/>{t("conf.header2")}</h1>
                    <div className={classes.content}>
                        <div className={classes.leftSide}>
                        <div className={classes.law}>
                            <p>{t("conf.1")}</p>
                        </div>
                        </div>
                        <div className={classes.rightSide}>
                            <p>{t("conf.2")}</p>
                        </div>
                    </div>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    );
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
});

export default connect(mapStateToProps, {})(Conf);