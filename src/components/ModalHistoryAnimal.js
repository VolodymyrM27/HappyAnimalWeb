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
import { getAnimalHistory} from "../http";
import LocalizedStrings from "react-localization";

let stringsText = new LocalizedStrings({
    en:{
        history: "Animal History",
        created:'created',
        name: "Name.",
        height: "height",
        weight: "weight",
        months: "months",
        changeBy: 'changeBy',
        date:"date"
    },
    uk: {
        history: "Історія змін",
        created:'створено',
        name: "Імʼя",
        height: "зріст",
        weight: "вага",
        months: "місяців",
        changeBy: 'змінено',
        date:"Дата"
    }
});


const ModalTask = ({animalId, languageState}) => {
    stringsText.setLanguage(languageState)


    const [state,setState] = React.useState([{
        id: -1,
        created:'',
        name: "Loading...",
        height: "",
        weight: "",
        months: -1,
        changeBy: ''
    }])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    const getUsers = async () =>{
        const getUser = await getAnimalHistory(animalId);
        let g = [{
            id: -1,
            created:'',
            name: "Loading...",
            height: "",
            weight: "",
            months: -1,
            changeBy: ''
        }]
        for(let i = 0; i < getUser.length;i++){
            g[i] = {
                id: -1,
                created:'',
                name: "Loading...",
                height: "",
                weight: "",
                months: -1,
                changeBy: ''
            }
            g[i].name = getUser[i].name;
            g[i].height = getUser[i].height;
            g[i].weight = getUser[i].weight;
            g[i].months = getUser[i].months;
            g[i].id = getUser[i].id;
            g[i].created = getUser[i].created;
            g[i].changeBy = getUser[i].changeBy;

        }
        setState(g)
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(()=>{getUsers()},[animalId])
    console.log(state)
    return (
        <div>
            <Button onClick={handleOpen}>{stringsText.history}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title " variant="h6 alignCenter"  component="h2">
                        {stringsText.history}
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{stringsText.name}</TableCell>
                                <TableCell>{stringsText.height}</TableCell>
                                <TableCell>{stringsText.weight}</TableCell>
                                <TableCell>{stringsText.months}</TableCell>
                                <TableCell>{stringsText.date}</TableCell>
                                <TableCell>{stringsText.changeBy}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.height}</TableCell>
                                    <TableCell>{row.weight}</TableCell>
                                    <TableCell>{row.months}</TableCell>
                                    <TableCell>{row.created}</TableCell>
                                    <TableCell>{row.changeBy}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Modal>
        </div>
    );
}
export default  ModalTask