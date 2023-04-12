import { MdDashboard, MdCategory, MdBrandingWatermark, MdEvent } from 'react-icons/md';
import { FaTags, FaNewspaper, FaMoneyBillAlt } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { IoGameController } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';

export const useAdminSidebar = () => {
    const items = [
        {
            title: "Главная",
            icon: <MdDashboard/>,
            href: "/config_toys"
        },
        {
            title: "Товары",
            icon: <IoGameController/>,
            href: "/config_toys/items"
        },
        {
            title: "Категории",
            icon: <MdCategory/>,
            href: "/config_toys/categories"
        },
        {
            title: "Бренды",
            icon: <MdBrandingWatermark/>,
            href: "/config_toys/brands"
        },
        {
            title: "Теги",
            icon: <FaTags/>,
            href: "/config_toys/tags"
        },
        {
            title: "Новости",
            icon: <FaNewspaper/>,
            href: "/config_toys/posts"
        },
        {
            title: "Акции",
            icon: <MdEvent/>,
            href: "/config_toys/actions"
        },
        {
            title: "Пользователи",
            icon: <HiUsers/>,
            href: "/config_toys/users"
        },
        {
            title: "Заказы",
            icon: <FaMoneyBillAlt/>,
            href: "/config_toys/orders"
        },
        {
            title: "Настройки",
            icon: <IoMdSettings/>,
            href: "/config_toys/settings"
        },
    ]

    return items
}