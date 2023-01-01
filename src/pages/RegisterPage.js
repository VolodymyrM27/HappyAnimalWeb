import React, {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'

import '../App.css'
import {addNewEmployee} from "../http";

export default function SignUpPage() {

    const [formState, setFormState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        isEmployee: 'false'
    });

   function redirect(){
       console.log("here")
        return <Navigate to="/login"/>

    }

    const register= e => {
        e.preventDefault();
        const loginRequest = {...formState};
        console.log(loginRequest);
        addNewEmployee(loginRequest)
            .catch(error => {
                alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
            })
        setFormState({email: '',
            password: '',
            firstName: '',
            lastName: '',
            isEmployee: 'false'});

    }

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form action="/home" onSubmit={register}>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" required onChange={e => setFormState({...formState,email:e.target.value}) } />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" required onChange={e => setFormState({...formState,password:e.target.value}) }/>
                </p>
                <p>
                    <label>First Names</label><br/>
                    <input type="text" name="email" required onChange={e => setFormState({...formState,firstName:e.target.value}) }/>
                </p>
                <p>
                    <label>Last Names</label><br/>
                    <input type="" name="text" required onChange={e => setFormState({...formState,lastName:e.target.value}) }/>
                </p>


                <p>
                    <button id="sub_btn" type="submit" onSubmit={redirect}>Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
