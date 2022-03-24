import React from 'react'
import Breadcrumbs from '../../Components/Common/Breadcrumbs/Breadcrumbs'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './Item.module.css'

const Item = (props) => {
    const {
        item,
        currentLanguage,
        categoriesWithParents
    } = props

    let currentItemName = currentLanguage === "ru" ? item.name : item.name_ua
    
    let breadcrumbsItems = categoriesWithParents.map(el => {
        return {
            href: el.code,
            title: currentLanguage === "ru" ? el.name : el.name_ua
        }
    })

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <Breadcrumbs items={breadcrumbsItems} active={currentItemName}/>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Item