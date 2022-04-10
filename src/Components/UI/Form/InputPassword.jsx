import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'

import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    root:{
        background: "white",
        '& label.Mui-focused': {
            color: '#4B5EA3'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4B5EA3' 
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            borderRadius: "4px"
        },
        '& .MuiFormHelperText-root.Mui-error': {
            margin: 0,
            marginTop: 5,
        }
    }
}));

const InputPassword = (props) => {
    const { onChange, value, error, label = "Password" } = props

    const material = useStyles()

    const [isShowPassword, setIsShowPassword] = useState(false)

    const handlePassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <TextField
            error={!!error}
            helperText={error ? error.message : null}
            classes={material}
            label={label}
            variant={"outlined"}
            onChange={onChange}
            value={value}
            autoComplete="off"
            type={isShowPassword ? "text" : "password"}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" style={{ width: "fit-content" }}>
                        <LockIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end" style={{ width: "fit-content", marginRight: "10px" }}>
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handlePassword}
                            edge="end"
                        >
                            {isShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            
        />
    )
}

export default InputPassword