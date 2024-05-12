import './App.css';
import Home from './Screens/Home';
import GetProduct from './Screens/GetProduct';
import Cart from './Screens/Cart';
import ShippingDetails from './Screens/ShippingDetails';
import CheckShippingDetails from './Screens/CheckShippingDetails';
import Login from './Screens/Login';
import Regsiteration from './Screens/Regsiteration';
import ConfirmOrder from './Screens/ConfirmOrder';
import Orders from './Screens/Orders';
import AdminPanel from './Screens/AdminPanel';
import Profile from './Screens/Profile';
import OrderList from './Screens/OrderList';
import Users from './Screens/Users';
import AddProducts from './Screens/AddProducts';
import Products from './Screens/Products';
import UpdateProduct from './Screens/UpdateProduct';
import Success from './Screens/Success';
import Error from './Screens/Error';
import ForgetPassword from './Screens/ForgetPassword';
import ResetPassword from './Screens/ResetPassword';
import Feedback from './Screens/Feedback';
import ViewFeedback from './Screens/ViewFeedback';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Regsiteration" element={<Regsiteration />} />
          <Route exact path='/ForgetPassword' element={<ForgetPassword />} />
          <Route exact path='/ResetPassword/:userId' element={<ResetPassword />} />
          <Route exact path="/GetProduct/:id" element={<GetProduct />} />
          <Route exact path="/ConfirmOrder" element={<ConfirmOrder />} />
          <Route exact path="/Orders" element={<Orders />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/OrderList" element={<OrderList />} />
          <Route exact path="/Users" element={<Users />} />
          <Route exact path='/AdminPanel' element={<AdminPanel />} />
          <Route exact path="/Products" element={<Products />} />
          <Route exact path="/UpdateProduct/:id" element={<UpdateProduct />} />
          <Route exact path="/Success" element={<Success />} />
          <Route exact path="/Error" element={<Error />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/CheckShippingDetails" element={<CheckShippingDetails />} />
          <Route exact path="/AddProducts" element={<AddProducts />} />
          <Route exact path="/ShippingDetails" element={<ShippingDetails />} />
          <Route exact path='/Feedback' element={<Feedback />} />
          <Route exact path='/ViewFeedback' element={<ViewFeedback />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
