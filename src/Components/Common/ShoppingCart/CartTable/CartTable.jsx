import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { discountParser } from '../../../../Utils/discountParser'
import { priceParser } from '../../../../Utils/priceParser'
import AnimatedBlock from '../../../Animation/AnimatedBlock/AnimatedBlock'
import ItemCounter from '../../../UI/ItemCounter/ItemCounter'
import classes from './CartTable.module.css'

const useStyles = makeStyles(() => ({
    root:{
        padding: "0 20px",
        '& th, & td': {
            fontFamily: "Montserrat !important",
            backgroundColor: "white !important",
        },
        '& th': {
            color: "#37395C",
            fontSize: "14px",
            fontWeight: "700",
        },
        "& tr:last-child td": {
            borderBottom: "none !important"
        },
        '& tr:last-child td:last-child': { 
            borderBottomRightRadius: "16px",
        },
        '& tr:last-child td:first-child': { 
            borderBottomLeftRadius: "16px",
        },
        "& td a": {
            color: "#37395C",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500"
        },
        "& td::first-letter": {
            textTransform: "uppercase !important"
        },
        "& td a:hover": {
            textDecoration: "underline",
            color: "#E86589"
        },
        "& input": {
            fontSize: "16px !important",
            color: "#4B5EA3 !important",
            fontWeight: "700 !important"
        }
    }
}));

const CartTable = (props) => {
    const { 
        items,
        currentLanguage,
        rows,
        setCurrentItem,
        type,
        cartItems,
        gift
    } = props

    const material = useStyles()

    const { t } = useTranslation()

    return (
        <AnimatedBlock 
            className={classes.main} 
            key={type}
            initial={{opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            duration={.3}
        >
            <TableContainer>
                <Table classes={material}>
                    <TableHead>
                        <TableRow>
                            {rows.map((item, index) => (
                                <TableCell
                                    key={item}
                                    align={
                                        index === 3 ? "center" 
                                        : index === rows.length - 1 
                                        ? "right" : "left"
                                    }
                                >{item}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => (
                            <TableRow key={item.item._id}>
                                <TableCell
                                    className={classes.imageCell}
                                >
                                    <img 
                                        src={item.item.images[0]} 
                                        alt="title image"
                                        className={classes.titleImage}
                                    />
                                </TableCell>
                                <TableCell
                                    style={{
                                        maxWidth: "300px"
                                    }}
                                >
                                    <NavLink 
                                        to={`/item/${item.item.url_code}`}
                                    >
                                        {currentLanguage === "ru" ? item.item.name : item.item.name_ua}
                                    </NavLink>
                                    <div className={classes.info}>
                                        {item.item.brand && <p>{item.item.brand.name}</p>}
                                        <p>Код: {item.item.code}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {(item.item.action && item.item.action.from_sum_in_bill === 0 && !item.item.action.from_items_count) ?
                                        <span>{priceParser(discountParser(item.item.price, item.item.action.discount).replace(/ /g,''))} <span className={classes.textPrice}>грн.</span></span> :
                                        <span>{priceParser(item.item.price)} <span className={classes.textPrice}>грн.</span></span>
                                    }
                                </TableCell>
                                {type === "cart" ? 
                                    <TableCell align='center'>
                                        <ItemCounter
                                            type="mini"
                                            item={item}
                                            onChange={setCurrentItem}
                                        />
                                    </TableCell> :
                                    <TableCell align='right'>
                                        <Button 
                                            className={classes.addBut}
                                            onClick={() => setCurrentItem(item)}
                                            disabled={item.item.count <= 0 || cartItems.find(el => el.item._id === item.item._id)}
                                        >
                                            {cartItems.find(el => el.item._id === item.item._id) ? t("shopping_cart.added") :
                                            item.item.count <= 0 ? t("items.empty") : t("shopping_cart.add")}
                                        </Button>
                                    </TableCell>
                                }
                                {type === "cart" && <TableCell
                                    align="right"
                                >
                                    {(item.item.action && item.item.action.from_sum_in_bill === 0 && !item.item.action.from_items_count) ?
                                        <span>{priceParser(discountParser(item.item.price, item.item.action.discount).replace(/ /g,'') * item.count)} <span className={classes.textPrice}>грн.</span></span> :
                                        <span>{priceParser(Number(item.item.price) * item.count)} <span className={classes.textPrice}>грн.</span></span>
                                    }
                                </TableCell>}
                            </TableRow>
                        ))}
                        {gift && gift.map(item => (
                            <TableRow>
                                <TableCell
                                    className={classes.imageCell}
                                >
                                    <label className={classes.baige}>{t("shopping_cart.gift")}</label>
                                    <img 
                                        src={item.images[0]} 
                                        alt="title image"
                                        className={classes.titleImage}
                                    />
                                </TableCell>
                                <TableCell
                                    style={{
                                        maxWidth: "300px"
                                    }}
                                >
                                    <NavLink 
                                        to={`/item/${currentLanguage === "ru" ? item.name : item.name_ua}`}
                                    >
                                        {currentLanguage === "ru" ? item.name : item.name_ua}
                                    </NavLink>
                                    <div className={classes.info}>
                                        {item.brand && <p>{item.brand.name}</p>}
                                        <p>Код: {item.code}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span>0 <span className={classes.textPrice}>грн.</span></span>
                                </TableCell>
                                <TableCell align='center'>
                                    <span>1 <span className={classes.textPrice}>шт.</span></span>
                                </TableCell> 
                                <TableCell align='right'>
                                    <span>0 <span className={classes.textPrice}>грн.</span></span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AnimatedBlock>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {})(CartTable)