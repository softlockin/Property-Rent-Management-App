import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import GoogleLoginButton from '../components/login/GoogleLoginButton';
import { Alert, Container, Divider, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { MuiLink } from '../components/custom/MuiLink';
import backgroundImg from '../assets/images/bgpic.jpg';


const LoginPage = () => {
  let {loginUser, user} = useContext(AuthContext)

  const navigate = useNavigate()

  const [values, setValues] = useState({
    disabled1: false,
    disabled2: false,
    loading: false,
    email:'',
    password: '',
    showPassword: false,
    errorP1Raised: false,
    errorP1Message: '',
    errorP2Raised: false,
    errorP2Message: '',
    errorRaised: false,
    errorMessage: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values,
      disabled1: (prop === 'email') ? false : values.disabled1,
      disabled2: (prop === 'password') ? false : values.disabled2,
      errorP1Raised: (prop === 'email') ? false : values.errorP1Raised,
      errorP2Raised: (prop === 'password') ? false : values.errorP2Raised,
      [prop]: event.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(e.target.email.value === ''){
      if(e.target.password.value === '' ){
        setValues({
          ...values,
          disabled1: true,
          disabled2: true,
          errorP1Raised: true,
          errorP1Message: 'Email is required.',
          errorP2Raised: true,
          errorP2Message: 'Password is required.'
        });
      }else{
      setValues({
          ...values,
          disabled1: true,
          errorP1Raised: true,
          errorP1Message: 'Email is required.',
        });}
    }else if(e.target.password.value === '' ){
      if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(e.target.email.value)){
        setValues({
          ...values,
          disabled1: true,
          disabled2: true,
          errorP1Raised: true,
          errorP1Message: 'Email address is not valid.',
          errorP2Raised: true,
          errorP2Message: 'Password is required.'
        });
      }else{
      setValues({
        ...values,
        disabled2: true,
        errorP2Raised: true,
        errorP2Message: 'Password is required.',
      });}
    }else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(e.target.email.value)){
      setValues({
        ...values,
        disabled1: true,
        errorP1Raised: true,
        errorP1Message: 'Please enter a valid email address.',
      });
    }else{
      setValues({
        ...values,
        loading: true,
      });

      let response = await loginUser(e)
      if(response.status === 401){
      setValues({
        ...values,
        loading: false,
        password: '',
        errorRaised: true,
        errorMessage: response.error,
      });
    }
    }
    
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  useEffect(() => {
    if(user){
        navigate('/')
    }
    

  }, [navigate, user])

  return (
    <>
    <Container >
      <Stack direction="row" justifyContent="center" mt={10}>
        <Paper elevation={2} sx={{borderRadius:"35px", textAlign:"center", padding:"10px", width:"422px"}}>
          <Typography
           sx={{padding:"35px"}}
           variant="h5"
           component="h1"
           gutterBottom
           >
            Property Management App
          </Typography>
          <Stack direction="row" justifyContent="center" mb={3} mt={5}>
            <GoogleLoginButton />
          </Stack>
          <Divider sx={{margin:"10px"}}>OR</Divider>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            {values.errorP1Raised ? <TextField
            error
            label="Your email"
            name="email"
            variant="outlined"
            onChange={handleChange('email')}
            helperText={values.errorP1Message}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon />
                </InputAdornment>
              ),
            }} />
            :
            <TextField 
            label="Your email"
            name="email"
            variant="outlined"
            fullWidth
            onChange={handleChange('email')}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRoundedIcon />
                </InputAdornment>
              ),
            }}
            />}
            {values.errorP2Raised ? <TextField
            error 
            label="Your password"
            name="password"
            variant="outlined"
            helperText={values.errorP2Message}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyRoundedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {values.password &&
                  <IconButton onClick={handleClickShowPassword}>
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  }
                </InputAdornment>
              ),
            }} />
            :
            <TextField 
            label="Your password"
            name="password"
            variant="outlined"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyRoundedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {values.password &&
                  <IconButton onClick={handleClickShowPassword}>
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  }
                </InputAdornment>
              ),
            }}
            />}
            {values.errorRaised && <Alert variant="outlined" sx={{borderRadius:"10px", marginBottom:"5px"}} onClose={() => {setValues({
            ...values,
            errorRaised: false,
            errorMessage: '',
            });}} severity="error">{values.errorMessage}</Alert>}
            <Stack direction="row" justifyContent="left">
            <MuiLink to="/forgot-password" variant="" text="Reset password" />
            </Stack>
            <LoadingButton
            disabled={values.disabled1 || values.disabled2}
            type="submit"
            loading={values.loading}
            loadingPosition="end"
            variant="contained"
            elevation={0}
            sx={{marginTop:"10px", marginBottom:"30px", width:"50%", boxShadow:"0"}}
            endIcon={<ArrowForwardRoundedIcon />}
            >
              Log In
            </LoadingButton>
          </form>
          <Typography
           variant="subtitle2"
           >
            New around here?
          </Typography>
          <Stack direction="row" justifyContent="center" mb={2}>
          <MuiLink to="/register" variant="" text="Register new account" />
          </Stack>
        </Paper>
      </Stack>
    </Container>
    
    </>
  )
}

export default LoginPage