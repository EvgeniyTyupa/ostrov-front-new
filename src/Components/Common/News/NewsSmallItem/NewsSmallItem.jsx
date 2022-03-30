import React from 'react'
import { connect } from 'react-redux'
import classes from './NewsSmallItem.module.css'
import { BsCalendar } from 'react-icons/bs';
import moment from 'moment'

const NewsSmallItem = (props) => {
    const { item, currentLanguage } = props

    return (
        <div className={classes.main}>
            <img src={item.images[0]} alt="title img" className={classes.img}/>
            <div className={classes.info}>
                <p>{currentLanguage === "ru" ? item.title : item.title_ua}</p>
                <div className={classes.date}>
                    <BsCalendar/>
                    <span>{moment(item.created_at).format("DD/MM/YYYY")}</span>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {

})(NewsSmallItem)