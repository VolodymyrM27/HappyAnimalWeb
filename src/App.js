import './App.css';
import React, { useState} from 'react'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import {getCurrentUser} from "./http";
import Employees from "./pages/Employees";
import StatisticPage from "./pages/StatisticPage";

function App() {
    const [userState,setUserState] = useState({
        authenticated: false,
        currentUser: null,
    });

    const loadCurrentlyLoggedInUser = () => {
        getCurrentUser()
            .then(response => {
                setUserState({
                    authenticated: false,
                    currentUser: null,
                    loading: true});
            }).catch(error => {
            setUserState({...userState,loading:false})
        })
    }


    const isAuthorizetion =() => {
        setUserState({...userState,authenticated:!userState.authenticated});
    }
    return (
        <div>

            <BrowserRouter>
                <Routes>
                    <Route index path='*' element={<Navigate to= "/landing"></Navigate>}></Route>
                    <Route index path='/landing' element={<LandingPage  />}></Route>
                    <Route index path='/login' element={< LoginPage authenticated={userState.authenticated} isAuthorizetion={isAuthorizetion} />}></Route>
                    <Route index path='/register' element={< RegisterPage />}></Route>
                    <Route index path='/employees' element={< Employees />}></Route>
                    <Route index path='/statistic' element={< StatisticPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;