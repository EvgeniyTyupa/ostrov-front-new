import React from 'react'
import classes from './Catalog.module.css'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import Breadcrumbs from '../../Components/Common/Breadcrumbs/Breadcrumbs'
import SmallItem from '../../Components/Common/Items/SmallItem/SmallItem'
import { useTranslation } from 'react-i18next'
import CustomPagination from '../../Components/Common/Pagination/Pagination'
import CustomSelect from '../../Components/UI/Form/Select'
import { useSortableFields } from '../../Hooks/useSortableFields'
import { MenuItem } from '@mui/material'

const Catalog = (props) => {
    const { 
        items,
        breadcrumbsItems,
        activeBreadcrumb,
        pageSize,
        setPageSize,
        pageNumber,
        setPageNumber,
        total,
        filter,
        setFilter
    } = props

    const { t } = useTranslation()

    const sortPoints = useSortableFields()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.header}>
                    <Breadcrumbs items={breadcrumbsItems} active={activeBreadcrumb}/>
                    <div className={classes.sort}>
                        <label>{t("catalog.sort.label")}:</label>
                        <CustomSelect onChange={setFilter} value={filter} variant={"standard"}>
                            {sortPoints.map(el => (
                                <MenuItem key={el.text} value={el.searchBy}>{el.text}</MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                </div>
                <div className={classes.wrapper}>
                    {items.map(el => <SmallItem key={el._id} item={el}/>)}
                    {items.length === 0 && <p className={classes.empty}>{t("catalog.empty")} 🥲</p>}
                </div>
                {items.length > 0 &&
                    <CustomPagination
                        currentPage={pageNumber}
                        pageSize={pageSize}
                        total={total}
                        setCurrentPage={setPageNumber}
                        setPageSize={setPageSize}
                    />
                }
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Catalog