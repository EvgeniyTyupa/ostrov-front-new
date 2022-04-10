import React, { useState } from 'react'
import { connect } from 'react-redux'
import classes from './CategoriesList.module.css'
import ChildrenCategories from './ChildrenCategories/ChildrenCategories'

const CategoriesList = (props) => {
    const { categories, currentLanguage } = props

    console.log(categories)

    const [currentCategory, setCurrentCategory] = useState(null)

    const handleHover = (item) => {
        setCurrentCategory(item)
    }

    return (
        <div 
            className={classes.main}
            onMouseLeave={() => handleHover(null)}
        >
            <ul className={classes.mainList}>
                {categories.map(item => (
                    <li onMouseEnter={() => handleHover(item)}>
                        {currentLanguage === "ru" ? item.name : item.name_ua}
                    </li>
                ))}
            </ul>
            {currentCategory && 
                <div className={classes.childs}>
                    <ChildrenCategories 
                        category={currentCategory}
                        currentLanguage={currentLanguage}
                    />
                </div>
            }
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {})(CategoriesList)