import React, { useState } from 'react'
import classes from './Search.module.css'
import { Button, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ImSearch } from 'react-icons/im';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root:{
        background: "white",
        width: "100%",
        '& input': {
            fontSize: "14px"
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
    const [searchValue, setSearchValue] = useState("")

    const material = useStyles()

    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <TextField 
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
        </div>
    )
}

export default Search