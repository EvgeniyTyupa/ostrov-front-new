import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useEffect } from 'react'
import { lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useCustomSearchParams } from '../../Hooks/useCustomSearchParams'
import AdminLogin from '../../Pages/Auth/AdminLogin/AdminLogin'
import { setCurrentLanguage } from '../../Redux/commonReducer'
import AdminActionsContainer from '../Admin/Actions/AdminActionsContainer'
import AdminBrandsContainer from '../Admin/Brands/AdminBrandsContainer'
import AdminCategoriesContainer from '../Admin/Categories/AdminCategoriesContainer'
import DashboardContainer from '../Admin/Dashboard/DashboardContainer'
import AdminItemsContainer from '../Admin/Items/AdminItemsContainer'
import AdminNewsContainer from '../Admin/News/AdminNewsContainer'
import AdminOrdersContainer from '../Admin/Orders/AdminOrdersContainer'
import AdminSettings from '../Admin/Settings/AdminSettings'
import AdminTagsContainer from '../Admin/Tags/AdminTagsContainer'
import AdminUsersContainer from '../Admin/Users/AdminUsersContainer'
import AdminRoute from '../Common/AdminRoute'

const Signup = lazy(() => import("../../Pages/Auth/Signup/Signup"))
const ActivateContainer = lazy(() => import("../../Pages/Auth/Activate/ActivateContainer"))
const ResetPasswordContainer = lazy(() => import("../../Pages/Auth/ResetPassword/ResetPasswordContainer"))

const HomeContainer = lazy(() => import("../../Pages/Home/HomeContainer"))
const ItemContainer = lazy(() => import("../../Pages/Item/ItemContainer"))
const Contacts = lazy(() => import("../../Pages/Contacts/Contacts"))
const CatalogContainer = lazy(() => import("../../Pages/Catalog/CatalogContainer"))
const NewsContainer = lazy(() => import("../../Pages/News/NewsContainer"))
const PostContainer = lazy(() => import("../../Pages/News/Post/PostContainer"))
const ActionsContainer = lazy(() => import("../../Pages/Actions/ActionsContainer"))
const ActionContainer = lazy(() => import("../../Pages/Actions/Action/ActionContainer"))
const DeliveryAndShipping = lazy(() => import("../../Pages/Info/DeliveryAndShipping/DeliveryAndShipping"))
const CareerContainer = lazy(() => import("../../Pages/Info/Career/CareerContainer"))
const Conf = lazy(() => import("../../Pages/Info/Conf/Conf"))
const Rules = lazy(() => import("../../Pages/Info/Rules/Rules"))
const ShoppingCartContainer = lazy(() => import("../../Pages/Checkout/ShoppingCart/ShoppingCartContainer"))
const CheckoutContainer = lazy(() => import("../../Pages/Checkout/Checkout/CheckoutContainer"))

const ProfilePage = lazy(() => import("../../Pages/Profile/Profile"))
const AccountContainer = lazy(() => import("../../Components/Profile/Account/AccountContainer"))
const LikedItems = lazy(() => import("../../Components/Profile/LikedItems/LikedItems"))
const MyOrdersContainer = lazy(() => import("../../Components/Profile/MyOrders/MyOrdersContainer"))
const ViewedItems = lazy(() => import("../../Components/Profile/ViewedItems/ViewedItems"))
const Settings = lazy(() => import("../../Components/Profile/Settings/Settings"))

const NotFound = lazy(() => import("../../Pages/NotFound/NofFound"))

const TransitionRoutes = (props) => {
    const { currentLanguage, setCurrentLanguage } = props

    const { t, i18n } = useTranslation()

    const location = useLocation()
    const navigate = useNavigate()

    const search = useLocation().search
    const lang = new URLSearchParams(search).get('lang')

    useEffect(() => {
        if(lang === "ru" || lang === "ua"){
            i18n.changeLanguage(lang)
            setCurrentLanguage(lang)
        }
    }, [])

    const [searchParams, setSearch] = useCustomSearchParams()

    useEffect(() => {
        if(!location.pathname.includes("admin")) {
            let query = ""
            let isEmpty = false
    
            Object.keys(searchParams).map(function(key, index) {
                if(!searchParams[key]) {
                    isEmpty = true
                }
            });
            
            Object.keys(searchParams).map(function(key, index) {
                if(key != "lang"){
                    query += index === 0 ? `?${key}=${searchParams[key]}` : `&${key}=${searchParams[key]}`
                }
            });
    
            if(query.length > 0) {
                query += `&lang=${currentLanguage}`
            }else {
                query += `?lang=${currentLanguage}`
            }
    
            
            if(!isEmpty){
                navigate(location.pathname + query)
            }
        }
    }, [location.search, currentLanguage])

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
                <Route path="/sign_up" element={<Signup/>}/>
                <Route path="/activate/:hash" element={<ActivateContainer/>}/>
                <Route path="/reset_pass/:hash" element={<ResetPasswordContainer/>}/>

                <Route path="/" element={<HomeContainer />} />
                <Route exact path="/item/:name" element={<ItemContainer/>}/>
                <Route exact path="/contacts" element={<Contacts/>}/>
                <Route exact path="/catalog" element={<CatalogContainer/>}/>
                <Route exact path="/blog" element={<NewsContainer/>}/>
                <Route exact path="/blog/:title" element={<PostContainer/>}/>
                <Route exact path="/actions" element={<ActionsContainer/>}/>
                <Route exact path="/actions/:title" element={<ActionContainer/>} />
                <Route exact path="/delivery_and_shipping" element={<DeliveryAndShipping/>} />
                <Route exact path="/confidentiality" element={<Conf/>} />
                <Route exact path="/rules" element={<Rules/>} />
                <Route exact path="/career" element={<CareerContainer/>} />

                <Route exact path="/shopping_cart" element={<ShoppingCartContainer/>}/>
                <Route exact path="/checkout" element={<CheckoutContainer/>}/>

                <Route exact path="profile" element={<ProfilePage/>}>
                    <Route exact path="" element={<AccountContainer/>}/>
                    <Route exact path="liked_items" element={<LikedItems/>}/>
                    <Route exact path="my_orders" element={<MyOrdersContainer/>}/>
                    <Route exact path="viewed_items" element={<ViewedItems/>}/>
                    <Route exact path="settings" element={<Settings/>}/>
                </Route>

                <Route path="/admin_login" element={<AdminLogin />} />

                <Route path="admin" element={<AdminRoute/>}>
                    <Route path="" element={<DashboardContainer/>} />
                    <Route path="items" element={<AdminItemsContainer/>} />
                    <Route path="tags" element={<AdminTagsContainer/>} />
                    <Route path="brands" element={<AdminBrandsContainer/>} />
                    <Route path="categories" element={<AdminCategoriesContainer/>} />
                    <Route path="posts" element={<AdminNewsContainer/>} />
                    <Route path="actions" element={<AdminActionsContainer/>} />
                    <Route path="users" element={<AdminUsersContainer/>} />
                    <Route path="orders" element={<AdminOrdersContainer/>} />
                    <Route path="settings" element={<AdminSettings/>} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {
    setCurrentLanguage
})(TransitionRoutes)