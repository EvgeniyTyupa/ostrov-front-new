import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';

import AdminLogin from './Pages/Auth/AdminLogin/AdminLogin';
import HomeContainer from './Pages/Home/HomeContainer';
import DashboardContainer from './Components/Admin/Dashboard/DashboardContainer';
import AdminItemsContainer from './Components/Admin/Items/AdminItemsContainer';
import AdminTagsContainer from './Components/Admin/Tags/AdminTagsContainer';
import AdminRoute from './Components/Common/AdminRoute';
import AdminBrandsContainer from './Components/Admin/Brands/AdminBrandsContainer';
import AdminCategoriesContainer from './Components/Admin/Categories/AdminCategoriesContainer';
import AdminNewsContainer from './Components/Admin/News/AdminNewsContainer';
import AdminActionsContainer from './Components/Admin/Actions/AdminActionsContainer';
import Navbar from './Components/Common/Navbar/Navbar';
import Footer from './Components/Common/Footer/Footer';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ItemContainer from './Pages/Item/ItemContainer';
import NotFound from './Pages/NotFound/NofFound';
import { connect } from 'react-redux';
import LoginModal from './Components/Auth/LoginModal';
import { useEffect } from 'react';
import { me } from './Redux/userReducer';

import Contacts from './Pages/Contacts/Contacts';
import CatalogContainer from './Pages/Catalog/CatalogContainer';
import NewsContainer from './Pages/News/NewsContainer';
import PostContainer from './Pages/News/Post/PostContainer';
import ActionsContainer from './Pages/Actions/ActionsContainer';
import ActionContainer from './Pages/Actions/Action/ActionContainer';
import ProfilePage from './Pages/Profile/Profile';
import AccountContainer from './Components/Profile/Account/AccountContainer';
import Settings from './Components/Profile/Settings/Settings';
import LikedItems from './Components/Profile/LikedItems/LikedItems';
import MyOrders from './Components/Profile/MyOrders/MyOrders';
import ViewedItems from './Components/Profile/ViewedItems/ViewedItems';
import Signup from './Pages/Auth/Signup/Signup';
import StarOne from './Components/UI/Decor/StartOne/StarOne';
import StarTwo from './Components/UI/Decor/StarTwo/StarTwo';
import ActivateContainer from './Pages/Auth/Activate/ActivateContainer';
import ForgotPassModal from './Components/Auth/ForgotPassModal';
import ResetPasswordContainer from './Pages/Auth/ResetPassword/ResetPasswordContainer';
import ShoppingCartResult from './Components/Common/ShoppingCart/ShoppingCartResult/ShoppingCartResult';
import { getCartItems, setCartItems, setTotalCount, setTotalSum } from './Redux/cartReducer';
import { discountParser } from './Utils/discountParser';
import ShoppingCartContainer from './Pages/Checkout/ShoppingCart/ShoppingCartContainer';
import { getViewedItems, setViewedItems } from './Redux/itemsReducer';

const App = (props) => {
  const { 
    isOpenLogin,
    me,
    isAuth,
    isOpenForgotPassModal,
    addToCartResult,
    cartItems,
    setTotalCount,
    setTotalSum,
    totalSumCart,
    totalCountCart,
    setCartItems,
    viewedItems,
    setViewedItems,
    getViewedItems,
    getCartItems
  } = props

  useEffect(() => {
    let newCount = 0
    let newTotalSum = 0

    let newItems = [...cartItems]

    newItems.forEach((el, index) => {
      if(el.count > 0) {
        newCount += el.count
        if(el.item.in_action && el.item.from_sum_in_bill === 0 && !el.item.from_items_count) {
          newTotalSum += Number(discountParser(el.item.price, el.item.discount).replace(/ /g,'')) * el.count
        }else {
          newTotalSum += Number(el.item.price) * el.count
        }
      }else {
        newItems.splice(index, 1)
        if(newItems.length === 0) {
          localStorage.setItem('shopping_cart', JSON.stringify(newItems))
        }
        setCartItems(newItems)
      }
    })
    if(newItems.length > 0) {
      localStorage.setItem('shopping_cart', JSON.stringify(newItems))
    }

    setTotalCount(newCount)
    setTotalSum(newTotalSum)
  }, [cartItems])

  useEffect(() => {
    if(viewedItems.length > 0){
      let ids = []
      viewedItems.forEach(el => {
        ids.push(el._id)
      })
      localStorage.setItem('viewed_items', JSON.stringify(ids))
    }
  }, [viewedItems])

  useEffect(() => {
    let viewed_items = localStorage.getItem('viewed_items')
    let parsed_items = JSON.parse(viewed_items)
    
    if(parsed_items){
      getViewedItems(parsed_items)
    }
  }, [])

  useEffect(() => {
    let cart_items = localStorage.getItem('shopping_cart')
    let parsed_items = JSON.parse(cart_items)

    if(parsed_items) {
      let ids = []
      parsed_items.forEach(el => {
        ids.push(el.item._id)
      })
      if(ids.length > 0) {
        getCartItems(ids)
      }
    }
  }, [])

  useEffect(() => {
    if(localStorage.usertoken) {
      me()
    }
  }, [localStorage.usertoken, isAuth])

  return (
    <Router>
      <HttpsRedirect>
        <div className='main'>
          <Navbar/>
          {isOpenLogin && <LoginModal/>}
          {isOpenForgotPassModal && <ForgotPassModal/>}
          {addToCartResult && <ShoppingCartResult/>}
          <Routes>
            <Route path="/admin_login" element={<AdminLogin />} />
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

            <Route exact path="/shopping_cart" element={<ShoppingCartContainer/>}/>

            <Route exact path="profile" element={<ProfilePage/>}>
              <Route exact path="" element={<AccountContainer/>}/>
              <Route exact path="liked_items" element={<LikedItems/>}/>
              <Route exact path="my_orders" element={<MyOrders/>}/>
              <Route exact path="viewed_items" element={<ViewedItems/>}/>
              <Route exact path="settings" element={<Settings/>}/>
            </Route>

            <Route path="admin" element={<AdminRoute/>}>
              <Route path="" element={<DashboardContainer/>} />
              <Route path="items" element={<AdminItemsContainer/>} />
              <Route path="tags" element={<AdminTagsContainer/>} />
              <Route path="brands" element={<AdminBrandsContainer/>} />
              <Route path="categories" element={<AdminCategoriesContainer/>} />
              <Route path="posts" element={<AdminNewsContainer/>} />
              <Route path="actions" element={<AdminActionsContainer/>} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
          <StarOne/>
          <StarTwo/>
          <div className='footer'>
            <Footer/>
          </div>
        </div>
      </HttpsRedirect>
    </Router>
  )
}

let mapStateToProps = (state) => ({
  isOpenLogin: state.common.isOpenLogin,
  isStartData: state.user.isStartData,
  isAuth: state.user.isAuth,
  isOpenForgotPassModal: state.common.isOpenForgotPassModal,
  addToCartResult: state.cart.addToCartResult,
  totalCountCart: state.cart.totalCount,
  totalSumCart: state.cart.totalSum,
  cartItems: state.cart.items,
  viewedItems: state.items.viewedItems
})

export default connect(mapStateToProps, {
  me,
  setTotalCount,
  setTotalSum,
  setCartItems,
  setViewedItems,
  getViewedItems,
  getCartItems
})(App);
