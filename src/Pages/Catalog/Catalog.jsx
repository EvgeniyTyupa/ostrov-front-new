import React from 'react'
import classes from './Catalog.module.css'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import Breadcrumbs from '../../Components/Common/Breadcrumbs/Breadcrumbs'
import SmallItem from '../../Components/Common/Items/SmallItem/SmallItem'
import { useTranslation } from 'react-i18next'
import CustomPagination from '../../Components/Common/Pagination/Pagination'

const Catalog = (props) => {
    const { 
        items,
        breadcrumbsItems,
        activeBreadcrumb,
        pageSize,
        pageNumber,
        total
    } = props

    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.header}>
                    <Breadcrumbs items={breadcrumbsItems} active={activeBreadcrumb}/>
                    <div></div>
                </div>
                <div className={classes.wrapper}>
                    {items.map(el => <SmallItem key={el._id} item={el}/>)}
                    {items.length === 0 && <p className={classes.empty}>{t("catalog.empty")} 🥲</p>}
                </div>
                {items.length > 0 &&
                    <CustomPagination
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        total={total}
                    />
                }
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Catalog