import React from 'react'
import "./HomePage.css";
import { IonDatetime } from '@ionic/react';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { pink } from '@mui/material/colors';
// import '@ionic/react/css/core.css';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const HomePage = () => {
  return (
    <div className='home'>
        {/* header */}
        <div className='header dfc'>Hotel Booking</div>

        {/* calendar-with-form */}
        <div className='calendar-with-form dfr'>
            {/* calendar */}
            <div className='calender-date dfc'>
                <p className='title'>Select a date</p>
                <IonDatetime minuteValues="0,15,30,45" dayValues="5,10,15,20,25,30"></IonDatetime>
            </div>

            {/* form */}
            <div className='form dfc'>
                {/* user-information */}
                <div className='user-box dfc'>
                    <p className='title'>User details</p>
                    <div className='user-fields dfr'>
                        <TextField
                        label="Standard warning"
                        variant="standard"
                        className='user-field'
                        // color="warning"
                        focused
                        />
                        <TextField
                        label="Standard warning"
                        variant="standard"
                        className='user-field'
                        // color="warning"
                        focused
                        />
                        <TextField
                        label="Standard warning"
                        variant="standard"
                        className='user-field'
                        // color="warning"
                        focused
                        />
                        <TextField
                        label="Standard warning"
                        variant="standard"
                        className='user-field'
                        // color="warning"
                        focused
                        />                        
                    </div>
                </div>

                {/* reservation-details */}
                <div className='reservation-box dfc'>
                    <p className='title'>Reservation details</p>
                    <div className='reservation-fields dfr'>
                        <TextField
                        label="Standard warning"
                        variant="standard"
                        className='user-field'
                        // color="warning"
                        focused
                        />
                        <TextField
                        label="Standard warning"
                        variant="standard"
                        className='user-field'
                        // color="warning"
                        focused
                        />
                        
                    </div>
                    <div className='room-choices'>
                        <FormGroup className='room-types dfr'>
                            <FormControlLabel 
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }} 
                            control={
                                <Checkbox
                                {...label}
                                    defaultChecked
                                    sx={{
                                    color: pink[800],
                                    '&.Mui-checked': {
                                        color: pink[600],
                                    },
                                    }}
                                />
                            } 
                            label="Single" 
                            />
                            <FormControlLabel 
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }} 
                            control={
                                <Checkbox
                                {...label}
                                    defaultChecked
                                    sx={{
                                    color: pink[800],
                                    '&.Mui-checked': {
                                        color: pink[600],
                                    },
                                    }}
                                />
                            } 
                            label="Double" 
                            />
                            <FormControlLabel 
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }} 
                            control={
                                <Checkbox
                                {...label}
                                    defaultChecked
                                    sx={{
                                    color: pink[800],
                                    '&.Mui-checked': {
                                        color: pink[600],
                                    },
                                    }}
                                />
                            } 
                            label="Triple" 
                            />
                        </FormGroup>
                        
                    </div>
                </div>

            <div className='submit dfc'>
                <Button variant="outlined" className='book-submit'>Book</Button>
            </div>

            </div>
        </div>

        
    </div>
  )
}

export default HomePage;