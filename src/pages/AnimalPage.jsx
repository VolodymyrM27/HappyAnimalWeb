import SIdebar from "../components/SIdebar";
import React from 'react'
import {animals, deleteAnimal} from "../http";

import '../App.css'
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalHistoryAnimal from "../components/ModalHistoryAnimal";
import AddNewAnimal from "../components/AddNewAnimal";
import LocalizedStrings from "react-localization";

let stringsText = new LocalizedStrings({
    en:{
        name: "name",
        height: "height",
        weight: "weight",
        months: "months",
        type: "type",
        healthStatus: "healthStatus",
        breed: "breed",
        messageMaim: "Create New User",
        messageNotMain: "Please enter the following information:",
        Delete:"Delete"
    },
    uk: {
        name: "Імʼя",
        height: "ріст",
        weight: "вага",
        months: "місяців",
        type: "тип",
        healthStatus: "Стан здоровʼя",
        breed: "порода",
        messageMaim: "створити нову тварину",
        messageNotMain: "Будь Ласка введіть наступну інфу: ",
        Delete:"Видалити"
    }
});

const Employees = ({ isAuthorizetion, languageState, setLanguageState}) => {
    stringsText.setLanguage(languageState)

    const [state,setState] = React.useState([{
        name: "Loading...",
        height: "",
        weight: "",
        months: -1,
        type: "",
        healthStatus: "",
        breed:"",
        id: -1
    }])

    const getAnimals= async () =>{
        const getUser = await animals();
        let g = [{
            name: "Loading...",
            height: "",
            weight: "",
            months: -1,
            type: "",
            healthStatus: "",
            breed:"",
            id: -1
        }]
        for(let i = 0; i < getUser.length;i++){
            g[i] = {
                name: "Loading...",
                height: "",
                weight: "",
                months: -1,
                type: "",
                healthStatus: "",
                breed:"",
                id: -1
            }
            g[i].name = getUser[i].name;
            g[i].height = getUser[i].height;
            g[i].weight = getUser[i].weight;
            g[i].months = getUser[i].months;
            g[i].type = getUser[i].type;
            g[i].healthStatus = getUser[i].healthStatus;
            g[i].breed = getUser[i].breed;
            g[i].id = getUser[i].id;
        }
        setState(g)
    }

    function deleteAnimals(idAnimal){

        if (window.confirm('Are you sure you want to delete this employee into the database?')) {
            deleteAnimal(idAnimal);
            console.log(state)
            console.log('Thing was deleted to the database.');
        }
        setTimeout(function() {
            getAnimals();
            console.log(state)
        }, 1000);

    }


    React.useEffect(()=>{getAnimals()},[])
    return(

        <div>
            <SIdebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}  isAuthorizetion={isAuthorizetion} languageState={languageState} setLanguageState={setLanguageState}/>
            <div className="employees-table">
                <Grid container spacing={3}>
                    {state.map((elm) => (
                        <Grid item xs={3}>
                            <Card variant="outlined">{getCard(elm.name,elm.height,elm.weight, elm.months, elm.type, elm.healthStatus, elm.breed, elm.id)}</Card>
                        </Grid>
                    ))}

                </Grid>

                <div className="addButton">
                    <Card variant="outlined">
                        <CardContent>


                            <AddNewAnimal languageState={languageState}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )


    function getCard(name, height, weight, months,type,healthStatus,breed,id){
        return(
            <React.Fragment>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {stringsText.name} {name}
                    </Typography>

                    <Typography variant="body2">
                        {type} {stringsText.breed}: {breed}
                    </Typography>

                    <Typography variant="body2">
                        {stringsText.height}:  {height}  {stringsText.weight}: {weight}


                    </Typography>

                    <Typography variant="body2">


                        {stringsText.months}: {months}
                    </Typography>
                    <Typography variant="body2">
                        {stringsText.healthStatus}: {healthStatus}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => {deleteAnimals(id);
                        }}
                        variant="outlined" size="small" startIcon={<DeleteIcon />}>{stringsText.Delete}</Button>
                    <ModalHistoryAnimal animalId={id} languageState={languageState}/>
                </CardActions>
            </React.Fragment>
        );
    }
}
export default  Employees