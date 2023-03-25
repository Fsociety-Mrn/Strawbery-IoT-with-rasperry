import { Grid, Stack, Typography } from '@mui/material';
import React from 'react'

import LOGO2 from '../Images/logoText-transformed.png'

// format date
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

// mobile view
export const MobileView = () => {

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

// Deskktop view
export const DesktopView = () => {

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