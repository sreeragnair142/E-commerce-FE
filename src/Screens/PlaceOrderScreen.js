import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { orderCreateAction } from '../actions/orderAction';
import CheckoutSteps from '../component/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstant';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function PlaceOrderScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    if (!cart.paymentMethod) {
        navigate("/payment")
    }

    const orderCreate = useSelector((state) => state.orderCreate)

    const { loading, error, success, order } = orderCreate

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    )

    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)

    cart.taxPrice = toPrice(0.15 * cart.itemsPrice)

    cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice
console.log(cart.totalPrice,cart.itemsPrice,cart.taxPrice,cart.shippingPrice,"allprices")

    const placeOrderHandler = () => {
        dispatch(orderCreateAction({ ...cart, cartItems: cart.cartItems }))
        console.log(cart,"crt")
    }

    useEffect(() => {
        if (success) {
            navigate(`/orders/${order.order._id}`)
            dispatch({type:ORDER_CREATE_RESET})
        }
    }, [success])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{cart.shippingAddress.Name}<br />
                                    <strong>Address:</strong>{cart.shippingAddress.Address} ,
                                    {cart.shippingAddress.City},
                                    {cart.shippingAddress.Postalcode},
                                    {cart.shippingAddress.Country}

                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>


                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cart.cartItems.map((item) => (
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img src={item.image} alt={item.name} className='small' />
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>

                                                    <div>{item.qty} X ${item.price}=${item.qty * item.price}</div>

                                                </div>


                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li><h2>Order Summary</h2></li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total</strong></div>
                                    <div><strong>${cart.totalPrice}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button onClick={placeOrderHandler} disabled={cart.cartItems.length === 0} className='primary block'>Place Order</button>
                            </li>
                            {
                                loading&&<LoadingBox></LoadingBox>
                            }
                            {
                                error&&<MessageBox message={error}/>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}