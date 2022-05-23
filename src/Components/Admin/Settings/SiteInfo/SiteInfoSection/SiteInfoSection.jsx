import React from 'react'
import { Controller } from 'react-hook-form'
import AdminInput from '../../../../UI/Form/AdminInput'
import classes from './SiteInfoSection.module.css'
import { AiOutlineMinus } from 'react-icons/ai';
import { Button } from '@mui/material';

const SiteInfoSection = (props) => {
    const { control, index, onRemove } = props

    return (
        <div className={classes.main}>
            <Controller
                name={`phones.${index}.value`}
                control={control}
                defaultValue=""
                rules={{ required: "Обязательное поле!" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <AdminInput
                            onChange={onChange}
                            value={value}
                            error={error}
                            label={`Номер телефона ${index + 1}`}  
                        />
                    </>
                )}
            />
            <div className={classes.removeContainer}>
                <Button onClick={() => onRemove(index)}>
                    <AiOutlineMinus/>&nbsp;
                    <span>Удалить</span>
                </Button>
            </div>
        </div>
    )
}

export default SiteInfoSection