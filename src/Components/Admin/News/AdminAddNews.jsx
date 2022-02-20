import { Button, IconButton, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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

    const [newsTypeIndex, setNewsTypeIndex] = useState(1)

    const newsChemasImg = [news_schema_1, news_schema_2]

    const [newsSection, setNewsSection] = useState([
        <NewsContentSection/>
    ])

    const addSection = () => {
        const newNewsSection = [...newsSection]
        newNewsSection.push(<NewsContentSection/>)
        setNewsSection(newNewsSection)
    }

    const removeSection = (index) => {
        if(newsSection.length > 1) {
            const newNewsSection = [...newsSection]
            newNewsSection.splice(index, 1)
            setNewsSection(newNewsSection)

            const newForm = getValues()

            newForm.paragraphs.splice(index, 1)
            newForm.paragraphs_ua.splice(index, 1)
            newForm.images.splice(index, 1)

            reset({
                ...newForm
            })
        }
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    useEffect(() => {
        setValue("type", newsTypeIndex)
    }, [newsTypeIndex])

    useEffect(() => {
        reset({
            title: "",
            title_ua: "",
            type: newsTypeIndex,
            paragraphs: [],
            paragraphs_ua: [],
            images: []
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
                {newsSection.map((el, index) => (
                    <NewsContentSection control={control} key={index} index={index} onRemove={removeSection}/>
                ))}
                
                <div className={classes.addRowContainer}>
                    <IconButton onClick={addSection}>
                        <AiOutlinePlusCircle/>
                    </IconButton>
                </div>
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminAddNews