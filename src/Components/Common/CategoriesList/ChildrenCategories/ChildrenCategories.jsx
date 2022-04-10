import React from 'react'
import classes from './ChildrenCategories.module.css'

const ChildrenCategories = (props) => {
    const { 
        category,
        currentLanguage
    } = props

    const renderChild = (category) => {
        if(category.children.length > 0){
            console.log(category)
            return category.children.map(el => (
                <div className={classes.listContainer}>
                    <ul>
                        <li>{currentLanguage === "ru" ? el.name : el.name_ua}</li>
                        {renderChild(el)}
                    </ul>
                </div>
            ))
        }
    }

    return (
        <div className={classes.main}>
            {renderChild(category)}
        </div>
    )
}

export default ChildrenCategories