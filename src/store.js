import { applyMiddleware, compose, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { cartReducer } from "./reducers/cartReducer"
import { orderDetailsReducer, orderPayReducer, orderReducer } from "./reducers/orderReducer"
import { productDetailReducer, produListReducer } from "./reducers/productReducer"
import { registerReducer, userReducer } from "./reducers/userReducer"

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
        paymentMethod: 'PayPal'
    },
    userSignin: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    }
}

const reducer = combineReducers({
    productList: produListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userSignin: userReducer,
    register: registerReducer,
    orderCreate: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))


export default store