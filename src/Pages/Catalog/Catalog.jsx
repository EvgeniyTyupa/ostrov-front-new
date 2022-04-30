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
import AnimatedBlock from '../../Components/Animation/AnimatedBlock/AnimatedBlock'
import FilterCatalog from '../../Components/Common/FilterCatalog/FilterCatalog'
import { Helmet } from 'react-helmet'

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
        setFilter,
        filterCategories,
        priceRange,
        setPriceRange,
        ageRange,
        setAgeRange,
        gender,
        setGender,
        applyFilter,
        currentLanguage
    } = props

    const { t } = useTranslation()

    const sortPoints = useSortableFields()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <AnimatedBlock className={classes.header}>
                    <Helmet 
                        htmlAttributes={{"lang": "ua", "amp": undefined}}
                        title={`${t("siteName")} | ${currentLanguage === "ru" ? "Каталог" : "Каталог"}`}
                        meta={[{"name": "description", "content": t("siteDescription")}]}
                    />
                    <Breadcrumbs items={breadcrumbsItems} active={activeBreadcrumb}/>
                    <div className={classes.sort}>
                        <label>{t("catalog.sort.label")}:</label>
                        <CustomSelect onChange={setFilter} value={filter} variant={"standard"}>
                            {sortPoints.map(el => (
                                <MenuItem key={el.text} value={el.searchBy}>{el.text}</MenuItem>
                            ))}
                        </CustomSelect>
                    </div>
                </AnimatedBlock>
                <AnimatedBlock className={classes.itemsContainer}>
                    <div className={classes.filter}>
                        <FilterCatalog
                            categories={filterCategories}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            ageRange={ageRange}
                            setAgeRange={setAgeRange}
                            gender={gender}
                            setGender={setGender}
                            applyFilter={applyFilter}
                        />
                    </div>
                    <div className={classes.wrapper}>
                        {items.map(el => <SmallItem key={el._id} item={el}/>)}
                        {items.length === 0 && <p className={classes.empty}>{t("catalog.empty")} 🥲</p>}
                    </div>
                </AnimatedBlock>
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