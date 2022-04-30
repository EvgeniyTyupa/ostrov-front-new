import { useTranslation } from "react-i18next"

export const useGenderTypes = () => {
    const { t } = useTranslation()

    const items = [
        {
            value: "all",
            text: t("catalog.filter.gender_all")
        },
        {
            value: "male",
            text: t("catalog.filter.male")
        },
        {
            value: "female",
            text: t("catalog.filter.female")
        }
    ]

    return items
}