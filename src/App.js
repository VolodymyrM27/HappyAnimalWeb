import './App.css';
import React, { useState, createContext} from 'react'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Employees from "./pages/Employees";
import StatisticPage from "./pages/StatisticPage";
import AnimalPage from "./pages/AnimalPage"


export const LanguageContext = createContext({
    language: 'en',
    setLanguage: () => {},
});
function App() {
    const [userState,setUserState] = useState({
        authenticated: false,
        currentUser: null,
    });



    const [language, setLanguage] = useState('en');

    const isAuthorizetion =() => {
        setUserState({...userState,authenticated:!userState.authenticated});
    }
    return (
        <div>
            <LanguageContext.Provider value={{ language, setLanguage }}>
            <BrowserRouter>
                <Routes>

                    <Route index path='*' element={<Navigate to= "/landing"></Navigate>}></Route>
                    <Route index path='/landing' element={<LandingPage  />}></Route>
                    <Route index path='/login' element={< LoginPage authenticated={userState.authenticated} isAuthorizetion={isAuthorizetion} />}></Route>
                    <Route index path='/register' element={< RegisterPage />}></Route>
                    <Route index path='/employees' element={< Employees languageState= {language} setLanguageState= {setLanguage}/>}></Route>
                    <Route index path='/statistic' element={< StatisticPage languageState= {language} setLanguageState= {setLanguage}/>}></Route>
                    <Route index path='/animals' element={< AnimalPage languageState= {language} setLanguageState= {setLanguage}/>}></Route>

                </Routes>
            </BrowserRouter>
            </LanguageContext.Provider>
        </div>

    );
}

export default App;