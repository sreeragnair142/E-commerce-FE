
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { RegisterAction, userAction } from '../actions/userAction';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function RegisterScreen() {

    const dispatch = useDispatch()
    const location = useLocation()
    let navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (Password == ConfirmPassword) {
            dispatch(RegisterAction(Name, Email, Password))
        } else {
            alert("Password and confirm password do not matching")
        }
    }

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const userInfo = useSelector(state => state.register)

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
                    <h1>Create Account</h1>
                    {loading && <LoadingBox />}
                    {
                        error && <MessageBox message={error} />
                    }
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Enter name' onChange={(e) => { setName(e.target.value) }} required />
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
                    <label htmlFor="conformPassword">ConfirmPassword</label>
                    <input type="password" placeholder='Enter email' onChange={(e) => { setConfirmPassword(e.target.value) }} required />
                </div>
                <div>
                    <button className='primary' type="submit">Sign up</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
