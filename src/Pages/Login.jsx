import React from 'react'
import { 
  Button,
  Grid,
  Paper,
  Stack 
} from '@mui/material'
import { LoginTextbox } from '../Components/CustomTextfield'
import { useNavigate } from 'react-router-dom'
// icons
import LOGO2 from '../Images/logoText-transformed.png'

// Color
import { secondaryColour } from '../index'

// main function
const Login = () => {
  return (
    <div>
      <MobileView/>
    </div>
  )
}

const MobileView = () => {
  let navigate = useNavigate();
  return(
    <div>
      <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ 
        minHeight: "90vh",
        backgroundColor: secondaryColour
      }}
      padding={2}
      >

    {/* Logo */} 
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

      <Paper
      elevation={0}
      >

    {/* Email and Username*/} 
        <LoginTextbox 
        type='email'
        // error={error.email}
        // helperText={error.emailMessage}
        // value={user.email}
        // onChange={emailChanged}
        fullWidth 
        margin='normal' 
        placeholder='Email'
        />

        <LoginTextbox
        type='password' 
        // error={error.password}
        // helperText={error.passwordMessage}
        // value={user.password}
        // onChange={passwordChanged}
        fullWidth 
        margin='normal' 
        placeholder='Password'/> 
        
      {/* Login */}
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        paddingY={3}
        >
          <Button 
          variant='contained' 
          color='primary' 
          style={{
            width:"300px"
          }}
          onClick={()=>navigate("/Mainpage")}
          >Login</Button>

        </Stack>

      </Paper>

      
      
      </Grid>

    </div>
  )
}



export default Login



