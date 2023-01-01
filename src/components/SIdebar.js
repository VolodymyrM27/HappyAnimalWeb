import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css'
import {Navigate} from "react-router-dom";
import {ACCESS_TOKEN} from "../http";
import LocalizedStrings from "react-localization";
import Button from "@mui/material/Button";


let stringsText = new LocalizedStrings({
    en:{
        Employees: "Employees",
        animals:"Animals",
        statistic:"Statistic",
        Exit:"Exit"

    },
    uk: {
        Employees: "робітники",
        animals:"Тварини",
        statistic:"Статистика",
        Exit:"Вихід"
    }
});
const Sidebar = ({isAuthorizetion, languageState, setLanguageState}) => {
    stringsText.setLanguage(languageState)



    const exit =(e) => {
        localStorage.removeItem(ACCESS_TOKEN);
        isAuthorizetion();
        return <Navigate to="/login"/>
    }
    function changeLanguage(){
        if(languageState === "en"){
            setLanguageState("uk")
        }else{
            setLanguageState("en")
        }
    }

    return (
        <Menu>
            <a className="menu-item" href="/employees">
                {stringsText.Employees}
            </a>
            <a className="menu-item" href="/animals">
                {stringsText.animals}
            </a>
            <a className="menu-item" href="/statistic">
                {stringsText.statistic}
            </a>
            <a className="menu-item" href="/desserts" onClick={e => exit()}>
                {stringsText.Exit}
            </a>

            <Button  variant="outlined" onClick={changeLanguage} >uk</Button>
            <Button  variant="outlined" onClick={changeLanguage} >en</Button>
        </Menu>
    );
}

export default Sidebar