import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css'
import {Link,Navigate} from "react-router-dom";
import {ACCESS_TOKEN} from "../http";

const Sidebar = ({isAuthorizetion}) => {

    const navigateTo = (e, path) => {
        return <Navigate to= {"/" + path}/>
            }
    const exit =(e) => {
        localStorage.removeItem(ACCESS_TOKEN);
        isAuthorizetion();
        return <Navigate to="/login"/>
    }


    return (
        <Menu>
            <a className="menu-item" href="/employees">
                Employees
            </a>
            <a className="menu-item" href="/salads">
                Animals
            </a>
            <a className="menu-item" href="/statistic">
                Stats
            </a>
            <a className="menu-item" href="/desserts" onClick={e => exit()}>
                Exit
            </a>
        </Menu>
    );
}

export default Sidebar