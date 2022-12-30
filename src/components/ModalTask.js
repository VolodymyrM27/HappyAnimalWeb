import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import {employees, getTaskEmployee} from "../http";
import NewTask from "./NewTask";




const ModalTask = ({employeeId}) => {

    const [state,setState] = React.useState([{
        taskField: "Loading...",
        status: ""
    }])

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



    const getUsers = async () =>{
        const getUser = await getTaskEmployee(employeeId);
        let g = [{
            taskField: "",
            status: ""
        }]
        for(let i = 0; i < getUser.length;i++){
            g[i] = {
                taskField: "",
                status: ""
            }
            g[i].taskField = getUser[i].taskField;
            g[i].status = getUser[i].status;

        }
        setState(g)
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(()=>{getUsers()},[employeeId])
    console.log(state)
    return (
        <div>
            <Button onClick={handleOpen}>Tasks</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title " variant="h6 alignCenter"  component="h2">
                        Task Employee
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Description</TableCell>
                                <TableCell>Task Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.map((row) => (
                                <TableRow key={row.taskField}>
                                    <TableCell>{row.taskField}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <NewTask employeeId={employeeId}/>
                </Box>
            </Modal>
        </div>
    );
}
export default  ModalTask