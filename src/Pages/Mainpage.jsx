import { Button, Grid, Paper, Switch, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

// firebase
import { database, updateReal} from '../firebase/firebase_real'
import { onValue, ref } from 'firebase/database';

// icons
import LOGO2 from '../Images/logoText-transformed.png'
import ICON from '../Images/Logo-modified.png'
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LandslideIcon from '@mui/icons-material/Landslide';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import ShowerIcon from '@mui/icons-material/Shower';


const formatDateTime = (dateTime) => {
    const options = {
        timeZone: "Asia/Manila",
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
       
      };
      const date = dateTime.toLocaleDateString("en-US", options)
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const timeString = dateTime.toLocaleTimeString("en-US", timeOptions);
      return {
        date,
        timeString,
      };
}

const MobileView = () => {

    const [time, setTime] = React.useState(new Date());
    React.useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    
      const { date, timeString } = formatDateTime(time);
    return (
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        padding={1}
        >
            {/* Logo */}
                <Grid item xs={12} sm={12} >
                    <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <img
                        alt='logo'
                        src={LOGO2}
                        style={{
                            width: '130px',
                            height: '130px'
                        }}
                        />
                    </Stack>
                </Grid>
    
            {/* Clock */}
                <Grid item xs={12} sm={12} >
                    <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <Typography mt={2} fontFamily='sans-serif' fontSize='60px' variant="h1" component="h2" textAlign='center'> {timeString}</Typography>
                        <Typography  fontFamily='sans-serif' fontSize='20px' variant="caption" component="body"> {date}</Typography>
                    </Stack>
                </Grid>
        </Grid>
    )
}

const DesktopView = () => {

    const [time, setTime] = React.useState(new Date());
    React.useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    
      const { date, timeString } = formatDateTime(time);

    return(
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        padding={1}
        >
        {/* Logo */}
            <Grid item xs={12} sm={12} md={5}>
                    <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <img
                        alt='logo'
                        src={LOGO2}
                        style={{
                            width: '300px',
                            height: '300px'
                        }}
                        />
                    </Stack>
                </Grid>
    
            {/* Clock */}
                <Grid item xs={12} sm={12} md={5}>
                    <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <Typography mt={2} fontFamily='sans-serif' variant="h1" component="h2" textAlign='center'> {timeString}</Typography>
                        <Typography  fontFamily='sans-serif' fontSize='30px' variant="caption" component="body"> {date}</Typography>
                    </Stack>
                </Grid>
        </Grid>
    )
}

const Mainpage = () => {
    const [state, setState] = React.useState(false);

    // data
    const [temp, setTemp] = React.useState("")
    const [moisture_1, setMoisture_1] = React.useState("")
    const [moisture_2, setMoisture_2] = React.useState("")
    const [waterLevel, setWaterLevel] = React.useState("")
    const [waterPump, setWaterPump] = React.useState(Boolean)


    React.useEffect(()=>{
        const setResponsiveness = () => {
          return window.innerWidth < 700 ? setState(true) : setState(false);
        };
    
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());


        // Temperature
        onValue(ref(database , '/Humidity'), e => {
            setTemp(()=>e.child("data").val()) 
        })

        // Moisture 1
        onValue(ref(database , '/Moisture 1'), e => {
            setMoisture_1(()=>e.child("data").val()) 
        })

        // Moisture 2
        onValue(ref(database , '/Moisture 2'), e => {
            setMoisture_2(()=>e.child("data").val()) 
        })  
        
        // Water Level
        onValue(ref(database , '/waterLevel'), e => {
            setWaterLevel(()=>e.child("data").val()) 
        })

        // Water Pump
        onValue(ref(database , '/waterPump'), e => {
            setWaterPump(()=>e.child("data").val()) 
        })        
  
    
        return () => {
          window.removeEventListener("resize", () => setResponsiveness());
        };
    },[])


    const waterPumpF = () =>{
        updateReal("waterPump",{
          data: !waterPump
        });
      }

    const textMessages = () => {
        alert('Button clicked!');
    }
    

  return (
    <div>

        {!state ? <DesktopView /> : <MobileView />}

        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        padding={1}
        >

        {/* Account Settings */}
    {/*
            <Grid item xs={12} sm={12} md={4}>
                <Paper elevation={0} sx={{
                    backgroundColor: "WHITE",
                    border: '2px solid #B25F5B'
                    }}
                >
                    <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                    >  
                        <Grid item xs={12} md={12}>
                            <Typography
                            variant="h6"
                            textAlign='center'
                            color='#000000'>
                                Acc Settings
                            </Typography>

                        </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}>
                                    
                                    <Button 
                                    variant='text' 
                                    color='secondary' 
                                    style={{
                                      width:"300px"
                                    }}
                                    startIcon={
                                        <ThermostatIcon 
                                        fontSize="large" 
                                        sx={{ color: '#000000' }}
                                        />
                                    }
                                    onClick={textMessages}
                                    >Settings</Button>

                                </Stack>
                            </Grid>

                        </Grid>
                </Paper>

            </Grid>

        */}
        
        {/* Temnperature */}
            <Grid item xs={12} sm={12} md={4}>
                <Paper elevation={0} sx={{
                    backgroundColor: "WHITE",
                    border: '2px solid #B25F5B'
                }}
                >
                    <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                    >  
                        <Grid item xs={12} md={12}>
                            <Typography
                            variant="h6"
                            textAlign='center'
                            color='#000000'>
                                Temperature
                            </Typography>

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                                <ThermostatIcon fontSize="large" sx={{ color: '#000000' }}/>

                                <Typography
                                    variant="h4"
                                    textAlign='center'
                                    color='#000000'>
                                    {temp}
                                    </Typography>
                            </Stack>
                        </Grid>

                    </Grid>
                </Paper>

            </Grid>

        {/* Soil Moitusre */}
            <Grid item xs={12} sm={12} md={4}>
                <Paper elevation={0} sx={{
                backgroundColor: "WHITE",
                border: '2px solid #B25F5B'
                }}
                >
                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                padding={2}
                >  
                    <Grid item xs={12} md={12}>

                        <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}> 

                            <LandslideIcon fontSize="large" sx={{ color: '#000000' }}/>
                            <Typography
                            variant="h6"
                            textAlign='center'
                            color='#000000'>
                            Soil Moisture
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                            

                            <Typography
                            variant="h4"
                            textAlign='center'
                            color='#000000'>
                            M1:{moisture_1}
                            </Typography>

                            <Typography
                            variant="h4"
                            textAlign='center'
                            color='#000000'>
                            M2:{moisture_2}
                            </Typography>
                        </Stack>
                    </Grid>

                </Grid>
                </Paper>
            </Grid>

        {/* Water  Level */}
            <Grid item xs={12} sm={12} md={4}>
                <Paper elevation={0} sx={{
                backgroundColor: "WHITE",
                border: '2px solid #B25F5B'
                }}
                >
                    <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                    >  
                        <Grid item xs={12} md={12}>
                            <Typography
                            variant="h6"
                            textAlign='center'
                            color='#000000'>
                            Water Level
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                                <OilBarrelIcon fontSize="large" sx={{ color: '#000000' }}/>
                                <Typography
                                variant="h4"
                                textAlign='center'
                                color='#000000'>
                                {waterLevel}
                                </Typography>
                            </Stack>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>  

        {/* Water  Pump */}
            <Grid item xs={12} sm={12} md={4}>
                <Paper elevation={0} sx={{
                backgroundColor: "WHITE",
                border: '2px solid #B25F5B'
                }}
                >
                    <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                    >  
                        <Grid item xs={12} md={12}>
                            <Typography
                            variant="h6"
                            textAlign='center'
                            color='#000000'>
                            Water Pump
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                                <ShowerIcon fontSize="large" sx={{ color: '#000000' }}/>

                                <Switch
                                checked={waterPump}
                                onChange={waterPumpF}
                                // inputProps={{ 'aria-label': 'controlled' }}
                                style={{ color: '#000000' }}
                                />
                            </Stack>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>            

  
        </Grid>

    </div>
  )
}

export default Mainpage