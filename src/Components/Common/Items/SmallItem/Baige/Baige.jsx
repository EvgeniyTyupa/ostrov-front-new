import React from 'react'
import { cx } from '../../../../../Utils/classnames'
import classes from './Baige.module.css'

const Baige = (props) => {
    const { 
        type = "new",
        value
    } = props

    return (
        <div className={cx(classes.main, type === "new" ? classes.new : '')}>
            <label>
                {type === "new" && "NEW"}
                {/* {type === "action" && t("items.baige")} */}
                {type === "discount" &&  
                    (value.includes("%") ? "-" + value 
                    : 
                    <span>
                        -
                        {value}
                        <label className={classes.currency}>&nbsp;грн.</label>
                    </span> 
                )}
            </label>
        </div>
    )
}

export default Baige