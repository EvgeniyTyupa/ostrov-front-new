import { IconButton } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classes from './CategoriesListMobile.module.css'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react'
import { Button } from '@mui/material'
import { setIsOpenBurger } from '../../../../Redux/commonReducer'

const CategoriesListMobile = (props) => {
    const { currentLanguage, categories, handleMobileOpen, setIsOpenBurger } = props

    const [children, setChildren] = useState(null)

    const navigate = useNavigate()

    const onCategoryClick = (categoryId) => {
        navigate(`/catalog?pageNumber=1&pageSize=25&searchBy=category&from=asc&searchValue=${categoryId}`)
        handleMobileOpen()
        setIsOpenBurger(false)
    }

    const onBackClick = () => {
        if(children[0].p_id) {
            searchParent(categories, children[0].p_id)
        } else {
            setChildren(null)
        }
    }

    const searchParent = (categories, p_id) => {
        categories.forEach(el => {
            if(el._id === p_id) {
                setChildren(categories)
                if(!categories[0].p_id) {
                    setChildren(null)
                }
            }else if(el.children.length > 0){
                searchParent(el.children, p_id)
            }
        })
    }

    return (
        <div className={classes.main}>
            {children && <div className={classes.header}>
                <Button className={classes.backBut} onClick={onBackClick}>
                    <FiArrowLeft/>
                    <span>Назад</span>
                </Button>
            </div>}
            <div className={classes.wrapper}>
                {!children ? categories.map(el => (
                    <div className={classes.section}>
                        <p onClick={() => onCategoryClick(el._id)}>{currentLanguage === "ru" ? el.name : el.name_ua}</p>
                        {el.children.length > 0 && <IconButton onClick={() => setChildren(el.children)}>
                            <FiArrowRight/>
                        </IconButton>}
                    </div>
                )) : 
                    children.map(el => (
                        <div className={classes.section}>
                            <p onClick={() => onCategoryClick(el._id)}>{currentLanguage === "ru" ? el.name : el.name_ua}</p>
                            {el.children.length > 0 && <IconButton onClick={() => setChildren(el.children)}>
                                <FiArrowRight/>
                            </IconButton>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {
    setIsOpenBurger
})(CategoriesListMobile)