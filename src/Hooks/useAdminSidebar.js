import { MdDashboard, MdCategory, MdBrandingWatermark, MdEvent } from 'react-icons/md';
import { FaShoppingBag, FaTags, FaNewspaper } from 'react-icons/fa';

export const useAdminSidebar = () => {
    const items = [
        {
            title: "Главная",
            icon: <MdDashboard/>,
            href: "/admin"
        },
        {
            title: "Товары",
            icon: <FaShoppingBag/>,
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
    ]

    return items
}