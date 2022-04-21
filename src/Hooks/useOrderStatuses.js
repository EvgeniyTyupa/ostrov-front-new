import { useTranslation } from "react-i18next"

export const useOrderStatuses = () => {
    const { t } = useTranslation()

    const items = [
        {
            value: "new",
            backgroundColor: "#4B5EA3",
            text: t("orders.statuses.new")
        },
        {
            value: "sended",
            backgroundColor: "goldenrod",
            text: t("orders.statuses.sended")
        },
        {
            value: "received",
            backgroundColor: "green",
            text: t("orders.statuses.received")
        },
        {
            value: "canceled",
            backgroundColor: "tomato",
            text: t("orders.statuses.canceled")
        },
        {
            value: "refund",
            backgroundColor: "tomato",
            text: t("orders.statuses.refund")
        },
        {
            value: "paid",
            backgroundColor: "green",
            text: t("orders.statuses.paid")
        },
        {
            value: "not_paid",
            backgroundColor: "tomato",
            text: t("orders.statuses.not_paid")
        }
    ]

    return items
}