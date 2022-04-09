import { useTranslation } from "react-i18next"

export const useProfileMenu = () => {
    const { t } = useTranslation()

    const items = [
        {
            href: "/profile",
            text: t("profile.menu.account")
        },
        {
            href: "/profile/liked",
            text: t("profile.menu.liked")
        },
        {
            href: "/profile/my_orders",
            text: t("profile.menu.orders")
        },
        {
            href: "/profile/viewed_items",
            text: t("profile.menu.viewed")
        },
        {
            href: "/profile/settings",
            text: t("profile.menu.settings")
        }
    ]

    return items
}