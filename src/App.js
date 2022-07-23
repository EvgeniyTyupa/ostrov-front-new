import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';

import Navbar from './Components/Common/Navbar/Navbar';
import Footer from './Components/Common/Footer/Footer';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { connect } from 'react-redux';
import LoginModal from './Components/Auth/LoginModal';
import { Suspense, useEffect } from 'react';
import { me, setIsBlocked, setNotActivated } from './Redux/userReducer';

import StarOne from './Components/UI/Decor/StartOne/StarOne';
import StarTwo from './Components/UI/Decor/StarTwo/StarTwo';
import ForgotPassModal from './Components/Auth/ForgotPassModal';
import ShoppingCartResult from './Components/Common/ShoppingCart/ShoppingCartResult/ShoppingCartResult';
import { getCartItems, setActionDiscount, setCartItems, setGift, setTotalCount, setTotalSum } from './Redux/cartReducer';
import { discountParser } from './Utils/discountParser';
import { getViewedItems, setViewedItems } from './Redux/itemsReducer';
import ScrollToTop from './Components/Common/Scroll/ScrollToTop';
import ScrollToHash from './Components/Common/Scroll/ScrollToHash';
import { useCheckActionConditions } from './Hooks/useCheckActionConditions';
import SomeInfoModal from './Components/Modals/SomeInfoModal/SomeInfoModal';
import TransitionRoutes from './Components/Animation/TransitionRoutes';
import Preloader from './Components/Common/Preloader/Preloader';
import { getMainCategoriesWithChildren } from './Redux/categoryReducer';
import NotActivatedModal from './Components/Modals/NotActivatedModal/NotActivatedModal';
import { getSiteInfo } from './Redux/commonReducer';
import { setPaymentUrl } from './Redux/ordersReducer';

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
    getViewedItems,
    getCartItems,
    setActionDiscount,
    setGift,
    isBlocked,
    serverMessage,
    setIsBlocked,
    getMainCategoriesWithChildren,
    notActivated,
    setNotActivated,
    getSiteInfo,
    paymentUrl,
    setPaymentUrl
  } = props

  const { actionDiscount, gift } = useCheckActionConditions(cartItems, totalSumCart, totalCountCart)

  useEffect(() => {
    setActionDiscount(actionDiscount)
    setGift(gift)
  }, [totalCountCart])

  useEffect(() => {
    let newCount = 0
    let newTotalSum = 0

    let newItems = [...cartItems]

    newItems.forEach((el, index) => {
      if(el.count > 0) {
        newCount += el.count
        if(el.item.action && el.item.action.from_sum_in_bill === 0 && !el.item.action.from_items_count) {
          newTotalSum += Number(discountParser(el.item.price, el.item.action.discount).replace(/ /g,'')) * el.count
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

  useEffect(() => {
    if(paymentUrl) {
      console.log(paymentUrl)
      Object.assign(document.createElement('a'), {
        target: '_blank',
        href: paymentUrl,
      }).click();
      // setPaymentUrl(null)
    }
  }, [paymentUrl])

  useEffect(() => {
    getSiteInfo()
    getMainCategoriesWithChildren()
  }, [])

  return (
    <Router>
      <HttpsRedirect>
        <ScrollToTop>
          <ScrollToHash>
            <div className='main'>
              <Navbar/>
              {isOpenLogin && <LoginModal/>}
              {isOpenForgotPassModal && <ForgotPassModal/>}
              {addToCartResult && <ShoppingCartResult/>}
              {isBlocked && <SomeInfoModal text={serverMessage} onClose={() => setIsBlocked(false)}/>}
              {notActivated && <NotActivatedModal onClose={() => setNotActivated(false)}/>}
              <Suspense fallback={<Preloader/>}>
                <TransitionRoutes/>
              </Suspense>
              <StarOne/>
              <StarTwo/>
              <div className='footer'>
                <Footer/>
              </div>
            </div>
          </ScrollToHash>
        </ScrollToTop>
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
  viewedItems: state.items.viewedItems,
  isBlocked: state.user.isBlocked,
  serverMessage: state.common.serverMessage,
  notActivated: state.user.notActivated,
  paymentUrl: state.orders.paymentUrl
})

export default connect(mapStateToProps, {
  me,
  setTotalCount,
  setTotalSum,
  setCartItems,
  setViewedItems,
  getViewedItems,
  getCartItems,
  setActionDiscount,
  setGift,
  setIsBlocked,
  getMainCategoriesWithChildren,
  setNotActivated,
  getSiteInfo,
  setPaymentUrl
})(App);
