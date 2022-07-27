import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { updateSiteInfo } from '../../../../Redux/commonReducer'
import Preloader from '../../../Common/Preloader/Preloader'
import classes from './AdminSiteInfo.module.css'
import SiteInfoSection from './SiteInfoSection/SiteInfoSection'
import { AiOutlinePlus } from 'react-icons/ai';

const AdminSiteInfo = (props) => {
    const { updateSiteInfo, siteInfo, isFetching } = props

    const { handleSubmit, control, reset } = useForm()

    const {
        fields: phonesFields,
        append: phonesAppend,
        remove: phonesRemove
    } = useFieldArray({ control, name: "phones" });

    const addSection = () => {
        phonesAppend({ value: "" })
    }

    const removeSection = (index) => {
        if(phonesFields.length > 1) {
            phonesRemove(index)
        }
    }

    const onSubmit = (data) => {
        data.phones = data.phones.map(el => el.value)
        updateSiteInfo(siteInfo[0]._id, data)
    }

    useEffect(() => {
        if(siteInfo) {
            reset({
                phones: siteInfo[0].phones.map((el, index) => (
                    { id: index, value: el }
                ))
            })
        }
    }, [siteInfo])

    return (
        <>
            {phonesFields.length > 0 &&
            <form onSubmit={handleSubmit(onSubmit)} className={classes.main}>
                {isFetching && <Preloader/>}
                <div className={classes.header}>
                    <h4>Телефоны</h4>
                    <Button onClick={addSection}>
                        <AiOutlinePlus/>
                        <span>Добавить</span>
                    </Button>
                </div>
                {phonesFields.map((el, index) => (
                    <SiteInfoSection control={control} key={el.id} index={index} onRemove={removeSection}/>
                ))}
                <Button 
                    className={classes.submitBut} 
                    type="submit"
                >
                    Сохранить
                </Button>
            </form>
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    siteInfo: state.common.siteInfo,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {
    updateSiteInfo
})(AdminSiteInfo)