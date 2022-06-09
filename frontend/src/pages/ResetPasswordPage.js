import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Alert, Paper, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MuiLink } from '../components/MuiLink';



const ResetPasswordPage = () => {
    let { token } = useParams()
    const navigate = useNavigate()

    const [values, setValues] = useState({
        loading: false,
        errorP1Raised: false,
        errorP1Message: '',
        errorP2Raised: false,
        errorP2Message: '',
        errorRaised: false,
        errorMessage: '',
        resetSuccess: false,
      });

    let resetPassword = async (e)=>{
        let response = await fetch(`http://127.0.0.1:8000/api/reset-password/?token=`+token, {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'password':e.target.password1.value}),
    })
        return response.status
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(e.target.password1.value === ''){
            setValues({
                ...values,
                errorP1Raised: true,
                errorP1Message: 'Please enter a new password.',
                errorP2Raised: false,
                errorP2Message: ''
              });
        }else if(e.target.password2.value === ''){
            setValues({
                ...values,
                errorP2Raised: true,
                errorP2Message: 'Please confirm the new password.',
                errorP1Raised: false,
                errorP1Message: '',
              });
        }else if(!(/^[A-Za-z0-9\d@$!%*?&]{6,}$/.test(e.target.password1.value))){
            setValues({
                ...values,
                errorP1Raised: true,
                errorP1Message: 'The password must have at least 6 characters (letters, numbers, special characters).',
                errorP2Raised: false,
                errorP2Message: ''
              });
        }else if(e.target.password1.value !== e.target.password2.value){
                setValues({
                    ...values,
                    errorP2Raised: true,
                    errorP2Message: 'Passwords do not match!',
                    errorP1Raised: false,
                    errorP1Message: ''
                  });
        }else{
            let resetPasswordResponse = await resetPassword(e)
            if (resetPasswordResponse !== 200){
                setValues({
                    ...values,
                    errorRaised: true,
                    errorMessage: 'Something went wrong. Please try again.',
                  });
            }else{
                setValues({
                    ...values,
                    errorP2Raised: false,
                    errorP2Message: '-',
                    errorP1Raised: false,
                    errorP1Message: '',
                    resetSuccess: true
                  });
                setTimeout(function(){
                    navigate('/login')
                }, 2500);
            }
        }
        
        }
    

    useEffect(() => {
        async function verifyResetLink(){
            let response = await fetch(`http://127.0.0.1:8000/api/token/verify/`, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'token':token}),
        })
            if(response.status !== 200){
                setValues({
                    ...values,
                    errorRaised: true,
                    errorMessage: 'Reset link is broken or expired.',
                  });
            }
        }
        verifyResetLink()
        
    }, [])

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
            Reset your password
          </Typography>

          <Typography
           variant="body2"
           sx={{textAlign:"justify"}}
           gutterBottom
           >
            Choose a new password here, then log in to your account.
          </Typography>
    
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            {values.errorP1Raised ?
            <TextField
            error
            name="password1"
            type="password"
            placeholder="New password"
            margin="normal"
            fullWidth
            helperText={values.errorP1Message}
            variant="outlined"
            />
            :
            <TextField
            disabled={values.errorRaised ? true : values.resetSuccess ? true : null}
            name="password1"
            type="password"
            variant="outlined"
            placeholder="New password"
            fullWidth
            margin="normal"
            />
             }
            {values.errorP2Raised ?
            <TextField
            error
            name="password2"
            type="password"
            placeholder="Confirm password"
            margin="normal"
            fullWidth
            helperText={values.errorP2Message}
            variant="outlined"
            />
            :
            <TextField
            disabled={values.errorRaised ? true : values.resetSuccess ? true : null}
            name="password2"
            type="password"
            variant="outlined"
            placeholder="Confirm password"
            fullWidth
            margin="normal"
            />
             }
            <LoadingButton
            disabled={values.errorRaised ? true : values.resetSuccess ? true : null}
            type="submit"
            loading={values.loading}
            variant="contained"
            sx={{marginBottom:"30px", marginTop:"20px", width:"50%"}}
            >
              Set Password
            </LoadingButton>
            {values.errorRaised ? <>
            <Alert variant="outlined" severity="error" sx={{marginTop:"5px", marginBottom:"20px"}}>
            {values.errorMessage} 
            </Alert> 
            <MuiLink to="/forgot-password" variant="subtitle2" text="Click here for a new password reset link." /></>
            : null}
            {values.resetSuccess ? 
            <Alert variant="outlined" severity="success" sx={{marginTop:"5px", marginBottom:"15px"}}>
              Password changed! Redirecting to login page...
            </Alert> : null}
          </form>
        </Paper>
      </Stack>
    </Container>
    
    </>
    
  )
}

export default ResetPasswordPage