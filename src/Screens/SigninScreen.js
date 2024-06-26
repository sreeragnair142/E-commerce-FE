
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { userAction } from '../actions/userAction';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function SigninScreen() {

    const dispatch = useDispatch()
    const location = useLocation()
    let navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(userAction(Email, Password))
    }   

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const userInfo = useSelector(state => state.userSignin)

    const { loading, error } = userInfo

    useEffect(() => {
        if (userInfo.userInfo) {
            navigate(redirect)
        }
    }, [userInfo.userInfo, navigate]);

    return (
        <div>
            <form className='form' onSubmit={onSubmitHandler}>
                <div>
                    <h1>Sign in</h1>
                    {loading && <LoadingBox />}
                    {
                        error&&<MessageBox message={error}/>
                    }
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" placeholder='Enter email' onChange={(e) => { setEmail(e.target.value) }} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Enter password' onChange={(e) => { setPassword(e.target.value) }} required />
                </div>
                <div>
                    <button className='primary' type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer? <Link to={`/register?redirect=${redirect}`}>Create your acoount</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
