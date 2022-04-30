import React from 'react'
import AnimatedBlock from '../../../Animation/AnimatedBlock/AnimatedBlock'
import classes from './ChildrenCategories.module.css'

const ChildrenCategories = (props) => {
    const { 
        category,
        currentLanguage,
        onClick
    } = props

    const renderChild = (category) => {
        if(category.children.length > 0){
            return category.children.map(el => (
                <div className={classes.listContainer}>
                    <ul>
                        <li onClick={() => onClick(el._id)}>{currentLanguage === "ru" ? el.name : el.name_ua}</li>
                        {renderChild(el)}
                    </ul>
                </div>
            ))
        }
    }

    return (
        <AnimatedBlock 
            className={classes.main}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            duration={1.3}
            type={"spring"}
        >
            {renderChild(category)}
        </AnimatedBlock>
    )
}

export default ChildrenCategories