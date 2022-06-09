import React, { useState } from 'react'
import { Container, Alert, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

const ForgotPasswordPage = () => {

  const [values, setValues] = useState({
    loading: false,
    errorRaised: false,
    errorMessage: '',
    requestSuccess: false,

  });

  let requestResetLink = async (e)=>{
    let response = await fetch('http://127.0.0.1:8000/api/forgot-password/', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'email':e.target.email.value}),
    })
    
    return(response.status)
    
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(e.target.email.value === ''){
      setValues({
        ...values,
        errorRaised: true,
        errorMessage: 'Email address field is required.'
      });
    }else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(e.target.email.value)){
      setValues({
        ...values,
        errorRaised: true,
        errorMessage: 'Email address not valid.'
      });
    }else{
      setValues({
        ...values,
        loading: true,
      });
      
      let response = await requestResetLink(e)
      
      response === 200 ?
        setValues({
          ...values,
          loading: false,
          errorRaised: false,
          errorMessage: '',
          requestSuccess: true,
        }) : response === 403 ?
        setValues({
          ...values,
          loading: false,
          errorRaised: true,
          errorMessage: "Email was used with Google login. Click on 'Continue with Google' on login page. ",
        }) : response === 404 ?
        setValues({
          ...values,
          loading: false,
          errorRaised: true,
          errorMessage: "Email was not found!",
        })
        :
        setValues({
          ...values,
          loading: false,
          errorRaised: true,
          errorMessage: "Something went wrong. Please try again!",
        })
        

      }
     
    }
    
    
  

  return (
    <>
    <Container>
      <Stack direction="row" justifyContent="center" mt={10}>
        <Paper elevation={5} sx={{borderRadius:"35px", textAlign:"center", padding:"10px", width:"422px"}}>
          <Typography
           sx={{padding:"35px"}}
           variant="h6"
           component="h2"
           gutterBottom
           >
            Property Management App
          </Typography>

          <Typography
           sx={{padding:"35px"}}
           variant="h5"
           component="h2"
           gutterBottom
           >
            Forgot My Password
          </Typography>

          <Typography
           variant="body2"
           sx={{textAlign:"justify"}}
           gutterBottom
           >
            Did you forget your password? Don't worry. 
            
            Enter your email below, click on "Reset Password" and you will receive an email with a password reset link.
          </Typography>
    
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            {values.requestSuccess ?
            <Alert variant="outlined" severity="success" sx={{marginTop:"40px", marginBottom:"55px"}}>
              Done! If there are any accounts associated with that email address, you'll get an email with a reset link shortly.
            </Alert> : null}
            {values.requestSuccess ? null : values.errorRaised ?
            <TextField
            error
            name="email"
            placeholder="Email Address"
            margin="normal"
            fullWidth
            helperText={values.errorMessage}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon />
                </InputAdornment>
              ),
            }}
            />
            :
            <TextField
            name="email"
            variant="outlined"
            placeholder="Email Address"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon />
                </InputAdornment>
              ),
            }}
            />
             }
            {values.requestSuccess ? null :
            <LoadingButton
            type="submit"
            loading={values.loading}
            variant="contained"
            sx={{marginBottom:"30px", marginTop:"20px", width:"50%"}}
            >
              Reset password
            </LoadingButton>
          }
          </form>
        </Paper>
      </Stack>
    </Container>
    
    </>
  )
        }

export default ForgotPasswordPage