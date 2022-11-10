import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useChildAge } from '../../../Hooks/useChildAge'
import { useGenderTypes } from '../../../Hooks/useGenderTypes'
import { cx } from '../../../Utils/classnames'
import AdminInput from '../../UI/Form/AdminInput'
import CustomCheckbox from '../../UI/Form/Checkbox'
import CustomPrettoSlider from '../../UI/Form/PrettoSlider/PrettoSlider'
import FilterBlock from './FilterBlock/FilterBlock'
import classes from './FilterCatalog.module.css'

const FilterCatalog = (props) => {
    const {
        currentLanguage,
        categories,
        priceRange,
        setPriceRange,
        ageRange,
        setAgeRange,
        gender,
        setGender,
        applyFilter,
        itemsLength,
        maxPrice,
        tags,
        selectedTags,
        handleSelectedTags
    } = props

    const { t } = useTranslation()

    const ages = useChildAge()
    const genders = useGenderTypes()

    const navigate = useNavigate()

    const [isSticky, setIsSticky] = useState(false)

    const onClickCategory = (category) => {
        navigate(`/catalog?pageNumber=1&pageSize=25&searchBy=category&from=asc&searchValue=${category._id}`)
    }

    const handleSticky = (e) => {
        const scrollTop = window.scrollY;
        scrollTop >= 250 ? setIsSticky(true) : setIsSticky(false);
    };

    const handlePriceRange = (event, newValue) => {
        setPriceRange(newValue)
    }

    const handleAge = (value) => {
        let isExits = false
        let newAges = [...ageRange]
        
        if(newAges.length === 1) {
            newAges.forEach((el, index) => {
                if(el[0] === 0 && el[1] === 17) {
                    newAges.splice(index, 1)
                }
            })
        }

        newAges.forEach((el, index) => {
            if(el[1] === value[1]) {
                isExits = true
                newAges.splice(index, 1)
            }
        })

        if(newAges.length === 0){
            newAges.push([0, 17])
        }

        if(!isExits) {
            newAges.forEach((el, index) => {
                if(el[0] === 0 && el[1] === 17) {
                    newAges.splice(index, 1)
                }
            })
            newAges.push(value)
        }
        setAgeRange(newAges)
    }
    
    const handleGender = (value) => {
        let isExist = false
        let newGenders = [...gender]
        newGenders.forEach((el, index) => {
            if(el === value) {
                isExist = true
                newGenders.splice(index, 1)
            }
        })

        if(!isExist) {
            newGenders.push(value)
        }
        setGender(newGenders)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleSticky);
        return () => {
            window.removeEventListener('scroll', handleSticky);
        };
    });

    return (
        <div className={classes.main}>
            <div className={cx(classes.container, (isSticky && itemsLength >= 35) ? classes.sticky : "")}>
                {categories.length > 0 &&
                <FilterBlock title={t("catalog.filter.category")}>
                    <div className={classes.content}>
                        {categories.map(el => (
                            <p onClick={() => onClickCategory(el)} key={el.name_ua}>{currentLanguage === "ru" ? el.name : el.name_ua}</p>
                        ))}
                    </div>
                </FilterBlock>}
                <FilterBlock title={t("catalog.filter.age")}>
                    <div className={cx(classes.content, classes.ageFilter)}>
                        {ages.map((el, index) => (
                            index > 0 && (
                                <CustomCheckbox 
                                    label={el.text}
                                    onChange={() => handleAge(el.value)}
                                    checked={ageRange.find(item => item[0] === el.value[0] && item[1] === el.value[1]) ? true : false}
                                    key={index}
                                />
                            )
                        ))}
                    </div>
                </FilterBlock>
                <FilterBlock title={t("catalog.filter.gender")}>
                    <div className={cx(classes.content, classes.ageFilter)}>
                        {genders.map(el => (
                            <CustomCheckbox 
                                label={el.text}
                                checked={gender.find(item => item === el.value)}
                                onChange={() => handleGender(el.value)}
                                key={el.value}
                            />
                        ))}
                    </div>
                </FilterBlock>
                <FilterBlock title="Тематика">
                    <div className={cx(classes.content, classes.tags)}>
                        {tags.map(el => (
                            <CustomCheckbox 
                                label={el.name_ua}
                                checked={selectedTags.find(item => item === el._id)}
                                onChange={() => handleSelectedTags(el._id)}
                                key={el._id}
                            />
                        ))}
                    </div>
                </FilterBlock>
                <FilterBlock title={t("catalog.filter.price")}>
                    <div className={classes.range}>
                        <CustomPrettoSlider
                            value={priceRange}
                            onChange={handlePriceRange}
                            max={maxPrice}
                        />
                    </div>
                    <div className={classes.priceFields}>
                        <AdminInput
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                setPriceRange([Number(onlyNums), priceRange[1]])
                            }}
                            value={priceRange[0]}
                        />
                        <AdminInput
                            className={classes.priceInput}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                setPriceRange([priceRange[0], Number(onlyNums)])
                            }}
                            value={priceRange[1]}
                        />
                    </div>
                </FilterBlock>
                <Button className={classes.searchBut} onClick={applyFilter}>
                    {t("common.search")}
                </Button>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage,
    maxPrice: state.common.maxPrice
})

export default connect(mapStateToProps, {

})(FilterCatalog)