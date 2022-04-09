import React from "react"
import { useNavigate } from "react-router-dom"
import { useDateParse } from "../../../../Hooks/useDateParse"
import classes from './ActionSmallItem.module.css'

const ActionSmallItem = (props) => {
    const { action, currentLanguage } = props

    const navigate = useNavigate()

    let start = useDateParse(action.start)
    let end = useDateParse(action.end)

    let title = currentLanguage === "ru" ? action.title : action.title_ua

    const onClick = () => {
        navigate(`/actions/${title}`)
    }

    return (
        <div className={classes.main}>
            <img src={action.image} alt="action" onClick={onClick}/>
            <span>{start} - {end}</span>
            <p onClick={onClick}>{title}</p>
        </div>
    )
}

export default ActionSmallItem