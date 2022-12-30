import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
 import AddIcon from "@mui/icons-material/Add";
 import SendIcon from "@mui/icons-material/Send"
import {useState} from "react";
import {ACCESS_TOKEN, addTask, login} from "../http";





const ModalTask = ({employeeId}) => {
    const [taskState, setTaskState] = useState({taskField: '', date: '',status: 'IN_PROGRESS'});

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


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(null);

    const addNewTask = e => {
        e.preventDefault();
        const loginRequest = {...taskState};
        console.log(taskState);
        addTask(loginRequest, employeeId)
            .catch(error => {
            alert((error && error.message) || 'Oops! Something went wrong. Please try again!');
        })
        setTaskState({taskField: '', date: '',status: 'IN_PROGRESS'});
    }
    return (
        <div>
            <div className="employees-button">
                <Button onClick={handleOpen} variant="contained" endIcon={<AddIcon />}>
                    New
                </Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Task Employee
                    </Typography>
                    <form onSubmit={addNewTask}>
                        <TextField
                            id="name-of-task"
                            value={taskState.taskField}
                            label="Name of the task"
                            onChange={e => setTaskState({...taskState,taskField:e.target.value})}
                            variant="outlined"
                        />
                        <div className="employees-button">
                            <input id="startDate" className="form-control" type="date"
                                   value={taskState.date}
                                   onChange={e => setTaskState({...taskState,date:e.target.value})}/>
                        </div>

                        <div className="employees-button">
                            <Button type={"submit"} variant="contained" endIcon={<SendIcon />}>
                                Send
                            </Button>
                        </div>
                    </form>

                </Box>
            </Modal>
        </div>
    );
}
export default  ModalTask