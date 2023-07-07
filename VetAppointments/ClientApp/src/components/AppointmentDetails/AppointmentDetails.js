import { useEffect, useState } from "react";
import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const AppointmentDetails = (props) => {
    const { onClose, appointment, open } = props;

    const handleClose = () => {
        onClose();
    };

    const confirm = () => {
        setConfirmed(true);
    };

    const requestChange = (newDate) => {
        setChanged(true);
    };

    const [date, setDate] = useState(dayjs(appointment?.requestedDateTimeOffset));
    const [confirmed, setConfirmed] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (open) {
            setDate(dayjs(appointment?.requestedDateTimeOffset));
            setConfirmed(false);
            setChanged(false);
        }
    }, [open]);

    return (
        <Dialog onClose={handleClose} open={open}>
            {(!confirmed && !changed) &&
            <div>
                <DialogTitle align="center">Manage Appointment</DialogTitle>
                <div style={{ padding: '25px' }}>
                    <div style={{ padding: '5px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Appointment Date"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                            />
                        </LocalizationProvider>
                    </div>
                
                    <p>Service: {appointment?.appointmentType}</p>
                    <p>Parent Name: {appointment?.user?.firstName + " " + appointment?.user?.lastName}</p>
                    <p>Pet Name: {appointment?.animal?.firstName}</p>
                    <p>Species: {appointment?.animal?.species}</p>
                    <p>Breed: {appointment?.animal?.breed}</p>
                    {date.diff(dayjs(appointment?.requestedDateTimeOffset)) == 0 ?
                        <div align="center">
                            <Button variant="contained" onClick={confirm}>Confirm</Button>
                        </div> :
                        <div align="center">
                            <Button variant="contained" onClick={() => requestChange(date)}>Request Date Change</Button>
                        </div>                        
                    }
                </div>
            </div>
            }
            {confirmed &&
                <div>
                    <DialogTitle align="center">Appointment confirmed for: {new Date(date.toString()).toLocaleString()}</DialogTitle>
            </div>
            }
            {changed &&
            <div>
                <DialogTitle align="center">Requested appointment time change to: {new Date(date.toString()).toLocaleString()}</DialogTitle>
            </div>
            }
        </Dialog>
    );
};

export default AppointmentDetails;