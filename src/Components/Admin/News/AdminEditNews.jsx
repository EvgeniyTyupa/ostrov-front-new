import React, { useState } from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import Modal from '../../UI/Modal/Modal'
import { useForm, Controller } from 'react-hook-form'
import Field from '../../UI/Form/Field/Field'
import AdminInput from '../../UI/Form/AdminInput'
import { Button, MenuItem } from '@mui/material'
import DropZone from '../../Common/DropZone/DropZone'
import { useEffect } from 'react'
import CustomSelect from '../../UI/Form/Select'
import { NEWS_TYPES } from '../../../Utils/constants'
import news_schema_1 from '../../../Assets/Admin/news_schema_1.jpg'
import news_schema_2 from '../../../Assets/Admin/news_schema_2.jpg'

const AdminEditNews = (props) => {
    const { onClose, item } = props
    const { handleSubmit, control, reset, getValues, setValue } = useForm()

    const [newsTypeIndex, setNewsTypeIndex] = useState(item.type)

    const newsChemasImg = [news_schema_1, news_schema_2]

    const onSubmit = (data) => {
        console.log(data)
    }

    const handleClose = () => {
        onClose(null)
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
            </form>
        </Modal>
    )
}

export default AdminEditNews