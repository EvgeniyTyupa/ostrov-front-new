import { Button } from '@mui/material'
import React from 'react'
import classes from './FilterCatalogMobile.module.css'
import { FaFilter } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"
import { useTranslation } from 'react-i18next'
import { Drawer } from '@mui/material'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import FilterCatalog from '../FilterCatalog'

const FilterCatalogMobile = (props) => {
    const {
        categories,
        priceRange,
        setPriceRange,
        ageRange,
        setAgeRange,
        gender,
        setGender,
        applyFilter,
        itemsLength
    } = props

    const { t } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const anchor = 'left'

    return (
        <div className={classes.main}>
            <div className={classes.filterMobile}>
                <Button className={classes.filterBut} onClick={handleOpen}>
                    <FaFilter/>
                    {t("catalog.filter.button")}
                </Button>
            </div>
            <Drawer
                anchor={anchor} 
                open={isOpen} 
                onClose={handleOpen}
                classes={{ root: classes.root, paper: classes.paper }}
            >
                {/* <div className={classes.header}>
                    <IconButton 
                        onClick={handleOpen}
                        className={classes.closeBut}
                    >
                        <AiOutlineClose/>
                    </IconButton>
                </div> */}
                <FilterCatalog
                    categories={categories}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                    gender={gender}
                    setGender={setGender}
                    applyFilter={applyFilter}
                    itemsLength={itemsLength}
                />
            </Drawer>
        </div>
    )
}

export default FilterCatalogMobile