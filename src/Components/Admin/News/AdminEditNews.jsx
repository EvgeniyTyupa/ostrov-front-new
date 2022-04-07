import React, { useState } from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import Modal from '../../UI/Modal/Modal'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import Field from '../../UI/Form/Field/Field'
import AdminInput from '../../UI/Form/AdminInput'
import { Button, MenuItem } from '@mui/material'
import { useEffect } from 'react'
import CustomSelect from '../../UI/Form/Select'
import { NEWS_TYPES } from '../../../Utils/constants'
import news_schema_1 from '../../../Assets/Admin/news_schema_1.jpg'
import news_schema_2 from '../../../Assets/Admin/news_schema_2.jpg'
import NewsContentSection from './NewsContentSection/NewsContentSection'
import { AiOutlinePlusCircle } from 'react-icons/ai';

const AdminEditNews = (props) => {
    const { onClose, item, onEdit } = props
    const { handleSubmit, control, reset, getValues, setValue } = useForm()

    const [newsTypeIndex, setNewsTypeIndex] = useState(item.type)

    const newsChemasImg = [news_schema_1, news_schema_2]

    const {
        fields: paragraphsFields,
        append: paragraphsAppend,
        remove: paragraphsRemove
    } = useFieldArray({ control, name: "paragraphs" });

    const {
        fields: paragraphsUaFields,
        append: paragraphsUaAppend,
        remove: paragraphsUaRemove
    } = useFieldArray({ control, name: "paragraphs_ua" });

    const {
        fields: imagesFields,
        append: imagesAppend,
        remove: imagesRemove
    } = useFieldArray({ control, name: "images" });

    const onSubmit = (data) => {
        data.paragraphs = data.paragraphs.map(el => el.value)
        data.paragraphs_ua = data.paragraphs_ua.map(el => el.value)
        data.images = data.images.map(el => el.value[0])
        data.title = data.title.trim()
        data.title_ua = data.title_ua.trim()

        onEdit(item._id, data)
    }

    const handleClose = () => {
        onClose(null)
    }

    const addSection = () => {
        paragraphsAppend({ value: "" })
        paragraphsUaAppend({ value: ""  })
        imagesAppend({ value: null })
    }

    const removeSection = (index) => {
        if(paragraphsFields.length > 1) {
            paragraphsRemove(index)
            paragraphsUaRemove(index)
            imagesRemove(index)
        }
    }

    useEffect(() => {
        setValue("type", newsTypeIndex)
    }, [newsTypeIndex])

    useEffect(() => {
        reset({
            title: item.title || "",
            title_ua: item.title_ua || "",
            paragraphs: item.paragraphs.map((el, index) => (
                { id: index, value: el }
            )),
            paragraphs_ua: item.paragraphs_ua.map((el, index) => (
                { id: index, value: el }
            )),
            images: item.images.map((el, index) => (
                { id: index, value: el }
            ))
        })
    }, [])

    return (
        <Modal title={`Редактировать ${item.title}`} onClose={handleClose}>
            <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
                <Field className={classes.row}>
                    <Field>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Обязательное поле!" }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label="Заголовок"  
                                />
                            )}
                        />
                    </Field>
                    <Field>
                        <Controller
                            name="title_ua"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Обязательное поле!" }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label="Заголовок (УКР)"  
                                />
                            )}
                        />
                    </Field>
                </Field>
                <Field className={classes.row}>
                    <div style={{ width: "calc(50% - 13px)" }}>
                        <CustomSelect
                            onChange={(e) => setNewsTypeIndex(e.target.value)}
                            value={newsTypeIndex}
                            label="Тип"
                        >
                            {NEWS_TYPES.map(el => <MenuItem value={el} key={el}>{el}</MenuItem>)}
                        </CustomSelect>
                    </div>
                    <img src={newsChemasImg[newsTypeIndex - 1]} alt="schema" className={classes.newsSchema}/>
                </Field>
                {paragraphsFields.map((el, index) => (
                    <NewsContentSection control={control} key={el.id} index={index} onRemove={removeSection}/>
                ))}
                <div className={classes.addRowContainer}>
                    <Button onClick={addSection}>
                        <AiOutlinePlusCircle/>
                        <span>Добавить секцию</span>
                    </Button>
                </div>
                <Button className={classes.submit} type='submit'>Обновить</Button>
            </form>
        </Modal>
    )
}

export default AdminEditNews