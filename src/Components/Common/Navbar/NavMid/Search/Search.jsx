import React, { useEffect, useState } from 'react'
import classes from './Search.module.css'
import { Button, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ImSearch } from 'react-icons/im';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import DropdownMenu from './DropdownMenu/DropdownMenu';
import useDebounce from '../../../../../Utils/debounce';
import { globalSearch, setSearchingItems } from '../../../../../Redux/itemsReducer';
import { cx } from '../../../../../Utils/classnames';
import { setSearchingBrands } from '../../../../../Redux/brandsReducer';
import { setSearchingCategories } from '../../../../../Redux/categoryReducer';
import { setSearchingTags } from '../../../../../Redux/tagsReducer';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root:{
        background: "white",
        width: "100%",
        zIndex: 2,
        borderRadius: "25px",
        '& input': {
            fontSize: "14px",
            fontFamily: "Montserrat"
        },
        '& input::placeholder': {
            color: "#9DC8CF"
        },
        '& label.Mui-focused': {
            color: '#4B5EA3'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "transparent"
        },
        '& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "transparent"
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent' 
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            borderRadius: "25px",
            height: "51px",
            border: "2px solid #9DC8CF",
            paddingRight: 0
        },
        '& .MuiOutlinedInput-root:hover': {
            border: "2px solid #9DC8CF"
        },
        '& .MuiFormHelperText-root.Mui-error': {
            margin: 0,
            marginTop: 5,
        }
    }
}));

const Search = (props) => {
    const { 
        globalSearch,
        items, 
        brands,
        categories,
        tags,
        setSearchingItems, 
        setSearchingBrands,
        setSearchingCategories,
        setSearchingTags,
        currentLanguage,
        total
    } = props

    const { handleSubmit, control, reset, setValue } = useForm()

    const [searchValue, setSearchValue] = useState("")

    const material = useStyles()

    const navigate = useNavigate()

    const { t } = useTranslation()

    const debouncedSearchTerm = useDebounce(searchValue, 500)

    const [isShowDropdown, setIsShowDropdown] = useState(false)

    const handleIsShowDropdown = () => {
        setIsShowDropdown(!isShowDropdown)
    }

    const onSubmit = (data) => {
        if(data.searchValue.length > 2) {
            navigate(`/catalog?pageNumber=1&pageSize=25&searchBy=name&from=asc&searchValue=${data.searchValue}`)
        }
    }

    useEffect(() => {
        if(debouncedSearchTerm && searchValue.length > 2) {
           globalSearch(1, 25, "", "", searchValue, "popular")
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        if(searchValue.length === 0) {
            setSearchingItems([])
            setSearchingBrands([])
            setSearchingCategories([])
            setSearchingTags([])
        }
    }, [searchValue])

    return (
        <div className={cx(classes.main, isShowDropdown ? classes.active : undefined)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="searchValue"
                    control={control}
                    rules={{ required: "Обязательное поле!" }}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField 
                            onFocus={handleIsShowDropdown}
                            onBlur={handleIsShowDropdown}
                            onChange={e => {
                                setValue("searchValue", e.target.value)
                                setSearchValue(e.target.value)
                            }}
                            value={value}
                            classes={material}
                            placeholder={`${t("common.search")}...`}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <Button className={classes.searchBut} type="submit">
                                            <ImSearch/>
                                        </Button>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
            </form>
            <DropdownMenu 
                items={items} 
                brands={brands}
                categories={categories}
                tags={tags}
                active={isShowDropdown}
                currentLanguage={currentLanguage}
                total={total}
                searchValue={searchValue}
            />
        </div>
    )
}

let mapStateToProps = (state) => ({
    items: state.items.searchingItems,
    brands: state.brands.searchingBrands,
    tags: state.tags.searchingTags,
    categories: state.categories.searchingCategories,
    currentLanguage: state.common.currentLanguage,
    total: state.items.total
})

export default connect(mapStateToProps, {
    globalSearch,
    setSearchingItems,
    setSearchingBrands,
    setSearchingCategories,
    setSearchingTags
})(Search)