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
            href: "/admin"
        },
        {
            title: "Товары",
            icon: <IoGameController/>,
            href: "/admin/items"
        },
        {
            title: "Категории",
            icon: <MdCategory/>,
            href: "/admin/categories"
        },
        {
            title: "Бренды",
            icon: <MdBrandingWatermark/>,
            href: "/admin/brands"
        },
        {
            title: "Теги",
            icon: <FaTags/>,
            href: "/admin/tags"
        },
        {
            title: "Новости",
            icon: <FaNewspaper/>,
            href: "/admin/posts"
        },
        {
            title: "Акции",
            icon: <MdEvent/>,
            href: "/admin/actions"
        },
        {
            title: "Пользователи",
            icon: <HiUsers/>,
            href: "/admin/users"
        },
        {
            title: "Заказы",
            icon: <FaMoneyBillAlt/>,
            href: "/admin/orders"
        },
        {
            title: "Настройки",
            icon: <IoMdSettings/>,
            href: "/admin/settings"
        },
    ]

    return items
}