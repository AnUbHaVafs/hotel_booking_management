import { useEffect, useState } from 'react'
import "./HomePage.css";
import { IonDatetime } from '@ionic/react';
import { Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField } from '@mui/material';
import { pink } from '@mui/material/colors';
import { advancedStaggeringAnimation, calMaxMonth, calMinMonth, calculateHistoryDates, containsOnlyEnglishChars, isValidEmail, isValidIndianPhoneNumber } from '../../helpers';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { availability } from '../../local_db/db';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const HomePage = () => {

    const [availableRooms, setAvailableRooms] = useState({});
    const [dateSelected, setDateSelected] = useState('');
    const [originalAvailability, setOriginalAvailability] = useState({});
    const [bookedSlots, setBookedSlots] = useState([]);
    const [datesBooked, setDatesBooked] = useState([]);
    // form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [rooms, setRooms] = useState(2);
    const [adults, setAdults] = useState(2);
    const [childs, setChilds] = useState(2);
    const [singleRoomToogle, setSingleRoomToogle] = useState(false);
    const [doubleRoomToogle, setDoubleRoomToogle] = useState(false);
    const [tripleRoomToogle, setTripleRoomToogle] = useState(false);
    const [budget, setBudget] = useState(6000);
    const [validBooking, setValidBooking] = useState(false);
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(()=>{
        advancedStaggeringAnimation();
        const hasAvailabilityInLocal = localStorage.getItem('availability');
        const hasBookedDates = localStorage.getItem('bookedDates');
        if(hasBookedDates){
            const bookedDatesArr = localStorage.getItem('bookedDates');
            setBookedDates(JSON.parse(bookedDatesArr));
        }
        if(hasAvailabilityInLocal){
            const avaiObj = localStorage.getItem('availability');
            const availableSlots = JSON.parse(avaiObj);
            setOriginalAvailability(availableSlots);
            const bookedDates = [];
            const dates = [];
            Object.keys(availableSlots).map((day)=>{
                const rooms = availableSlots[day];
                if(rooms[0]+rooms[1]+rooms[2]==0){
                    dates.push(day);
                    let formattedDate = `${day.substring(0, 4)}-${day.substring(4, 6)}-${day.substring(6, 8)}`;
                    bookedDates.push({
                    date: formattedDate,
                    textColor: '#800080',
                    backgroundColor: '#ffc0cb',
                    })
                }
            })
            setBookedSlots(bookedDates);
            setDatesBooked(dates);

        }
        else{
            const serializedJSON = JSON.stringify(availability);
            localStorage.setItem('availability',serializedJSON);            
            setOriginalAvailability(availability);
        }
    },[validBooking])

    const handleChange = (e)=>{
        setDateSelected(e.target.value);
        const dateSelected = e.target.value.split("T")[0].split("-").join("");
        if(datesBooked.includes(dateSelected)){
            // date is already booked
            window.alert("date is already booked. Please select from available dates!")
            return;
        }
        const areRoomsAvai = originalAvailability[dateSelected];
        if(areRoomsAvai && areRoomsAvai.length){
            setAvailableRooms(areRoomsAvai);
        } 
        else{
            const newAvai = [15,10,5];
            const newAvailability = {...originalAvailability};
            newAvailability[dateSelected] = newAvai;
            localStorage.setItem('availability', JSON.stringify(newAvailability));
            setAvailableRooms(newAvai);
        }     
    }

    const handleFirstName = (e)=>{
        const fname = e.target.value;
        setFirstName(fname);
    };
    const handleLastName = (e)=>{
        const lname = e.target.value;
        setLastName(lname);
    };
    const handleContact = (e)=>{
        const phone = e.target.value;
        setContact(phone);
    };
    const handleEmail = (e)=>{
        const emailId = e.target.value;
        setEmail(emailId);
    };
    const handleSingleRoomToogle = ()=>{
        if(singleRoomToogle)setSingleRoomToogle(false);
        else if(!doubleRoomToogle && !tripleRoomToogle){
            setSingleRoomToogle(true);
            setBudget(rooms*1000);
            const allowedAdultsCount = Math.min(adults,rooms);
            setAdults(allowedAdultsCount);
            setChilds(Math.min(allowedAdultsCount*2,childs));
        }
    }
    const handleDoubleRoomToogle = ()=>{
        if(doubleRoomToogle)setDoubleRoomToogle(false);
        else if(!singleRoomToogle && !tripleRoomToogle){
            const allowedAdultsCount = Math.min(adults,rooms*2);
            setDoubleRoomToogle(true);
            setBudget(rooms*2000);
            setAdults(allowedAdultsCount);
            setChilds(Math.min(allowedAdultsCount*2,childs));
        }
    }
    const handleTripleRoomToogle = ()=>{
        if(tripleRoomToogle)setTripleRoomToogle(false);
        else if(!singleRoomToogle && !doubleRoomToogle){
            const allowedAdultsCount = Math.min(adults,rooms*3);
            setTripleRoomToogle(true);
            setBudget(rooms*3000);
            setAdults(allowedAdultsCount);
            setChilds(Math.min(allowedAdultsCount*2,childs));
        }
    }
    const handleSubtractRooms = () => {
        setRooms(Math.max(rooms-1, 0));
        if(singleRoomToogle)setBudget((rooms-1)*1000);
        else if(doubleRoomToogle)setBudget((rooms-1)*2000);
        else if(tripleRoomToogle)setBudget((rooms-1)*3000);
    }
    const handleAddRooms = () => {
        setRooms(Math.max(rooms+1, 0));
        if(singleRoomToogle)setBudget((rooms+1)*1000);
        else if(doubleRoomToogle)setBudget((rooms+1)*2000);
        else if(tripleRoomToogle)setBudget((rooms+1)*3000);
    }
    const handleAddAdults = () => {
        const newAdultsCount = Math.max(adults+1, 0);
        if(singleRoomToogle){
            setAdults(Math.min(newAdultsCount,rooms));
            if(newAdultsCount>rooms)window.alert("You cannot add more adults!")
        }
        else if(doubleRoomToogle){
            setAdults(Math.min(newAdultsCount,rooms*2));
            if(newAdultsCount>rooms)window.alert("You cannot add more adults!")
        }
        else if(tripleRoomToogle){
            setAdults(Math.min(newAdultsCount,rooms*3));
            if(newAdultsCount>rooms)window.alert("You cannot add more adults!")
        }
        else setAdults(newAdultsCount);
    }
    const handleAddChilds = () => {
        const newChildsCount = Math.max(childs+1, 0);
        if(singleRoomToogle){
            setChilds(Math.min(newChildsCount,rooms*2));
            if(newChildsCount>(rooms*2))window.alert("You cannot add more childs!")
        }
        else if(doubleRoomToogle){
            setChilds(Math.min(newChildsCount,rooms*2*2));
            if(newChildsCount>(rooms*2*2))window.alert("You cannot add more childs!")
        }
    else if(tripleRoomToogle){
            setChilds(Math.min(newChildsCount,rooms*3*2));
            if(newChildsCount>(rooms*3*2))window.alert("You cannot add more childs!")            
        }
        else setChilds(newChildsCount);
    }

    const handleSubmitBooking = ()=>{
        // do we have all required details for booking ?
        if(!firstName){
            window.alert("Write first name!");
            return false;
        }
        if(!lastName){
            window.alert("Write last name!");
            return false;
        }
        if(!email){
            window.alert("Write your email!");
            return false;
        }
        if(!contact){
            window.alert("No contact details!");
            return false;
        }
        if(rooms==0){
            window.alert("No rooms selected");
            return false;
        }
        if(!singleRoomToogle && !doubleRoomToogle && !tripleRoomToogle){
            window.alert("Select room type");
            return false;
        }
        if(!dateSelected){
            window.alert("Select a date");
            return false;
        }
        if(budget==0){
            window.alert("Something wrong happen...Please email us for further details!");
            return true;
        }
        // is bookking valid according to availability ?
        let roomType = 0;
        const dateKey = dateSelected.split("T")[0].split("-").join("");
        const singleRoomsAvailable = originalAvailability[dateKey][0];
        const doubleRoomsAvailable = originalAvailability[dateKey][1];
        const tripleRoomsAvailable = originalAvailability[dateKey][2];
        if(singleRoomToogle){
            if(rooms>singleRoomsAvailable){
                window.alert("This number of single rooms are not available!")
                return false;
            }
            roomType=0;
        }
        if(doubleRoomToogle){
            if(rooms>doubleRoomsAvailable){
                window.alert("This number of double rooms are not available!")
                return false;
            }
            roomType=1;
        }
        if(tripleRoomToogle){
            if(rooms>tripleRoomsAvailable){
                window.alert("This number of triple rooms are not available!")
                return false;
            }
            roomType=2;
        }
                
        // book the rooms and update the availability
        const newAvailability = {...originalAvailability};
        newAvailability[dateKey][roomType] -= rooms ;
        localStorage.setItem('availability',JSON.stringify(newAvailability));
        // const newBookingDates = bookedDates.push()
        const singleRoomsNewAvailability = newAvailability[dateKey][0];
        const doubleRoomsNewAvailability = newAvailability[dateKey][1];
        const tripleRoomsNewAvailability = newAvailability[dateKey][2];
        const dateBooked = dateSelected.split("T")[0];
        const monthBooked = dateBooked.split("-")[1];
        const dayBooked = dateBooked.split("-")[2];
        if(singleRoomsNewAvailability+doubleRoomsNewAvailability+tripleRoomsNewAvailability == 0){
            const newDatesBooked = [...bookedDates, monthBooked+dayBooked];
            localStorage.setItem('bookedDates',JSON.stringify(newDatesBooked));
        }
        window.alert(`${rooms} Room are booked. Thank you for using our service...`);
        setValidBooking(true);
        return true;
    }

  return (
    <div className='home'>

    {/* staggering animation wrapper */}
      <div className="animation-body">
        <div className="animation-wrapper">
          <div className="stagger-visualizer">
            <div className="cursor color-red"></div>
            <div className="dots-wrapper"></div>
          </div>
        </div>
      </div>

        {/* header */}
        <div className='header dfc'>Havenly Homes Hotel Booking App</div>

        {/* calendar-with-form */}
        <div className='calendar-with-form dfr'>
            {/* calendar */}
            <div className='calender-date dfc'>
                <p className='title'>Select a date</p>
                <IonDatetime highlightedDates={bookedSlots} onIonChange={handleChange} min={calMinMonth()} max={calMaxMonth()} isDateEnabled={calculateHistoryDates} ></IonDatetime>
                <div className='availability dfc'>
                    <p className='title4'>Availability</p>
                    <div className='rooms-avai dfr'>
                        <div className='room-type-avai dfr'>
                            <p>Single: </p>
                            <p>{availableRooms[0]}</p>
                        </div>
                        <div className='room-type-avai dfr'>
                            <p>Double: </p>
                            <p>{availableRooms[1]}</p>
                        </div>
                        <div className='room-type-avai dfr'>
                            <p>Triple: </p>
                            <p>{availableRooms[2]}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* form */}
            <div className='form dfc'>
                {/* user-information */}
                <div className='user-box dfc'>
                    <p className='title'>User details</p>
                    <div className='user-fields dfr'>

                        <TextField
                        label="First name"
                        variant="standard"
                        placeholder='your first name'
                        className='user-field'
                        focused
                        color="secondary"
                        type='text'
                        onChange={handleFirstName}
                        error={!containsOnlyEnglishChars(firstName)}
                        required
                        />

                        <TextField
                        label="Last name"
                        variant="standard"
                        placeholder='your family name'
                        className='user-field'
                        color="secondary"
                        focused
                        type='text'
                        onChange={handleLastName}
                        error={!containsOnlyEnglishChars(lastName)}
                        required
                        />

                        <TextField
                        label="Contact number with country code"
                        variant="standard"
                        placeholder='+91XXXXXXXXXX'
                        className='user-field'
                        color="secondary"
                        type='text'
                        focused
                        onChange={handleContact}
                        error={!isValidIndianPhoneNumber(contact)}
                        required
                        />

                        <TextField
                        required
                        label="Email id"
                        variant="standard"
                        className='user-field'
                        placeholder='youremail@gmail.com'
                        color="secondary"
                        focused
                        type='email' 
                        onChange={handleEmail}
                        error={!isValidEmail(email)}                       
                        />             
                        
                                   
                    </div>
                </div>

                {/* reservation-details */}
                <div className='reservation-box dfc'>
                    <p className='title'>Reservation details</p>
                    <div className='reservation-fields dfr'>

                        {/* Adults counter */}
                        <div className='counter-adults dfc'>
                            <p className='title2'>Adults</p>
                            <div className='counter dfr'>
                                <Button
                                    aria-label="reduce"
                                    onClick={() => {
                                    setAdults(Math.max(adults-1, 0));
                                    }}
                                    disabled={adults<1}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>
                                <p className='title3'>{adults}</p>
                                <Button
                                    aria-label="increase"
                                    onClick={handleAddAdults}
                                    disabled={adults>=50}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                            </div>
                        </div>


                        {/* Childs counter */}
                        <div className='counter-adults dfc'>
                            <p className='title2'>Childs</p>
                            <div className='counter dfr'>
                                <Button
                                    aria-label="reduce"
                                    onClick={() => {
                                    setChilds(Math.max(childs-1, 0));
                                    }}
                                    disabled={childs<1}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>
                                <p className='title3'>{childs}</p>
                                <Button
                                    aria-label="increase"
                                    onClick={handleAddChilds}
                                    disabled={childs>=100}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                            </div>
                        </div>

                        {/* rooms counter */}
                        <div className='counter-adults dfc'>
                            <p className='title2'>Rooms</p>
                            <div className='counter dfr'>
                                <Button
                                    aria-label="reduce"
                                    onClick={handleSubtractRooms}
                                    disabled={rooms<1}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>
                                <p className='title3'>{rooms}</p>
                                <Button
                                    aria-label="increase"
                                    onClick={handleAddRooms}
                                    disabled={rooms>=15}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                            </div>
                        </div>

                        


                        <div className='budget-user dfc'>
                            <p className='title2'>Budget</p>
                            <TextField
                            // label="With normal TextField"
                            className="outlined-start-adornment"
                            // sx={{ m: 1, width: '25ch'}}
                            value={budget}
                            disabled
                            type='number'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                            }}
                        />
                        </div>

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
                                    onChange={handleSingleRoomToogle}
                                    checked={singleRoomToogle}
                                    defaultChecked={false}
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
                                    checked={doubleRoomToogle}
                                    onChange={handleDoubleRoomToogle}
                                    defaultChecked={false}
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
                                    checked={tripleRoomToogle}
                                    onChange={handleTripleRoomToogle}
                                    defaultChecked={false}
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
                <Button onClick={handleSubmitBooking} variant="outlined" className={`book-submit`}>Book</Button>
            </div>

            </div>
        </div>

        
    </div>
  )
}

export default HomePage;