import React from 'react'
import { Controller } from 'react-hook-form'
import DropZone from '../../../Common/DropZone/DropZone'
import AdminInput from '../../../UI/Form/AdminInput'
import classes from './NewsContentSection.module.css'
import { AiOutlineMinus } from 'react-icons/ai';
import { Button } from '@mui/material'
import Field from '../../../UI/Form/Field/Field'

const NewsContentSection = (props) => {
    const { control, index, onRemove } = props

    return (
        <div className={classes.main}>
            <h4>Секция {index + 1}</h4>
            <Field className={classes.row}>
                <Controller
                    name={`paragraphs.${index}.value`}
                    control={control}
                    defaultValue=""
                    rules={{ required: "Обязательное поле!" }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <AdminInput
                                onChange={onChange}
                                multiline={true}
                                rows={6}
                                value={value}
                                error={error}
                                label="Текст"  
                            />
                        </>
                    )}
                />
            </Field>
            <Field className={classes.row}>
                <Controller
                    name={`paragraphs_ua.${index}.value`}
                    control={control}
                    defaultValue=""
                    rules={{ required: "Обязательное поле!" }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AdminInput
                            onChange={onChange}
                            multiline={true}
                            rows={6}
                            value={value}
                            error={error}
                            label="Текст (УКР)"  
                        />
                    )}
                />
            </Field>
            <div className={classes.imgContainer}>
                <Controller
                    name={`images.${index}.value`}
                    control={control}
                    rules={{ required: "Обязательное поле!" }}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <DropZone
                                onChange={onChange}
                                error={error}
                                title="Изображение"
                                id={index}
                                initialFiles={[value]}
                            />
                        </>
                    )}
                />
            </div>
            <div className={classes.removeContainer}>
                <Button onClick={() => onRemove(index)}>
                    <AiOutlineMinus/>&nbsp;
                    <span>Удалить</span>
                </Button>
            </div>
        </div>
    )
}

export default NewsContentSection