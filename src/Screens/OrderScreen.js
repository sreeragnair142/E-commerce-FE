import React, { useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { detailsOrder, payOrder } from '../actions/orderAction';
import Axios from 'axios';

export default function OrderScreen() {

    const dispatch = useDispatch()
    const { id } = useParams();

    const [sdkReady, setsdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails)

    const { loading, error, success, order } = orderDetails


    const orderPay = useSelector((state) => state.orderPay)
    const { error: errorPay, success: successPay, loading: loadingPay } = orderPay

    useEffect(() => {

        const addPaypalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www/paypal.com/sdk/js?client-id=${data}`
            script.async = true;
            script.onload = () => {
                setsdkReady(true)
            }

            document.body.appendChild(script)
        }

        if (!order || successPay || (order._id !== id)) {
            dispatch(detailsOrder(id))
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPaypalScript()
                } else {
                    setsdkReady(true)
                }
            }
        }

    }, [dispatch, order, id, sdkReady])



    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }


    return loading ? (<LoadingBox />) : error ? <MessageBox message={error.message} /> : (
        <div>
            <h2>Order {order._id}</h2>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{order.shippingAddress.Name}<br />
                                    <strong>Address:</strong>{order.shippingAddress.Address} ,
                                    {order.shippingAddress.City},
                                    {order.shippingAddress.Postalcode},
                                    {order.shippingAddress.Country}

                                </p>
                                {
                                    order.isDelivered ? (
                                        <MessageBox message={order.isDelivered} varient="success">Delivered at</MessageBox>
                                    ) :
                                        <MessageBox message="Not Delivered" varient="danger"></MessageBox>
                                }
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>{order.paymentMethod}
                                </p>
                                {
                                    order.isPaid ? (
                                        <MessageBox message={order.isPaid} varient="success">Delivered at</MessageBox>
                                    ) :
                                        <MessageBox message="Not Paid" varient="danger"></MessageBox>
                                }
                            </div>
                        </li>


                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        order.orderItems.map((item) => (
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
                                    <div>${order.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total</strong></div>
                                    <div><strong>${order.totalPrice}</strong></div>
                                </div>
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {
                                            sdkReady ? <LoadingBox /> :
                                                <>
                                                    {errorPay && <MessageBox message={errorPay}></MessageBox>}
                                                    {loadingPay && <LoadingBox />}
                                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                                                </>
                                        }   
                                    </li>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}