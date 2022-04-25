import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedBlock from '../../../Components/Animation/AnimatedBlock/AnimatedBlock'
import Breadcrumbs from '../../../Components/Common/Breadcrumbs/Breadcrumbs'
import DateCountdown from '../../../Components/Common/DateCountdown/DateCountdown'
import SmallItemsList from '../../../Components/Common/Items/SmallItemsList/SmallItemsList'
import MaxWidthContainer from '../../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../Components/UI/Container/PaddingContainer/PaddingContainer'
import { useDateParse } from '../../../Hooks/useDateParse'
import classes from './Action.module.css'

const Action = (props) => {
    const { action, currentLanguage } = props
    
    const { t } = useTranslation()

    const breadcrumbsItems = [{
        href: "/actions",
        title: t("navigation.actions")
    }]

    let start = useDateParse(action.start)
    let end = useDateParse(action.end)

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <Breadcrumbs items={breadcrumbsItems} active={currentLanguage === "ru" ? action.title : action.title_ua}/>
                <AnimatedBlock className={classes.content}>
                    <div className={classes.imageContainer}>
                        <img src={action.image} alt="title_image"/>
                    </div>
                    <div className={classes.info}>
                        <h4>{currentLanguage === "ru" ? action.title : action.title_ua}</h4>
                        <span className={classes.dateRange}>{start} - {end}</span>
                        {(action.description && action.description_ua) && <div className={classes.description}>
                            {action[currentLanguage === "ru" ? "description" : "description_ua"].split("\n").map(el => (
                                <p key={el} className={classes.text}>{el}</p>
                            ))}
                        </div>}
                        <label>{t("event.countdownTitle")}:</label>
                        <div className={classes.countdown}>
                            <DateCountdown date={action.end} currentLanguage={currentLanguage}/>
                        </div>
                    </div>
                </AnimatedBlock>
                <SmallItemsList
                    items={action.items}
                    title={t("event.items")}
                    href={`/catalog?pageNumber=1&pageSize=25&searchBy=action&from=asc&searchValue=${action._id}`}
                    slidesToShow={action.items.length > 4 ? 5 : action.items.length}
                />
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Action