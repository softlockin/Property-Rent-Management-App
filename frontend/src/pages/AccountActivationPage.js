import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import { useParams } from 'react-router-dom'
import { Container, Alert, Paper, Stack, Typography, Button, SvgIcon } from '@mui/material';
import { MuiLink } from '../components/custom/MuiLink';

const AccountActivationPage = () => {
    let { token } = useParams()
    const [values, setValues] = useState({
        errorRaised: false,
        errorMessage: '',
        success: false,
        resendButton: false,
        resendSuccess: false,
        resendSuccessButFail: false,
        resendSuccessMessage: ''
    })

    function CongratsIcon(props) {
        return (
          <SvgIcon {...props} viewBox="0 5 40 30" sx={{width:"100px", height:"100px"}}>
            <g xmlns="http://www.w3.org/2000/svg" fill="none" fillRule="evenodd">
                <path xmlns="http://www.w3.org/2000/svg" d="M12.007 15.888L1.055 36.403a1.883 1.883 0 0 0 .328 2.214c.587.586 1.485.72 2.215.328l20.579-10.973" stroke="#1A82E2"/>
                <path d="M12.007 15.888L1.055 36.403a1.883 1.883 0 0 0 .328 2.214c.587.586 1.485.72 2.215.328l20.579-10.973" />
                <ellipse xmlns="http://www.w3.org/2000/svg" stroke="#1A82E2" transform="rotate(45.004 18.93 21.08)" cx="18.93" cy="21.08" rx="8.961" ry="4.135"/>
                <path xmlns="http://www.w3.org/2000/svg" d="M27.412 20.362a8.277 8.277 0 0 1 11.696 0" stroke="#FF4081"/>
                <path xmlns="http://www.w3.org/2000/svg" d="M30.125 13.75l5.848-1.947" stroke="#4CB04F"/>
                <path xmlns="http://www.w3.org/2000/svg" d="M26.227 9.853l1.95-5.85" stroke="#00BCD4"/>
                <path xmlns="http://www.w3.org/2000/svg" d="M19.615 12.565a8.27 8.27 0 0 0 0-11.697" stroke="#18C96E"/>
                <ellipse xmlns="http://www.w3.org/2000/svg" stroke="#7B1FA2" cx="25.943" cy="13.752" rx=".835" ry=".835"/>
                <circle xmlns="http://www.w3.org/2000/svg" stroke="#FF5722" cx="13.557" cy="8.877" r=".833"/>
                <ellipse xmlns="http://www.w3.org/2000/svg" stroke="#DEA7E8" cx="33.18" cy="6.827" rx=".833" ry=".833"/>
                <ellipse xmlns="http://www.w3.org/2000/svg" stroke="#FDD835" cx="32.075" cy="23.5" rx=".833" ry=".833"/>
                <path xmlns="http://www.w3.org/2000/svg" d="M0 0h40v40H0z"/>
            </g>
          </SvgIcon>
        );
      }

    
    const resendLink = async () => {
        if(!jwt_decode(token).email){
            setValues({
                ...values,
                resendSuccess: true,
                resendSuccessButFail: true,
                resendSuccessMessage: 'Something went wrong!'
            })
        }else{
            let response = await fetch(`http://127.0.0.1:8000/api/verify-email/`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email': jwt_decode(token).email}),
        })
        let data = await response.json()
        if(response.status === 200){
            setValues({
                ...values,
                resendSuccess: true,
                resendSuccessMessage: data.message
            })
        }else{
            setValues({
                ...values,
                resendSuccess: true,
                resendSuccessButFail: true,
                resendSuccessMessage: 'Something went wrong!'
            })
        }
        }
        

}


    useEffect(() => {
        async function activateAccount(){
            let response = await fetch(`http://127.0.0.1:8000/api/verify-email/?token=`+token, {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            })
            let data = await response.json()

            if(response.status === 400){
                setValues({
                    ...values,
                    errorRaised: true,
                    errorMessage: data.error,
                  });
            }

            if(response.status === 401){
                setValues({
                    ...values,
                    errorRaised: true,
                    errorMessage: data.error,
                    resendButton: true
                  });
            }

            if(response.status === 200){
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
            activateAccount()
        }catch(err){
            setValues({
                ...values,
                errorRaised: true,
                errorMessage: 'Invalid activation link',
              });
        }
        
    }, [])

  return (
    <>
    <Container>
      <Stack direction="row" justifyContent="center" sx={{marginTop: "150px"}}>
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
                    <CongratsIcon fontSize="large" />
                    <Typography 
                        variant="body1"
                        mt={2}
                        sx={{color:"green"}} 
                        >Account activated successfully!</Typography>
                    <MuiLink to="/login" variant="subtitle1" text="Log in" />
                </Stack>   
                </>
                 
                : 
                <Alert variant="outlined" severity="error" sx={{marginTop:"5px", marginBottom:"15px"}}>
                    {values.errorMessage+'.'} {values.resendButton ? 'Click on "Resend Email" for a new activation link.' : null}
                </Alert> }
                {values.resendButton 
                ? 
                <Stack sx={{height:"70px"}} direction="column" justifyContent="flex-start" alignItems="center">
                    <Button variant="contained" disabled={values.resendSuccess ?? true} onClick={() => {resendLink()}}>Resend Email</Button>
                    {values.resendSuccess 
                    ? <Typography 
                        variant="caption" 
                        sx={{color:`${values.resendSuccessButFail ? "red" : "green"}`}} 
                        >{values.resendSuccessMessage}</Typography> 
                    : null
                    }
                </Stack>    
                 : null}
            </Stack> 
            
        </Paper>
      </Stack>
    </Container>
    
    </>
  )
}

export default AccountActivationPage