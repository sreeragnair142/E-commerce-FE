import './App.css';

// import Products from './component/Products';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './Screens/SigninScreen';
import { signOut } from './actions/userAction';
import RegisterScreen from './Screens/Register';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';

function App() {

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userInfo = useSelector(state => state.userSignin)

  const signoutHandler = () => {
    dispatch(signOut())
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">A m a z o n </Link>
             {/* <img src="images/moon.png" id="icon" /> */}

          </div>
          <div>
            <Link to="/cart">Cart{cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}</Link>
            {
              userInfo.userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.userInfo.name} <i className='fa fa-caret-down'></i></Link>
                  <ul className='dropdown-content'>
                    <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                  </ul>
                </div>
              ) : (
                < Link to="/signin" >Sign In</Link>
              )
            }
          </div>
         
        </header>
        <main>
          <Routes>
            <Route path="/orders/:id" element={<OrderScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/signin/shipping" element={<ShippingAddressScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
        </main>
        <footer className="row center">
          All right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
