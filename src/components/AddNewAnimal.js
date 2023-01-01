import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import {addNewAnimal} from "../http";
import LocalizedStrings from "react-localization";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
        Add: "Add"
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
        Add: "Добавити"
    }
});

const ModalWindow = ({languageState}) => {
    stringsText.setLanguage(languageState)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formState, setFormState] = useState({
        name: '',
        height: 0,
        weight: 0.0,
        months: 0,
        type: '',
        healthStatus: '',
        breed: ''
    });


    const addNewTask = e => {
        e.preventDefault();
        const loginRequest = {...formState};
        console.log(loginRequest);
        addNewAnimal(loginRequest)
            .catch(error => {
                alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
            })
        setFormState({
            name: '',
            height: 0,
            weight: 0.0,
            months: 0,
            type: '',
            healthStatus: '',
            breed: ''});
    }



    return (
        <div>
            <Button
                variant="outlined"
                size="large"
                onClick={handleOpen}
                startIcon={<AddIcon />}
            >
                {stringsText.Add}
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                <Box sx={style}>
                    <Typography id="modal-title" variant="h5">
                        {stringsText.messageNotMain}
                    </Typography>
                    <Typography id="modal-description">
                        {stringsText.messageNotMain}
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={addNewTask}>
                        <TextField id="name" name="name" label={stringsText.name}  onChange={e => setFormState({...formState,name:e.target.value})}/>
                        <TextField id="height" name="height" label={stringsText.height}onChange={e => setFormState({...formState,height:e.target.value})} />
                        <TextField id="weight" name="weight" label={stringsText.weight} onChange={e => setFormState({...formState,weight:e.target.value})} />
                        <TextField id="months" name="months" label={stringsText.months}  onChange={e => setFormState({...formState,months:e.target.value})} />
                        <TextField id="type" name="type" label={stringsText.type} onChange={e => setFormState({...formState,type:e.target.value})} />
                        <TextField id="healthStatus" name="healthStatus" label={stringsText.healthStatus} onChange={e => setFormState({...formState,healthStatus:e.target.value})} />
                        <TextField id="breed" name="breed" label={stringsText.breed}  onChange={e => setFormState({...formState,breed:e.target.value})} />
                        <div className="employees-button2">
                            <Button type={"submit"}  variant="outlined">Submit</Button>
                        </div>
                        <div className="employees-button2">
                            <Button  variant="outlined" onClick={handleClose}>Close</Button>
                        </div>

                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalWindow;