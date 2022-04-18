import { TextField, InputAdornment, IconButton, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaMinus, FaPlus } from 'react-icons/fa'
import classes from './ItemCounter.module.css'

const useStyles = makeStyles((theme) => ({
    root:{
        background: "white",
        width: "fit-content",
        maxWidth: "140px",
        '& input': {
            textAlign: "center",
            fontFamily: "Montserrat",
            fontSize: "12px",
        },
        '& label.Mui-focused': {
            color: 'rgba(55, 57, 92, .2)'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            // borderColor: 'rgba(55, 57, 92, .2)' 
        },
        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(55, 57, 92, .1)'
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "32px",
            textAlign: "center !important",
            height: "30px",
            // border: '1px solid rgba(55, 57, 92, .2)'
        },
        '& .MuiFormHelperText-root.Mui-error': {
            margin: 0,
            marginTop: 5,
        }
    }
}));


const ItemCounter = (props) => {
    const { 
        item,
        onChange,
        type
    } = props

    const material = useStyles()

    const { t } = useTranslation()

    const handleMinus = () => {
        const count = Number(item.count)
        if(type === "result") {
            if(count - 1 > 0) {
                onChange({
                    item: item.item,
                    count: count - 1
                })
            }
        }else if(type === "mini"){
            if(count - 1 > -1) {
                onChange({
                    item: item.item,
                    count: count - 1
                })
            }
        }
    }

    const handlePlus = () => {
        const count = Number(item.count)
        if(count + 1 <= item.item.count) {
            onChange({
                item: item.item,
                count: count + 1
            })
        }
    }

    return (
        <TextField
            value={item.count}
            disabled
            classes={material}
            className={classes.main}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start' style={{ width: "fit-content" }}>
                        <IconButton
                            disabled={
                                type === "result" ? 
                                item.count - 1 === 0 : 
                                item.count - 1 === -1
                            }
                            onClick={handleMinus}
                        >
                            <FaMinus/>
                        </IconButton>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position='end' style={{ width: "fit-content"}}>
                        {item.count + 1 <= item.item.count ?
                            <IconButton
                                onClick={handlePlus}
                            >
                                <FaPlus/>
                            </IconButton>
                            :
                            <Tooltip title={t("shopping_cart.not_available")}>
                                <IconButton
                                    className={classes.disabled}
                                >
                                    <FaPlus/>
                                </IconButton>
                            </Tooltip>
                        }
                        
                    </InputAdornment>
                )
            }}
        />
    )
}

export default ItemCounter