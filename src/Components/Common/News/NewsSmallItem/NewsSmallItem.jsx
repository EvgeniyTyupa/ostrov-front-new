import React from 'react'
import { connect } from 'react-redux'
import classes from './NewsSmallItem.module.css'
import { BsCalendar } from 'react-icons/bs';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { cx } from '../../../../Utils/classnames';

const NewsSmallItem = (props) => {
    const { item, currentLanguage, className } = props

    const navigate = useNavigate()
    let postName = currentLanguage === "ru" ? item.title : item.title_ua

    const onClick = () => {
        navigate(`/blog/${postName}`)
    }

    return (
        <div className={cx(classes.main, className)}>
            <img src={item.title_image ? item.title_image : item.images[0]} onClick={onClick} alt="title img" className={classes.img} referrerpolicy="no-referrer"/>
            <div className={classes.info}>
                <p onClick={onClick}>{currentLanguage === "ru" ? item.title : item.title_ua}</p>
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

export default connect(mapStateToProps, null)(NewsSmallItem)