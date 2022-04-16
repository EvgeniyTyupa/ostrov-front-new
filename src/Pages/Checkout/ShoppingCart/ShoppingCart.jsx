import { Button, Tab, Tabs } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../Components/Common/Breadcrumbs/Breadcrumbs'
import CartTable from '../../../Components/Common/ShoppingCart/CartTable/CartTable'
import MaxWidthContainer from '../../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../Components/UI/Container/PaddingContainer/PaddingContainer'
import { cx } from '../../../Utils/classnames'
import { priceParser } from '../../../Utils/priceParser'
import classes from './ShoppingCart.module.css'

const useTabStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTabs-flexContainer': {
            // borderBottom: "1px solid rgba(75, 94, 163, .4)",
            "@media screen and (max-width: 468px)": {
                gap: 0
            }
        },
        '& .MuiTab-textColorPrimary': {
            color: "white",
            textTransform: "initial",
            fontSize: "16px",
            fontWeight: "600",
            fontFamily: "Montserrat",
            backgroundColor: "rgba(75, 94, 163, .7)",
            transitionDuration: ".3s"
        },
        '& .MuiTab-textColorPrimary:last-child': {
            borderTopRightRadius: "16px",
        },
        '& .Mui-selected': {
            opacity: 1,
            color: "white !important",
            backgroundColor: "#4B5EA3 !important",
        },
        '& .MuiTabs-indicator': {
            backgroundColor: "#E86589",
            height: "2px"
        }
    }
}));

const ShoppingCart = (props) => {
    const {
        currentTabIndex,
        handleTab,
        totalCount,
        totalSum,
        cartItems,
        deliveryPrice,
        setCurrentItem,
        viewedItems
    } = props

    const { t } = useTranslation()

    const materialTab = useTabStyles()

    const navigate = useNavigate()

    const cartRows = [
        "", 
        t("shopping_cart.table.item"),
        t("shopping_cart.table.price"),
        t("shopping_cart.table.count"),
        t("shopping_cart.table.sum"),
    ]

    const viewedRows = [
        "", 
        t("shopping_cart.table.item"),
        t("shopping_cart.table.price"),
        ""
    ]

    const goToCheckout = () => {
        navigate('/checkout')
    }

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.left}>
                    <Breadcrumbs active={t("shopping_cart.cart")}/> 
                    <Tabs 
                        classes={materialTab} 
                        value={currentTabIndex}
                        onChange={handleTab}
                    >
                        <Tab label={`${t("shopping_cart.cart")} (${totalCount})`}/>
                        <Tab label={`${t("shopping_cart.viewed")} (${viewedItems.length})`}/>
                    </Tabs>
                    <div className={classes.list}>
                        {currentTabIndex === 0 && (
                            cartItems.length > 0 ? <CartTable items={cartItems} rows={cartRows} type="cart" setCurrentItem={setCurrentItem}/> 
                            : <p className={classes.empty}>{t("shopping_cart.empty")}.</p>
                        )}
                         {currentTabIndex === 1 && (
                            viewedItems.length > 0 ? <CartTable items={viewedItems.reverse()} cartItems={cartItems} rows={viewedRows} type="viewed" setCurrentItem={setCurrentItem}/> 
                            : <p className={classes.empty}>{t("profile.viewed_empty")}.</p>
                        )}
                    </div>
                </div>
                <div className={classes.right}>
                    <div className={classes.rightCard}>
                        <div className={classes.fieldCard}>
                            <span>{t("shopping_cart.totalResultShort")}</span>
                            <p>{totalCount} <span>шт.</span></p>
                        </div>
                        <div className={classes.fieldCard}>
                            <span>{t("shopping_cart.onSum")}:</span>
                            <p>{priceParser(totalSum)} <span>грн.</span></p>
                        </div>
                        <div className={classes.fieldCard}>
                            <span>{t("shopping_cart.delivery")}:</span>
                            <p>{priceParser(deliveryPrice)} <span>грн.</span></p>
                        </div>
                        <div className={cx(classes.fieldCard, classes.fieldTotal)}>
                            <span>{t("shopping_cart.total")}:</span>
                            <p>{priceParser(deliveryPrice + totalSum)} <span>грн.</span></p>
                        </div>
                        <Button 
                            className={classes.submit}
                            disabled={totalCount === 0}
                            onClick={goToCheckout}
                        >
                            {t("shopping_cart.submit")}
                        </Button>
                    </div>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default ShoppingCart