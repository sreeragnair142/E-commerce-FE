import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SHIPPING_ITEM } from "../constants/cartConstant";

export const addToCart = (productId, qty) => async(dispatch, getState) => {

    const { data } = await Axios.get(`/api/product/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    })
    localStorage.setItem("cartItems", JSON.stringify(getState.cart.cartItems))
}


export const shippingCart = (data) => (dispatch, getState) => {
    dispatch({ type: CART_SHIPPING_ITEM, payload: data })
    localStorage.setItem("shippingAddress", JSON.stringify(data))
}


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
}