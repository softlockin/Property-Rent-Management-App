import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import jwt_decode from "jwt-decode"
import { useParams, useNavigate} from 'react-router-dom'
import { Alert, Paper, Stack, Typography, Box, Grid , useTheme} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const AccountLinkingPage = (props) => {

    let { token } = useParams()
    const {authTokens} = useContext(AuthContext)
    const navigate = useNavigate()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('lg'));
    const [property, setProperty] = useState({})
    const [values, setValues] = useState({
        errorRaised: false,
        errorMessage: '',
        success: false,
    })

    useEffect(() => {
        props.setOtherActions(true)
        async function acceptAccountLink(){
            let response = await fetch(`http://127.0.0.1:8000/api/accept-request/?token=`+token, {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
            })
            let data = await response.json()

            if(response.status === 400 || response.status === 404){
                setValues({
                    ...values,
                    errorRaised: true,
                    errorMessage: data.error,
                  });
            }

            if(response.status === 200){
                setProperty(data)
                setValues({
                    ...values,
                    errorRaised: false,
                    errorMessage: '',
                    success: true
                  });
            }
        }
        
        try {
            jwt_decode(token)
            acceptAccountLink()
        }catch(err){
            setValues({
                ...values,
                errorRaised: true,
                errorMessage: 'Invalid link',
              });
        }
        
    }, [])

  return (
    <>
    <Box 
      >
        <Stack
          direction="column" 
          justifyContent="center"
          alignItems="center"
          spacing={4}
          mt={5}
          mr={5}
          ml={5}
        >
          <Paper elevation={5} sx={{borderRadius:"35px", textAlign:"center", padding:"10px", width:"422px"}}>
            <Stack direction="column" justifyContent="center" alignItems="center">
                <Typography
                sx={{padding:"35px"}}
                variant="h6"
                component="h2"
                gutterBottom
                >
                Property Management App
                </Typography>
        
            
                {values.success 
                ? 
                <>
                <Stack direction="column" justifyContent="flex-start" alignItems="center">
                    <Grid container spacing={1} sx={{width: "100%", padding: "25px 0px 25px 15px"}}>
                        <Grid item md={12}>
                            <Alert variant="outlined" severity="success" sx={{marginTop:"5px", marginBottom:"15px"}}>
                                Account linked successfully!
                            </Alert>
                        </Grid>
                        <Grid item md={12}>
                            <Typography 
                                variant="body1"
                                mt={2}
                                // sx={{color:"green"}} 
                                >Address: {property.address}
                            </Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography 
                                variant="body1"
                                mt={2}
                                // sx={{color:"green"}} 
                                >Price: {property.price}
                            </Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography 
                                variant="body1"
                                mt={2}
                                // sx={{color:"green"}} 
                                >Rent due day: {property.due_day}
                            </Typography>
                        </Grid>                      
                    </Grid>
                    <Typography onClick={()=> {navigate('/');window.location.reload();}} sx={{cursor: 'pointer', textDecoration: 'underline'}}>
                        Go to dashboard!
                    </Typography>
                </Stack>   
                </>
                 
                : 
                <>
                <Alert variant="outlined" severity="error" sx={{marginTop:"5px", marginBottom:"15px"}}>
                    {values.errorMessage}
                </Alert>
                <Typography onClick={()=> {navigate('/');window.location.reload();}} sx={{cursor: 'pointer', textDecoration: 'underline'}}>
                    Go to dashboard!
                </Typography>
                </>
                }
            </Stack> 
        </Paper>
        </Stack>
    </Box>
    
    </>
  )
}

export default AccountLinkingPage