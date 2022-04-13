import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import ProfileLayout from '../../UI/ProfileLayout/ProfileLayout'
import ViewedItem from './ViewedItem/ViewedItem'
import classes from './ViewedItems.module.css'

const ViewedItems = (props) => {
    const { currentLanguage } = props

    const { t } = useTranslation()

    const [items, setItems] = useState([])

    useEffect(() => {
        let viewed_items = localStorage.getItem('viewed_items');
        
        let parsed_items = JSON.parse(viewed_items)

        setItems(parsed_items)
    }, [])

    return (
        <ProfileLayout title={t("profile.menu.viewed")}>
            <div className={classes.main}>
                <div className={classes.wrapper}>
                    {items ? items.reverse().map(el => (
                        <ViewedItem
                            key={el._id}
                            currentLanguage={currentLanguage}
                            item={el}
                        />
                    )) :
                        <p className={classes.empty}>{t("profile.viewed_empty")}</p>
                    }
                </div>
            </div>
        </ProfileLayout>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {})(ViewedItems)