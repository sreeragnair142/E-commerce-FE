import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shippingCart } from '../actions/cartActions';
import CheckoutSteps from '../component/CheckoutSteps';

export default function ShippingAddressScreen() {

    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin;
    if (!userInfo) {
        navigate("/signin")
    }

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [Name, setName] = useState(shippingAddress.Name);
    const [Address, setAddress] = useState(shippingAddress.Address);
    const [City, setCity] = useState(shippingAddress.City);
    const [PostalCode, setPostalCode] = useState(shippingAddress.PostalCode);
    const [Country, setCountry] = useState(shippingAddress.Country);

    const onShippingSubmit = (e) => {
        e.preventDefault()
        dispatch(shippingCart({ Name, Address, City, PostalCode, Country }))
        navigate("/payment")
    }

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={onShippingSubmit}>
                <div>
                    <h1> Shipping Address</h1>
                </div>
                <div>
                    <label for="name">Full Name</label>
                    <input type="text" placeholder='Enter Name' value={Name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    <label for="address">Address</label>
                    <input type="text" placeholder='Enter Address'value={Address} onChange={(e) => setAddress(e.target.value)} required/>
                </div>
                <div>
                    <label for="city">City</label>
                    <input type="text" placeholder='Enter City' value={City} onChange={(e) => setCity(e.target.value)} required/>
                </div>
                <div>
                    <label for="code">Postal Code</label>
                    <input type="text" placeholder='Enter Postal Code' value={PostalCode} onChange={(e) => setPostalCode(e.target.value)} required/>
                </div>
                <div>
                    <label for="country">Country</label>
                    <input type="text" placeholder='Enter Country' value={Country} onChange={(e) => setCountry(e.target.value)} required/>
                </div>
                <div>
                    <button className='primary' type='submit'>Countinue</button>
                </div>
            </form>
        </div>
    );
}