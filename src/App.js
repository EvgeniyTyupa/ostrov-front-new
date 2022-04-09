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
import { useEffect, useState } from 'react';
import { me } from './Redux/userReducer';
import ServerResponse from './Components/UI/ServerResponse/ServerResponse';
import star1 from './Assets/star1.svg'
import star2 from './Assets/star2.svg'
import Contacts from './Pages/Contacts/Contacts';
import CatalogContainer from './Pages/Catalog/CatalogContainer';
import NewsContainer from './Pages/News/NewsContainer';
import PostContainer from './Pages/News/Post/PostContainer';
import ActionsContainer from './Pages/Actions/ActionsContainer';
import ActionContainer from './Pages/Actions/Action/ActionContainer';
import ProfilePage from './Pages/Profile/Profile';
import AccountContainer from './Components/Profile/Account/AccountContainer';
import Settings from './Components/Profile/Settings/Settings';

const App = (props) => {
  const { 
    isOpenLogin,
    isStartData, 
    me,
    serverError,
    serverResponse
  } = props

  useEffect(() => {
    if(localStorage.usertoken && !isStartData) {
      me()
    }
  }, [localStorage.usertoken])

  return (
    <Router>
      <HttpsRedirect>
        <div className='main'>
          {!window.location.pathname.includes("admin") && <Navbar/>}
          {isOpenLogin && <LoginModal/>}
          {(serverError || serverResponse) && <ServerResponse/>}
          <Routes>
            <Route path="/admin_login" element={<AdminLogin />} />

            <Route path="/" element={<HomeContainer />} />
            <Route exact path="/item/:name" element={<ItemContainer/>}/>
            <Route exact path="/contacts" element={<Contacts/>}/>
            <Route exact path="/catalog" element={<CatalogContainer/>}/>
            <Route exact path="/blog" element={<NewsContainer/>}/>
            <Route exact path="/blog/:title" element={<PostContainer/>}/>
            <Route exact path="/actions" element={<ActionsContainer/>}/>
            <Route exact path="/actions/:title" element={<ActionContainer/>} />

            <Route exact path="profile" element={<ProfilePage/>}>
              <Route exact path="" element={<AccountContainer/>}/>
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
          {!window.location.pathname.includes("admin") && <img src={star1} alt="star" className='star1'/>}
          {(!window.location.pathname.includes("admin") && !window.location.pathname.includes("contacts")) && <img src={star2} alt="stars" className='star2'/>}
          {!window.location.pathname.includes("admin") && (
            <div className='footer'>
              <Footer/>
            </div>
          )}
        </div>
      </HttpsRedirect>
    </Router>
  )
}

let mapStateToProps = (state) => ({
  isOpenLogin: state.common.isOpenLogin,
  isStartData: state.user.isStartData,
  serverResponse: state.common.serverResponse,
  serverError: state.common.serverError
})

export default connect(mapStateToProps, {
  me
})(App);
