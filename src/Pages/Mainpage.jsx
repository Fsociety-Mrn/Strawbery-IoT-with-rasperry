import { Button, Grid, Paper, Switch, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { DesktopView, MobileView} from '../Components/CustomDate'
import axios from 'axios';

// firebase
import { database, updateReal} from '../firebase/firebase_real'
import { onValue, ref } from 'firebase/database';

// icons

import ICON from '../Images/Logo-modified.png'
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LandslideIcon from '@mui/icons-material/Landslide';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import ShowerIcon from '@mui/icons-material/Shower';
import ColorizeIcon from '@mui/icons-material/Colorize';


const Mainpage = () => {
    const [state, setState] = React.useState(false);

    // data
    const [temp, setTemp] = React.useState("")
    const [moisture_1, setMoisture_1] = React.useState("")
    const [moisture_2, setMoisture_2] = React.useState("")
    const [waterLevel, setWaterLevel] = React.useState("")
    const [waterPump, setWaterPump] = React.useState(Boolean)
    const [phLevel, setPhLevel] = React.useState("")
    const [sprayPump, setSprayPump] = React.useState(Boolean)

    let tempValue = "N/A";
    let moisture1Value = "N/A";
    let moisture2Value = "N/A";
    let waterLevelValue = "N/A"
    let phLevelValue = "N/A"

    React.useEffect(()=>{
        const setResponsiveness = () => {
          return window.innerWidth < 700 ? setState(true) : setState(false);
        };
    
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());


        // Temperature
        onValue(ref(database , '/Humidity'), e => {
            setTemp(()=>e.child("data").val()) 
            tempValue = e.child("data").val()
        })
        
        // Moisture 1
        onValue(ref(database , '/Moisture 1'), e => {
            setMoisture_1(()=>e.child("data").val()) 
            moisture1Value = e.child("data").val()
        })

        // Moisture 2
        onValue(ref(database , '/Moisture 2'), e => {
            setMoisture_2(()=>e.child("data").val()) 
            moisture2Value = e.child("data").val()
        })  
        
        // Water Level
        onValue(ref(database , '/waterLevel'), e => {
            setWaterLevel(()=>e.child("data").val()) 
            waterLevelValue = e.child("data").val()
        })

        // Water Pump
        onValue(ref(database , '/waterPump'), e => {
            setWaterPump(()=>e.child("data").val()) 
        })   
        
        // Ph level
        onValue(ref(database , '/phLevel'), e => {
            setPhLevel(()=>e.child("data").val()) 
            phLevelValue = e.child("data").val()
        })          
        
        // Spray Pump
        onValue(ref(database , '/sprayPump'), e => {
            setSprayPump(()=>e.child("data").val()) 
        })  
        
        // Notification
        
        const interval = setInterval(() => {
            textMessages();
            Notification.requestPermission().then(per=>{
                if (per==="granted"){
                    new Notification("Strawberry: IoT with raspberry",{
                        body: "Temperature: "+ tempValue + "\n\n" +
                                "Soil Moisture: M1: "+ moisture1Value+" M2 "+moisture2Value+" \n\n"+
                                "Water Level: " + waterLevelValue + "\n\n" + 
                                "PH Level: " + phLevelValue + "\n\n\n" + 
                                "We will notify you again in 15 seconds.",
                        icon: ICON,
                        tag: "Strawberry"
                    })
                }
            })
          }, 15000);
    
        return () => {
        clearInterval(interval);
          window.removeEventListener("resize", () => setResponsiveness());
        };
    },[])


    const waterPumpF = () =>{
        updateReal("waterPump",{
          data: !waterPump
        });
      }

    const sprayPumpF = () =>{
        updateReal("sprayPump",{
          data: !sprayPump
        });
      }

    
    // send notification to telegram bot
    const textMessages = async () => {

        await axios.post(`https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/sendMessage`, {
              chat_id: process.env.REACT_APP_CHAT_ID_REY,
              
              text: "Strawberry: IoT with raspberry\n\n\nTemperature: "+ tempValue + "\n" +
              "Soil Moisture: M1: "+ moisture1Value+" M2 "+ moisture2Value+" \n"+
              "Water Level: " + waterLevelValue + "\n\n\n" + 
              "We will notify you again in 30 minutes.",
            },{
              headers: {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
              }})
            .then(respons => console.log(respons.data))
            .catch(error=>console.error(error));
      
        // ======== code for get the responses messages ======== //

        // Replace <your-bot-token> with your actual bot token
        // await axios.get(`https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/getUpdates`)
        //     .then(response => {
        //         const chatId = response.data.result[1].message.chat.id;
        //             console.log(chatId);
        //     })
        //     .catch(error => {
        //     console.log(error);
        //     });

    }
    

  return (
    <React.Fragment>

        {!state ? <DesktopView /> : <MobileView />}

        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        padding={1}
        >

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

        {/* Ph level */}
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
                                PH level
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                                <ColorizeIcon fontSize="large" sx={{ color: '#000000' }}/>
                                
                                <Typography
                                variant="h4"
                                textAlign='center'
                                color='#000000'>
                                {phLevel}
                                </Typography>
                            </Stack>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>          

        {/* Spray pump */}
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
                                Spray pump
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
                                checked={sprayPump}
                                onChange={sprayPumpF}
                                // inputProps={{ 'aria-label': 'controlled' }}
                                style={{ color: '#000000' }}
                                />
                            </Stack>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>          


        </Grid>

    </React.Fragment>
  )
}

export default Mainpage