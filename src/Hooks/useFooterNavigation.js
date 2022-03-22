import { useTranslation } from "react-i18next"

export const useFooterNavigation = () => {
    const { t } = useTranslation()

    const items = [
        {
            title: t("navigation.footer.aboutTitle"),
            items: [
                {
                    title: t("navigation.footer.about"),
                    href: "/#about_us"
                },
                {
                    title: t("navigation.footer.news"),
                    href: "/#news"
                },
                {
                    title: t("navigation.footer.shop"),
                    href: "/contacts"
                },
                {
                    title: t("navigation.footer.career"),
                    href: "/career"
                }
            ]
        },
        {
            title: t("navigation.footer.helpTitle"),
            items: [
                {
                    title: t("navigation.footer.delivery"),
                    href: "/delivery_and_shipping"
                },
                {
                    title: t("navigation.footer.rules"),
                    href: "/rules"
                },
                {
                    title: t("navigation.footer.guarantee"),
                    href: "/guarantee_and_refund"
                },
                {
                    title: t("navigation.footer.contact"),
                    href: "/contacts"
                },
                {
                    title: t("navigation.footer.faq"),
                    href: "/FAQ"
                },
            ]
        },
        {
            title: t("navigation.footer.infoTitle"),
            items: [
                {
                    title: t("navigation.footer.gift"),
                    href: "/gift_scertificates"
                },
                {
                    title: t("navigation.footer.blog"),
                    href: "/blog"
                },
                {
                    title: t("navigation.footer.loyal"),
                    href: "/loyalty_program"
                },
            ]
        },
    ]

    return items
}