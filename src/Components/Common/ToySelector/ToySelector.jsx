import React from 'react'
import classes from './ToySelector.module.css'
import children_img from '../../../Assets/children.jpg'

const ToySelector = (props) => {
    return (
        <div className={classes.main}>
            <img src={children_img} alt="children" className={classes.children}/>
            <div className={classes.side}>

            </div>
        </div>
    )
}

export default ToySelector