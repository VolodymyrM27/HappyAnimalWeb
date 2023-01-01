import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import {addNewEmployee} from "../http";
import LocalizedStrings from 'react-localization';

let stringsText = new LocalizedStrings({
    en:{
        Email:"Email:",
        fistName:"Fist Name:",
        lastName:"Last Name",
        password:"password",
        messageMaim: "Create New User",
        messageNotMain: "Please enter the following information:",
        Add:"Add"
    },
    uk: {
        Email:"Пошта",
        fistName:"Імʼя:",
        lastName:"Призвище",
        password:"Пароль",
        messageMaim: "створити нового користувача",
        messageNotMain: "Будь Ласка введіть наступну інфу: ",
        Add:"добавити"
    }
});

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

const ModalWindow = ({languageState}) => {
    stringsText.setLanguage(languageState)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formState, setFormState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        isEmployee: 'true'
    });


    const addNewTask = e => {
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
            isEmployee: 'true'});
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
                        {stringsText.messageMaim}
                    </Typography>
                    <Typography id="modal-description">
                        {stringsText.messageNotMain}
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={addNewTask}>
                        <TextField id="email" name="email" label={stringsText.Email}  onChange={e => setFormState({...formState,email:e.target.value})}/>
                        <TextField id="firstName" name="firstName" label={stringsText.fistName} onChange={e => setFormState({...formState,firstName:e.target.value})} />
                        <TextField id="lastName" name="lastName" label={stringsText.lastName} onChange={e => setFormState({...formState,lastName:e.target.value})} />
                        <TextField id="password" name="password" label={stringsText.password} type="password" onChange={e => setFormState({...formState,password:e.target.value})} />
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