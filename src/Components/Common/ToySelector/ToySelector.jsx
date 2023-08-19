import React, { useEffect, useState } from 'react'
import classes from './ToySelector.module.css'
import children_img from '../../../Assets/children.jpg'
import { useTranslation } from 'react-i18next'
import { Autocomplete, Button, MenuItem, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form'
import { makeStyles } from '@mui/styles'
import { useChildAge } from '../../../Hooks/useChildAge';
import { useNavigate } from 'react-router-dom';
import CustomPrettoSlider from '../../UI/Form/PrettoSlider/PrettoSlider';

const useStyles = makeStyles((theme) => ({
    root:{
        background: "white",
        width: "100%",
        "@media screen and (max-width: 468px)": {
            width: "100%"
        },
        '& input': {
            fontSize: "14px",
            fontFamily: "Montserrat"
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "#9DC8CF"
        },
        '& label.Mui-focused': {
            color: '#9DC8CF'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9DC8CF' 
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            height: "50px",
            fontFamily: "Montserrat",
            fontSize: "14px"
        },
        '& .MuiFormHelperText-root.Mui-error': {
            margin: 0,
            marginTop: 5,
        }
    }
}));

const ToySelector = (props) => {
    const { tags, currentLanguage, maxPrice } = props

    const { handleSubmit, reset, control, setValue } = useForm()

    const { t } = useTranslation()

    const material = useStyles()

    const navigate = useNavigate()

    const [priceRange, setPriceRange] = useState([0, maxPrice])
    const [ageRange, setAgeRange] = useState([0, 0])

    const ages = useChildAge()

    const newTags = [...tags]

    const nonTag = {
        _id: "none",
        name: t("selector.any"),
        name_ua: t("selector.any")
    }

    newTags.push(nonTag)

    const handlePriceRange = (event, newValue) => {
        setPriceRange(newValue);
        setValue("minPrice", newValue[0])
        setValue("maxPrice", newValue[1])
    }

    const handleAgeRange = (value) => {
        setAgeRange(value)
        setValue("minAge", value[0])
        setValue("maxAge", value[1])
    }

    const onSubmit = (data) => {
        data.tag = data.tag._id
        navigate(`/catalog?pageNumber=1&pageSize=25&searchBy=selector&from=desc&minAge=${data.minAge === -1 ? 0 : data.minAge}&maxAge=${data.maxAge === -1 ? 17 : data.maxAge}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}&tag=${data.tag}`)
    }

    useEffect(() => {
        reset({
            minPrice: 0,
            maxPrice: maxPrice ? maxPrice : 10000,
            minAge: 0,
            maxAge: 0,
            tag: nonTag
        })
        setPriceRange([0, maxPrice])
    }, [maxPrice])

    return (
        <div className={classes.main}>
            <img src={children_img} alt="children" className={classes.children}/>
            <div className={classes.side}>
                <h3>{t("selector.title")}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.priceRange}>
                        <h4 className={classes.blockTitle}>{t("selector.priceTitle")}</h4>
                        <div className={classes.priceInputs}>
                            <Controller
                                name="minPrice"
                                control={control}
                                defaultValue=""
                                rules={{ required: t("errors.required") }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        onChange={(e) => {
                                            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                            setValue("minPrice", Number(onlyNums))
                                            setPriceRange([Number(onlyNums), priceRange[1]])
                                        }}
                                        value={value}
                                        classes={material}
                                    />
                                )}
                            />
                            <Controller
                                name="maxPrice"
                                control={control}
                                defaultValue=""
                                rules={{ required: t("errors.required") }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        onChange={(e) => {
                                            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                            setValue("maxPrice", Number(onlyNums))
                                            setPriceRange([priceRange[0], Number(onlyNums)])
                                        }}
                                        value={value}
                                        classes={material}
                                    />
                                )}
                            />
                        </div>
                        <CustomPrettoSlider
                            value={priceRange}
                            onChange={handlePriceRange}
                            max={maxPrice}
                        />
                    </div>
                    <h4 className={classes.blockTitle}>{t("selector.age")}</h4>
                    <TextField
                        select
                        classes={material}
                        value={ageRange[0]}
                        onChange={(e) => {
                            const value = Number(e.target.value)
                            switch(value){
                                case 0: {
                                    handleAgeRange([0, 0])
                                    break
                                }
                                case 1: {
                                    handleAgeRange([1, 2])
                                    break
                                }
                                case 3: {
                                    handleAgeRange([3, 5])
                                    break
                                }
                                case 6: {
                                    handleAgeRange([6, 9])
                                    break
                                }
                                case 10: {
                                    handleAgeRange([10, 12])
                                    break
                                }
                                case 13: {
                                    handleAgeRange([13, 17])
                                    break
                                }
                                default: {
                                    handleAgeRange([-1, -1])
                                    break
                                }
                            }
                        }}
                    >
                        {ages.map(el => (
                            <MenuItem key={el.text} value={el.value[0]}>{el.text}</MenuItem>
                        ))}
                    </TextField>
                    <h4 className={classes.blockTitle}>{t("selector.tag")}</h4>
                    <Controller
                        name="tag"
                        control={control}
                        defaultValue={[]}
                        rules={{ required: t("errors.required") }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Autocomplete
                                disablePortal
                                options={newTags}
                                value={value}
                                getOptionLabel={option => currentLanguage === "ru" ? option.name : option.name_ua}
                                onChange={(event, newValue) => {
                                    setValue("tag", newValue)
                                }}
                                filterSelectedOptions
                                limitTags={10}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                style={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params} classes={material} error={!!error} helperText={error ? error.message : null} />}
                            />
                        )}
                    />
                    <Button className={classes.submit} type="submit">{t("selector.submit")}</Button>
                </form>
            </div>
        </div>
    )
}

export default ToySelector