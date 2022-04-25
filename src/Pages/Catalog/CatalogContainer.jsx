import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getByBrandCategoryTag, globalSearchCatalog, selectItems, setItemsData } from '../../Redux/itemsReducer'
import { getTag } from '../../Redux/tagsReducer'
import Catalog from './Catalog'
import { setCurrentFilterItem } from '../../Redux/commonReducer'
import { getCategoriesWithParents } from '../../Redux/categoryReducer'
import { getBrand } from '../../Redux/brandsReducer'
import { useTranslation } from 'react-i18next'

const CatalogContainer = (props) => {
    const { 
        isFetching,
        items,
        getByBrandCategoryTag,
        currentLanguage,
        getTag,
        getBrand,
        currentFilterItem,
        setCurrentFilterItem,
        getCategoriesWithParents,
        categoriesWithParents,
        total,
        globalSearchCatalog,
        selectItems,
        setItemsData
    } = props

    const navigate = useNavigate()

    const { t } = useTranslation()

    const [searchParams] = useSearchParams()

    const [pageSize, setPageSize] = useState(25)
    const [pageNumber, setPageNumber] = useState(1)

    const [searchBy, setSearchBy] = useState("")
    const [from, setFrom] = useState("")

    const [filter, setFilter] = useState("popular")

    const [searchValue, setSearchValue] = useState("")

    const [ageRange, setAgeRange] = useState([0, 17])
    const [priceRange, setPriceRange] = useState([0, 16000])

    const [activeBreadcrumb, setActiveBreadcrumb] = useState("")
    const [breadcrumbsItems, setBreadcrumbsItems] = useState(null)

    const handlePageSize = (event) => {
        setPageSize(event.target.value)
        setPageNumber(1)
    }

    const handleFilter = (e) => {
        let value = e.target.value
        if(value === "price_high"){
            setFrom("asc")
            setFilter("price_high")
        }else if(value === "price_low"){
            setFrom("desc")
            setFilter("price_low")
        }else if(value === "created_at"){
            setFrom("desc")
            setFilter("created_at")
        }else {
            setFilter(value)
            setFrom("asc")
        }
    }

    useEffect(() => {
        switch(searchBy){
            case "tags": {
                getTag(searchValue)
                break
            }
            case "category": {
                getCategoriesWithParents(searchValue)
                break
            }
            case "brand": {
                getBrand(searchValue)
                break
            }
            case "popular": {
                setActiveBreadcrumb(t("catalog.popular"))
                break
            }
            case "name": {
                setActiveBreadcrumb(t("catalog.search.search"))
            }
            case "selector": {
                setActiveBreadcrumb(t("catalog.selector"))
            }
        }
        if(searchBy != "selector") {
            navigate(`/catalog?pageNumber=${pageNumber}&pageSize=${pageSize}&searchBy=${searchBy}&from=${from}&searchValue=${searchValue}&filter=${filter}`)
        }else {
            console.log(ageRange, priceRange)
            navigate(`/catalog?pageNumber=${pageNumber}&pageSize=${pageSize}&searchBy=selector&from=${from}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&tag=${searchValue === "none" ? "" : searchValue}`)
        }
    }, [searchValue, searchBy, pageNumber, pageSize, from, filter])

    useEffect(() => {
        if(currentFilterItem){
            switch(searchBy){
                case "tags": {
                    setActiveBreadcrumb(currentLanguage === "ru" ? currentFilterItem.name : currentFilterItem.name_ua)
                    break
                }
                case "category": {
                    let breadcrumbsItems = categoriesWithParents.map((el, index) => {
                        return {
                            href: `/catalog?pageNumber=1&pageSize=25&searchBy=category&from=asc&searchValue=${el._id}`,
                            title: currentLanguage === "ru" ? el.name : el.name_ua
                        }
                    })
                    breadcrumbsItems.splice(breadcrumbsItems.length - 1, 1)
                    setBreadcrumbsItems(breadcrumbsItems)
                    setActiveBreadcrumb(currentLanguage === "ru" ? currentFilterItem.name : currentFilterItem.name_ua)
                    break
                }
                case "brand": {
                    setActiveBreadcrumb(currentFilterItem.name)
                    break
                }
            }
        }
    }, [currentFilterItem])

    useEffect(() => {
        if(searchParams.get('pageNumber')) setPageNumber(Number(searchParams.get('pageNumber')))
        if(searchParams.get('pageSize')) setPageSize(Number(searchParams.get('pageSize')))
        if(searchParams.get('searchBy')) setSearchBy(searchParams.get('searchBy'))
        if(searchParams.get('from')) setFrom(searchParams.get('from'))
        if(searchParams.get('searchValue')) setSearchValue(searchParams.get('searchValue'))
        if(searchParams.get('tag')) setSearchValue(searchParams.get('tag'))
        if(searchParams.get('minAge')) setAgeRange([searchParams.get('minAge'), searchParams.get('maxAge')])
        if(searchParams.get('maxAge')) setAgeRange([searchParams.get('minAge'), searchParams.get('maxAge')])
        if(searchParams.get('minPrice')) setPriceRange([searchParams.get('minPrice'), searchParams.get('minPrice')])
        if(searchParams.get('maxPrice')) setPriceRange([searchParams.get('minPrice'), searchParams.get('maxPrice')])
    }, [searchParams])

    // console.log(pageNumber, pageSize, searchBy, from, searchValue)

    useEffect(() => {
        if(searchBy === "name") {
            globalSearchCatalog(pageNumber, pageSize, "", from, searchValue, filter.includes("price") ? "price" : filter)
            setBreadcrumbsItems(null)
        } else if(searchBy === "selector") {
            selectItems(pageNumber, pageSize, filter, from, ageRange[0], ageRange[1], priceRange[0], priceRange[1], searchValue === "none" ? "" : searchValue)
        } else {
            getByBrandCategoryTag(pageNumber, pageSize, searchBy, from, searchValue, filter.includes("price") ? "price" : filter)
        }
    }, [searchBy, searchValue, from, pageSize, pageNumber, filter])

    useEffect(() => {
        return () => {
            setItemsData([])
            setCurrentFilterItem(null)
        }
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> :
                <Catalog
                    items={items}
                    activeBreadcrumb={activeBreadcrumb}
                    breadcrumbsItems={breadcrumbsItems}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    total={total}
                    setPageNumber={setPageNumber}
                    setPageSize={handlePageSize}
                    filter={filter}
                    setFilter={handleFilter}
                />
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    items: state.items.items,
    currentLanguage: state.common.currentLanguage,
    currentFilterItem: state.common.currentFilterItem,
    categoriesWithParents: state.categories.categoriesWithParents,
    total: state.items.total
})

export default connect(mapStateToProps, {
    getByBrandCategoryTag,
    getTag,
    setCurrentFilterItem,
    getBrand,
    getCategoriesWithParents,
    setCurrentFilterItem,
    globalSearchCatalog,
    selectItems,
    setItemsData
})(CatalogContainer)