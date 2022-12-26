import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import {login,ACCESS_TOKEN} from '../http'
import '../App.css'
import Employees from "./Employees";


const SignInPage = ({authenticated,isAuthorizetion}) => {
    const [userLoginState, setUserLoginState] = useState({email: '', password: ''});
    if (authenticated) {
        return <Navigate to="/employees"/>
    }
    const loginUser = e => {
        e.preventDefault();
        const loginRequest = {...userLoginState};
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.token);
                isAuthorizetion();
            }).catch(error => {
            alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
        })
        setUserLoginState({email: '', password: ''});
    }
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={loginUser}>
                <p>
                    <label>email address</label><br/>
                    <input type='email'
                           value={userLoginState.email}
                           onChange={e => setUserLoginState({...userLoginState,email:e.target.value})}
                           placeholder="email"/>
                </p>
                <p>
                    <label>Password</label>

                    <br/>
                    <input type='password'
                           value={userLoginState.password}
                           onChange={e => setUserLoginState({...userLoginState,password:e.target.value})}
                           placeholder="password"/>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}

export default SignInPage
