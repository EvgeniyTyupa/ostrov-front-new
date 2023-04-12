import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import classes from '../Content.module.css'

import Aos from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';

const GuaranteeTab = () => {
    const [checkedTwo, setCheckedTwo] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);
    
    const [currentTab, setCurrentTab] = useState('garant');
    const { t } = useTranslation();

    return (
        <div className={classes.body}>
            <div className={classes.tabs}>
                <span className={classes.tab + " " + (currentTab === 'garant' && classes.activeTab)} onClick={()=>{setCurrentTab('garant')}}>{t("modals.payment_guarantee.tabs.guarantee.tab1.header")}</span>
                <span className={classes.tab + " " + (currentTab === 'return' && classes.activeTab)} onClick={()=>{setCurrentTab('return')}}>{t("modals.payment_guarantee.tabs.guarantee.tab2.header")}</span>
            </div>
            {currentTab === 'garant' && 
            <>
                <p>{t("modals.payment_guarantee.tabs.guarantee.tab1.one")}</p>
                <p>{t("modals.payment_guarantee.tabs.guarantee.tab1.two")}</p>
                <p>{t("modals.payment_guarantee.tabs.guarantee.tab1.three")}</p>
                <p>{t("modals.payment_guarantee.tabs.guarantee.tab1.four")}</p>
                <ul>
                    <li>{t("modals.payment_guarantee.tabs.guarantee.tab1.five")}</li>
                    <li>{t("modals.payment_guarantee.tabs.guarantee.tab1.six")}</li>
                    <li>{t("modals.payment_guarantee.tabs.guarantee.tab1.seven")}</li>
                    <li>{t("modals.payment_guarantee.tabs.guarantee.tab1.eight")}</li>
                </ul>

                <input type="checkbox" className={classes.checkTwo} id="checkTwo" hidden onChange={()=>{setCheckedTwo(!checkedTwo)}}/>
                <label htmlFor="checkTwo">
                    <div className={classes.dropdown}>
                        <span><span className={classes.viewSymbol}>{checkedTwo ? "-" : "+"}</span>{t("modals.payment_guarantee.tabs.guarantee.tab2.header")}</span>
                    </div>
                    
                    <div className={classes.content}>
                        <p>{t("modals.payment_guarantee.tabs.guarantee.tab1.ten")}</p>
                        <p>{t("modals.payment_guarantee.tabs.guarantee.tab1.eleven")} <NavLink to="/guarantee_and_refund">{t("modals.payment_guarantee.tabs.guarantee.tab1.eleven1")}</NavLink></p>
                        <p>{t("modals.payment_guarantee.tabs.guarantee.tab1.twelve")} <NavLink to="/guarantee_and_refund">{t("modals.payment_guarantee.tabs.guarantee.tab1.eleven1")}</NavLink></p>
                        <p>{t("modals.payment_guarantee.tabs.guarantee.tab1.thirteen")}</p>
                        <ul>
                            <li>{t("modals.payment_guarantee.tabs.guarantee.tab1.fourteen")}</li>
                            <li>{t("modals.payment_guarantee.tabs.guarantee.tab1.sixteen")}</li>
                            <li>{t("modals.payment_guarantee.tabs.guarantee.tab1.seventeen")}</li>
                            <li>{t("modals.payment_guarantee.tabs.guarantee.tab1.eighteen")}</li>
                            <li>{t("modals.payment_guarantee.tabs.guarantee.tab1.nineteen")}</li>
                        </ul>
                    </div>
                </label>
            </>}
            {currentTab === 'return' && 
            <>
                <p>{t("modals.payment_guarantee.tabs.guarantee.tab2.one")} <a rel="noreferrer" href="http://zakon2.rada.gov.ua/laws/show/1023-12">{t("modals.payment_guarantee.tabs.guarantee.tab2.one1")}</a>, {t("modals.payment_guarantee.tabs.guarantee.tab2.one2")}</p>
                <p>{t("modals.payment_guarantee.tabs.guarantee.tab2.two")}</p>
                <ul>
                    <li>{t("modals.payment_guarantee.tabs.guarantee.tab2.three")}</li>
                    <li>{t("modals.payment_guarantee.tabs.guarantee.tab2.four")}</li>
                    <li>{t("modals.payment_guarantee.tabs.guarantee.tab2.five")}</li>
                    <li>{t("modals.payment_guarantee.tabs.guarantee.tab2.six")}</li>
                </ul>
                <p>{t("modals.payment_guarantee.tabs.guarantee.tab2.seven")}</p>
            </>}
        </div>
    )
}

export default GuaranteeTab