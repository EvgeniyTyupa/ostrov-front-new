import React from 'react'
import { Button, InputAdornment, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import classes from './FootTop.module.css'
import boy from '../../../../Assets/boy.svg'
import girl from '../../../../Assets/girl.svg'
import { BsArrowRightShort } from 'react-icons/bs';
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    root:{
        width: "100%",
        '& input': {
            fontSize: "14px",
            fontFamily: "Montserrat"
        },
        '& input::placeholder': {
            color: "#37395C"
        },
        '& label.Mui-focused': {
            color: '#4B5EA3'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "transparent",
            bg: "white"
        },
        '& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "transparent"
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent' 
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "25px",
            height: "51px",
            border: "2px solid #9DC8CF",
            paddingRight: 0,
            backgroundColor: "white"
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

const FootTop = (props) => {
    const { handleSubmit, control, reset } = useForm()

    const { t } = useTranslation()

    const material = useStyles()

    const onSubmit = (data) => {
        reset({
            email: ""
        })
    }

    return (
        <div className={classes.main}>
            <img src={boy} alt="boy" className={classes.boy}/>
            <div className={classes.form}>
                <p>{t("footer.form")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{ 
                            required: {
                                value: true,
                            },
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
                                message: t("errors.email")
                            }
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    error={!!error}
                                    classes={material}
                                    variant="outlined"
                                    placeholder="Ваш email"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <Button className={classes.submitBut} type="submit">
                                                    <BsArrowRightShort/>
                                                </Button>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {error ? <span className={classes.error}>{error.message}</span> : null}
                            </>
                        )}
                    />
                </form>
            </div>
            <img src={girl} alt="girl" className={classes.girl}/>
        </div>
    )
}

export default FootTop