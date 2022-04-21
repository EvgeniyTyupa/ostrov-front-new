import React from 'react'
import { Rating } from 'react-simple-star-rating'
import classes from './Comment.module.css'
import moment from 'moment'

const Comment = (props) => {
    const { item } = props
    
    const rating = item.rating * 20

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.info}>
                    <p>{item.user_id.first_name ? item.user_id.first_name : item.user_id.email}</p>
                    <Rating size={"22px"} allowHalfIcon readonly ratingValue={rating}/>
                </div>
                <p className={classes.date}>{moment(item.created_at).format('DD/MM/YYYY')}</p>
            </div>
            <div className={classes.textContainer}>
                {item.text.split("\n").map(el => (
                    <p key={el}>{el}</p>
                ))}
            </div>
        </div>
    )
}

export default Comment