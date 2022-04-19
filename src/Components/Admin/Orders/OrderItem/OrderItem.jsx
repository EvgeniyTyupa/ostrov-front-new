import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classes from './OrderItem.module.css'

const OrderItem = (props) => {
    const { item, currentLanguage } = props

    let itemName = currentLanguage === "ru" ? item.item.name : item.item.name_ua
 
    return (
        <div className={classes.main}>
            <img src={item.item.images[0]} alt="image"/>
            <div className={classes.info}>
                <NavLink to={`/item/${itemName}`} target="_blank">{itemName}</NavLink>
                <span>Кол-во: {item.count} шт.</span>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, null)(OrderItem)