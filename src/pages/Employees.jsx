import SIdebar from "../components/SIdebar";
import React from 'react'
import {employees,deleteEmployee} from "../http";

import '../App.css'
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalTask from "../components/ModalTask"
import AddIcon from "@mui/icons-material/Add";



const Employees = ({authenticated, isAuthorizetion}) => {
    const [state,setState] = React.useState([{
        email: "Loading...",
        firstName: "",
        lastName: "",
        id: -1
    }])

    const getUsers = async () =>{
        const getUser = await employees();
        let g = [{
            email: "",
            firstName: "",
            lastName: "",
            id: -1
        }]
        for(let i = 0; i < getUser.length;i++){
            g[i] = {
                email: "",
                firstName: "",
                lastName: "",
                id: -1
            }
            g[i].email = getUser[i].email;
            g[i].firstName = getUser[i].firstName;
            g[i].lastName = getUser[i].lastName;
            g[i].id = getUser[i].id;
        }
        setState(g)
    }

    function deleteEmpl(idEmployee){

        if (window.confirm('Are you sure you want to delete this employee into the database?')) {
            deleteEmployee(idEmployee);
            console.log(state)
            console.log('Thing was deleted to the database.');
        }
        setTimeout(function() {
            getUsers();
            console.log(state)
        }, 1000);

    }

    React.useEffect(()=>{getUsers()},[])
    return(

        <div>
            <SIdebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}  isAuthorizetion={isAuthorizetion}/>
            <div className="employees-table">
                <Grid container spacing={3}>
                    {state.map((elm) => (
                        <Grid item xs={3}>
                            <Card variant="outlined">{getCard(elm.email,elm.firstName,elm.lastName, elm.id)}</Card>
                        </Grid>
                    ))}

                </Grid>

                <div className="addButton">
                    <Card variant="outlined">
                        <CardContent>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<AddIcon />}
                            >
                                Add
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )

    function getCard(email, fistName, lastName, idEmployee){
        return(
            <React.Fragment>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {email}
                    </Typography>

                    <Typography variant="body2">
                        {fistName}  {lastName}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => {deleteEmpl(idEmployee);
                        }}
                        variant="outlined" size="small" startIcon={<DeleteIcon />}>Delete</Button>
                    <ModalTask employeeId={idEmployee}/>
                </CardActions>
            </React.Fragment>
        );
    }
}
export default  Employees