import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classes from './OrderItem.module.css'

const OrderItem = (props) => {
    const { item } = props

    let itemName = item.item.name_ua
    
    return (
        <div className={classes.main}>
            <img src={item.item.images[0]} alt="image"/>
            <div className={classes.info}>
                <NavLink to={`/item/${item.item.url_code}`} target="_blank">{itemName}</NavLink>
                <span>Код: {item.item.code}</span>
                <span>Кол-во: {item.count} шт.</span>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, null)(OrderItem)