import { useTranslation } from "react-i18next"

export const useSortableFields = () => {
    const { t } = useTranslation()

    const items = [
        {
            text: t("catalog.sort.default"),
            searchBy: "popular",
        },
        {
            text: t("catalog.sort.highPrice"),
            searchBy: "price_high",
        },
        {
            text: t("catalog.sort.lowPrice"),
            searchBy: "price_low",
        },
        {
            text: t("catalog.sort.new"),
            searchBy: "created_at",
        },
        {
            text: t("catalog.sort.action"),
            searchBy: "action",
        }
    ]

    return items
}