import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { addComment } from '../../../../../Redux/commentsReducer'
import { setIsOpenLogin } from '../../../../../Redux/commonReducer'
import AdminInput from '../../../../UI/Form/AdminInput'
import Modal from '../../../../UI/Modal/Modal'
import classes from './CommentForm.module.css'

const CommentForm = (props) => {
    const { 
        isAuth,
        user,
        currentItem,
        addComment,
        setIsOpenLogin
    } = props

    const { t } = useTranslation()

    const { handleSubmit, control, reset } = useForm()

    const [isOpen, setIsOpen] = useState(false)
    const [rating, setRating] = useState(80)

    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const onSubmit = (data) => {
        switch(rating) {
            case 20: {
                data.rating = 1
                break
            }
            case 40: {
                data.rating = 2
                break
            }
            case 60: {
                data.rating = 3
                break
            }
            case 80: {
                data.rating = 4
                break
            }
            case 100: {
                data.rating = 5
                break
            }
        }
        data.user_id = user._id
        data.item_id = currentItem._id

        addComment(data)
    }

    useEffect(() => {
        reset({
            text: "",
            rating: rating
        })
    }, [])

    return (
        <div className={classes.main}>
            {isAuth ?
                <div className={classes.review}>
                    {isOpen &&
                    <Modal onClose={handleIsOpen} title={t("items.reviews.openFormButt")}>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="text"
                                control={control}
                                defaultValue=""
                                rules={{ required: t("errors.required") }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AdminInput
                                        onChange={onChange}
                                        value={value}
                                        error={error}
                                        label="Текст..."
                                        multiline={true}
                                        rows={4}
                                    />
                                )}
                            />
                            <div className={classes.container}>
                                <div className={classes.rating}>
                                    <label>{t("items.reviews.ratingLabel")}:</label>
                                    <Rating 
                                        ratingValue={rating}
                                        onClick={rate => setRating(rate)}
                                        size={"22px"}
                                    />
                                </div>
                                <Button className={classes.submit} type="submit">{t("items.reviews.submit")}</Button>
                            </div>
                        </form>
                    </Modal>}
                    <Button className={classes.commentBut} onClick={handleIsOpen}>{t("items.reviews.openFormButt")}</Button>
                </div>
                :
                <div className={classes.auth}>
                    <p>{t("auth.authText")}</p>
                    <button onClick={() => setIsOpenLogin(true)}>{t("auth.enter")}</button>
                </div>
            }
        </div>
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
    user: state.user.user,
    currentItem: state.items.currentItem
})

export default connect(mapStateToProps, {
    addComment,
    setIsOpenLogin
})(CommentForm)