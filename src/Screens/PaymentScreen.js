import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../component/CheckoutSteps';

function PaymentScreen() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [PaymentMethod, setPaymentMethod] = useState("PayPal");

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(PaymentMethod))
        navigate("/placeorder")
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div>
                <div>
                    <form className="form" onSubmit={submitHandler}>
                        <div>
                            <h1>Payment Method</h1>
                        </div>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="paypal"
                                    value={PaymentMethod}
                                    name="paymentMethod"
                                    required
                                    checked
                                    onChange={(e) => setPaymentMethod('PayPal')}
                                ></input>
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="stripe"
                                    value={PaymentMethod}
                                    name="paymentMethod"
                                    required
                                    onChange={(e) => setPaymentMethod('Stripe')}
                                ></input>
                                <label htmlFor="stripe">Stripe</label>
                            </div>
                        </div>
                        <div>
                            <label />
                            <button className="primary" type="submit">
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default PaymentScreen;