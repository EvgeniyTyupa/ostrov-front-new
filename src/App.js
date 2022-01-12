import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';

import AdminLogin from './Pages/Auth/AdminLogin/AdminLogin';
import HomeContainer from './Pages/Home/HomeContainer';
import DashboardContainer from './Components/Admin/Dashboard/DashboardContainer';
import AdminItemsContainer from './Components/Admin/Items/AdminItemsContainer';
import AdminTagsContainer from './Components/Admin/Tags/AdminTagsContainer';
import AdminRoute from './Components/Common/AdminRoute';

const App = () => {
  return (
    <Router>
      <HttpsRedirect>
        <div className='main'>
          <Routes>
            <Route path="/admin_login" element={<AdminLogin />} />

            <Route path="/" element={<HomeContainer />} />

            <Route path="admin" element={<AdminRoute/>}>
              <Route path="" element={<DashboardContainer/>} />
              <Route path="items" element={<AdminItemsContainer/>} />
              <Route path="tags" element={<AdminTagsContainer/>} />
            </Route>
          </Routes>
        </div>
      </HttpsRedirect>
    </Router>
  )
}

export default App;
