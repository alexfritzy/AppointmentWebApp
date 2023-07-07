import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppointmentDetails from '../components/AppointmentDetails/AppointmentDetails.js';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch("api/Appointments/GetAppointments")
            .then(response => { return response.json() })
            .then(responseJson => {
                responseJson.sort((a, b) => (a.requestedDateTimeOffset > b.requestedDateTimeOffset) ? 1 : -1)
                    .forEach(a => { a.requestedDateTimeOffset = new Date(a.requestedDateTimeOffset).toLocaleString("en-US", dateFormat) });
                setAppointments(responseJson);
            });
    }, []);

    const dateFormat = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit' };

    const [open, setOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const openAppointmentDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setOpen(true);
    };

    const closeDetails = () => {
        setOpen(false);
    };

    return (
        <div className="container">
            <h1 align="center">Appointments</h1>
            <br/>
            <div className="row">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Requested Date</TableCell>
                                <TableCell>Service</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Pet Name</TableCell>
                                <TableCell>Species</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.map((item) => (
                                <TableRow onClick={() => openAppointmentDetails(item)}>
                                    <TableCell component="th" scope="row">{item.requestedDateTimeOffset}</TableCell>
                                    <TableCell>{item.appointmentType}</TableCell>
                                    <TableCell>{item.user.firstName + " " + item.user.lastName}</TableCell>
                                    <TableCell>{item.animal.firstName}</TableCell>
                                    <TableCell>{item.animal.species}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AppointmentDetails
                    onClose={closeDetails}
                    open={open}
                    appointment={selectedAppointment}
                />
            </div>
        </div>
    );
};

export default Appointments;