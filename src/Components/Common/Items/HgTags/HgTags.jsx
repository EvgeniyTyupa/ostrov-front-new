import React from 'react'
import HgTag from './HgTag/HgTag'
import classes from './HgTags.module.css'

const HgTags = (props) => {
    const { tags } = props

    return (
        <div className={classes.main}>
            {tags.map((el, index) => (
                <HgTag 
                    key={el._id}
                    index={index}
                    tag={el}
                />
            ))}
        </div>
    )
}

export default HgTags