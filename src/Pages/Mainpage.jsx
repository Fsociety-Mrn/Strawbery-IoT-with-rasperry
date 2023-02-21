import { Grid, Paper, Switch, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

// icons
import LOGO2 from '../Images/logoText-transformed.png'
import ThermostatIcon from '@mui/icons-material/Thermostat';

const MobileView = () => {
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
                        <Typography mt={2} fontFamily='sans-serif' fontSize='60px' variant="h1" component="h2" textAlign='center'> 11:00 pm</Typography>
                        <Typography  fontFamily='sans-serif' fontSize='20px' variant="caption" component="body"> Tue, Feb 21</Typography>
                    </Stack>
                </Grid>
        </Grid>
    )
}

const DesktopView = () => {
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
                        <Typography mt={2} fontFamily='sans-serif' variant="h1" component="h2" textAlign='center'> 11:00 pm</Typography>
                        <Typography  fontFamily='sans-serif' fontSize='30px' variant="caption" component="body"> Tue, Feb 21</Typography>
                    </Stack>
                </Grid>
        </Grid>
    )
}

const Mainpage = () => {
    const [state, setState] = React.useState(false);

    React.useEffect(()=>{
        const setResponsiveness = () => {
          return window.innerWidth < 700 ? setState(true) : setState(false);
        };
    
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    
        return () => {
          window.removeEventListener("resize", () => setResponsiveness());
        };
    },[])
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
                                    32 celsius
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
                        <Typography
                        variant="h6"
                        textAlign='center'
                        color='#000000'>
                        Soil Moisture
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
                            100%
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
                            <Typography
                            variant="h6"
                            textAlign='center'
                            color='#000000'>
                            Waterpump
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                                <ThermostatIcon fontSize="large" sx={{ color: '#000000' }}/>

                                <Switch
                                // checked={oxyPump}
                                // onChange={oxypumpF}
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