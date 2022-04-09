import moment from "moment"
import { useTranslation } from "react-i18next"

export const useDateParse = (date) => {
    const { t } = useTranslation()

    let monthNumber = moment(date).month() + 1
    let month_string = t(`months.${monthNumber}`)

    let date_string = moment(date).date() + " " + month_string

    return date_string
}