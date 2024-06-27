import Axios from "axios"
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/useConstant"

export const userAction = (email, password) => async(dispatch) => {

    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })

    try {

        const user = await Axios.post('https://e-commerce-backend-22.onrender.com/api/users/signin', { email, password })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: user.data })
        localStorage.setItem("userInfo", JSON.stringify(user.data))

    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message })
    }
}

export const RegisterAction = (name, email, password) => async(dispatch) => {

    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } })

    try {

        const user = await Axios.post('https://e-commerce-backend-22.onrender.com/api/users/signup', { name, email, password })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: user.data })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: user.data })
        localStorage.setItem("userInfo", JSON.stringify(user.data))

    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
    }
}

export const signOut = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    dispatch({ type: USER_SIGNOUT })
}