import { useTranslation } from "react-i18next"

export const useChildAge = () => {
    const { t } = useTranslation()

    const items = [
        {
            value: [0, 0],
            text: t("selector.ages.0")
        },
        {
            value: [1, 2],
            text: t("selector.ages.1")
        },
        {
            value: [3, 5],
            text: t("selector.ages.2")
        },
        {
            value: [6, 9],
            text: t("selector.ages.3")
        },
        {
            value: [10, 12],
            text: t("selector.ages.4")
        },
        {
            value: [13, 17],
            text: t("selector.ages.5")
        }
    ]

    return items
}