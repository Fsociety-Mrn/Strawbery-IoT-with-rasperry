import React from 'react'
import { 
  Button,
  Grid,
  Paper,
  Stack 
} from '@mui/material'
import { LoginTextbox } from '../Components/CustomTextfield'
import { LoginStraw } from '../Authentication/LoginFirebase'

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


  // Initialize variables

  const [error, setError] = React.useState({
    error: false,
    errorMessage: ""
  })

  // email and password
  const [user, setUser] = React.useState({
    email : "",
    password : ""
  })

  const loginButton = async () => {

    const data = await LoginStraw(user)

    setError({
      error: data,
      errorMessage: data ? "Invalid Email and Password" : "",
    });

    if (!data) {
      window.location.reload(false);
    }
    
   
  }

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
        error={error.error}
        // helperText={error.emailMessage}
        value={user.email}
        onChange={e=>setUser({...user, email: e.target.value})}
        fullWidth 
        margin='normal' 
        placeholder='Email'
        />

        <LoginTextbox
        type='password' 
        error={error.error}
        helperText={error.errorMessage}
        value={user.password}
        onChange={e=>setUser({...user, password: e.target.value})}
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
          onClick={loginButton}
          >Login</Button>

        </Stack>

      </Paper>

      
      
      </Grid>

    </div>
  )
}



export default Login



