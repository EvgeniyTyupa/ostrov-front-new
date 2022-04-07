import { Button, IconButton, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import classes from '../../UI/Form/AdminForm.module.css'
import AdminInput from '../../UI/Form/AdminInput'
import Field from '../../UI/Form/Field/Field'
import CustomSelect from '../../UI/Form/Select'
import Modal from '../../UI/Modal/Modal'
import { NEWS_TYPES } from '../../../Utils/constants'
import news_schema_1 from '../../../Assets/Admin/news_schema_1.jpg'
import news_schema_2 from '../../../Assets/Admin/news_schema_2.jpg'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import NewsContentSection from './NewsContentSection/NewsContentSection'

const AdminAddNews = (props) => {
    const { onClose, createNews } = props

    const { handleSubmit, control, reset, setValue, getValues } = useForm()

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

    const [newsTypeIndex, setNewsTypeIndex] = useState(1)

    const newsChemasImg = [news_schema_1, news_schema_2]

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

    const onSubmit = (data) => {
        data.paragraphs = data.paragraphs.map(el => el.value)
        data.paragraphs_ua = data.paragraphs_ua.map(el => el.value)
        data.images = data.images.map(el => el.value[0])
        data.title = data.title.trim()
        data.title_ua = data.title_ua.trim()

        createNews(data)
    }

    useEffect(() => {
        setValue("type", newsTypeIndex)
    }, [newsTypeIndex])

    useEffect(() => {
        reset({
            title: "",
            title_ua: "",
            type: newsTypeIndex,
            paragraphs: [{ id: 1, value: "" }],
            paragraphs_ua: [{ id: 1, value: "" }],
            images: [{ id: 1, value: null }]
        })
    }, [])

    return (
        <Modal title="Новая статья" onClose={onClose}>
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
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminAddNews