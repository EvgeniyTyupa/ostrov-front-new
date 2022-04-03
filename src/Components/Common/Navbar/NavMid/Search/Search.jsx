import React, { useEffect, useState } from 'react'
import classes from './Search.module.css'
import { Button, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ImSearch } from 'react-icons/im';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import DropdownMenu from './DropdownMenu/DropdownMenu';
import useDebounce from '../../../../../Utils/debounce';
import { searchItems, setSearchingItems } from '../../../../../Redux/itemsReducer';

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
    const { items, searchItems, setSearchingItems, currentLanguage } = props

    const [searchValue, setSearchValue] = useState("")

    const material = useStyles()

    const { t } = useTranslation()

    const debouncedSearchTerm = useDebounce(searchValue, 500)

    const [isShowDropdown, setIsShowDropdown] = useState(false)

    const handleIsShowDropdown = () => {
        setIsShowDropdown(!isShowDropdown)
    }

    useEffect(() => {
        if(debouncedSearchTerm && searchValue.length > 2) {
            searchItems(searchValue)
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        if(searchValue.length === 0) {
            setSearchingItems([])
        }
    }, [searchValue])

    return (
        <div className={classes.main}>
            <TextField 
                onFocus={handleIsShowDropdown}
                onBlur={handleIsShowDropdown}
                onChange={e => setSearchValue(e.target.value)}
                value={searchValue}
                classes={material}
                placeholder={`${t("common.search")}...`}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <Button className={classes.searchBut}>
                                <ImSearch/>
                            </Button>
                        </InputAdornment>
                    )
                }}
            />
            <DropdownMenu 
                items={items} 
                active={isShowDropdown}
                currentLanguage={currentLanguage}
            />
        </div>
    )
}

let mapStateToProps = (state) => ({
    items: state.items.searchingItems,
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {
    searchItems,
    setSearchingItems
})(Search)