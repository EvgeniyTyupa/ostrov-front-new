import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getByBrandCategoryTag } from '../../Redux/itemsReducer'
import { getTag } from '../../Redux/tagsReducer'
import Catalog from './Catalog'
import { setCurrentFilterItem } from '../../Redux/commonReducer'
import { getCategoriesWithParents } from '../../Redux/categoryReducer'
import { getBrand } from '../../Redux/brandsReducer'

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
        total
    } = props

    const { pathname } = useLocation()

    const navigate = useNavigate()

    // console.log(pathname)

    const [searchParams] = useSearchParams()

    const [pageSize, setPageSize] = useState(25)
    const [pageNumber, setPageNumber] = useState(1)

    const [searchBy, setSearchBy] = useState("")
    const [from, setFrom] = useState("")

    const [searchValue, setSearchValue] = useState("")

    const [activeBreadcrumb, setActiveBreadcrumb] = useState("")
    const [breadcrumbsItems, setBreadcrumbsItems] = useState(null)


    const handleChangePage = (event, page) => {
        setPageNumber(page)
    }

    const handlePageSize = (event) => {
        setPageSize(event.target.value)
        setPageNumber(0)
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
                setSearchBy("popular")
                break
            }
            default: {
                setSearchBy("")
                break
            }
        }

        navigate(`/catalog?pageNumber=${pageNumber}&pageSize=${pageSize}&searchBy=${searchBy}&from=${from}&searchValue=${searchValue}`)
    }, [searchValue, searchBy, pageNumber, pageSize, from])

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
    }, [searchParams])

    // console.log(pageNumber, pageSize, searchBy, from, searchValue)

    useEffect(() => {
        getByBrandCategoryTag(pageNumber, pageSize, searchBy, from, searchValue)
    }, [searchBy, searchValue, from, pageSize, pageNumber])

    useEffect(() => {
        return () => {
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
    setCurrentFilterItem
})(CatalogContainer)