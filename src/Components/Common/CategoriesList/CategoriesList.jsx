import React from 'react'
import classes from './CategoriesList.module.css'

const CategoriesList = (props) => {
    const { categories } = props

    console.log(categories)

    return (
        <div className={classes.main}>
            <ul>
                {categories.map(item => (
                    <li></li>
                ))}
            </ul>
        </div>
    )
}

export default CategoriesList