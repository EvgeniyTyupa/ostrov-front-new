import React from 'react'
import { connect } from 'react-redux'
import classes from './CategoriesList.module.css'

const CategoriesList = (props) => {
    const { categories, currentLanguage } = props

    console.log(categories)

    return (
        <div className={classes.main}>
            <ul className={classes.mainList}>
                {categories.map(item => (
                    <li>{currentLanguage === "ru" ? item.name : item.name_ua}</li>
                ))}
            </ul>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {})(CategoriesList)