import SIdebar from "../components/SIdebar";
import React from 'react'
import {employees} from "../http";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../App.css'



const Employees = ({isAuthorizetion}) => {
    const [state,setState] = React.useState([{
        email: "Loading...",
        firstName: "",
        lastName: ""
    }])

    const getUsers = async () =>{
        const getUser = await employees();
        let g = [{
            email: "",
            firstName: "",
            lastName: ""
        }]
        for(let i = 0; i < getUser.length;i++){
            g[i] = {
                email: "",
                firstName: "",
                lastName: ""
            }
            g[i].email = getUser[i].email;
            g[i].firstName = getUser[i].firstName;
            g[i].lastName = getUser[i].lastName;
        }
        setState(g)
    }
    React.useEffect(()=>{getUsers()},[])
    console.log(state);
    return(
        <div>
            <SIdebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}  isAuthorizetion={isAuthorizetion}/>

            <div className="employees-table">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>email</TableCell>
                                <TableCell align="right">first Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.map((row) => (
                                <TableRow
                                    key={row.email}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.email}
                                    </TableCell>
                                    <TableCell align="right">{row.firstName}</TableCell>
                                    <TableCell align="right">{row.lastName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    )
}
export default  Employees