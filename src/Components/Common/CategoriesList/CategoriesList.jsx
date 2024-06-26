import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'
import classes from './CategoriesList.module.css'
import ChildrenCategories from './ChildrenCategories/ChildrenCategories'

const CategoriesList = (props) => {
    const { categories, currentLanguage } = props

    const navigate = useNavigate()

    const [currentCategory, setCurrentCategory] = useState(null)

    const handleHover = (item) => {
        setCurrentCategory(item)
    }

    const onClick = (categoryId) => {
        navigate(`/catalog?pageNumber=1&pageSize=25&searchBy=category&from=desc&searchValue=${categoryId}`)
    }

    return (
        <div 
            className={classes.main}
            onMouseLeave={() => handleHover(null)}
        >
            <ul className={classes.mainList}>
                {categories.map(item => (
                    <li 
                        key={item._id}
                        onMouseEnter={() => handleHover(item)}
                        onClick={() => onClick(item._id)}
                    >
                        {item.name_ua}
                    </li>
                ))}
            </ul>
            {(currentCategory && currentCategory.children.length > 0) && 
                <AnimatedBlock 
                    className={classes.childs}
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    exit={{ height: 0 }}
                    duration={.8}
                >
                    <ChildrenCategories 
                        category={currentCategory}
                        currentLanguage={currentLanguage}
                        onClick={onClick}
                    />
                </AnimatedBlock>
            }
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {})(CategoriesList)