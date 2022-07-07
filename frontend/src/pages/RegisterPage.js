import { Alert, Box, Divider, Paper, Stack, ToggleButton, TextField, IconButton, InputAdornment, ToggleButtonGroup, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState, useEffect } from 'react'
import { MuiLink } from '../components/MuiLink';

const RegisterPage = () => {
    // USER_TYPES = (
    //     (1, 'OWNER'),
    //     (2, 'TENANT')
    // )
    const [values, setValues] = useState({
        userType: '',
        disabled: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
        },
        loading: false,
        username:'',
        email:'',
        password: '',
        showPassword1: false,
        showPassword2: false,
        success: false
      });
    
    const [error, setError] = useState({
        password1: {
            raised: false,
            disable: false,
            message: ''
        },
        password2: {
            raised: false,
            disable: false,
            message: ''
        },
        username: {
            raised: false,
            disable: false,
            message: ''
        },
        email: {
            raised: false,
            disable: false,
            message: ''
        },
        userType: {
            raised: false,
            disable: false
        }
    });

    const styles = {
        errorTextField: {
            '& .MuiFilledInput-root': {
                '&.Mui-error':{
                    border: '1px solid #d32f2f'
                }
            }
        },
        userTypeButton: {
            1: {
                border: `1px solid ${error.userType['raised'] ? '#d32f2f': '#66666'}`, 
                borderBottom:"0",
                '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                    backgroundColor:"#e8f4fd",
                    fontWeight: "500",
                    color: "#1976d2",
                }
            },
            2: {
                border: `1px solid ${error.userType['raised'] ? '#d32f2f': '#66666'}`, 
                '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                    backgroundColor: '#ecf7ed',
                    fontWeight: "500",
                    color: '#388e3c',
                }
            }
            
        },
        textField:{
            '& .MuiFilledInput-root': {
                '&:hover': {
                    backgroundColor: `${values.userType === '1' ? '#e8f4fd' : values.userType === '2' ? '#ecf7ed' : 'transparent'}`,
                    borderColor: `${values.userType === '1' ? '#1976d2' : values.userType === '2' ? '#388e3c' : '#000'}`,
                    borderRadius: '10px',
                },
                '&.Mui-focused': {
                    backgroundColor: `${values.userType === '1' ? '#e8f4fd' : values.userType === '2' ? '#ecf7ed' : 'transparent'}`,
                    borderColor: `${values.userType === '1' ? '#1976d2' : values.userType === '2' ? '#388e3c' : '#000'}`,
                  }},
                '& .MuiInputLabel-shrink, &.Mui-focused':{
                    color: `${values.userType === '1' ? '#1976d2' : values.userType === '2' ? '#388e3c' : '#666666'}`,
                }
        }
        }   

    const accTypeClick = (type) => {
        setError((prev) => ({
            ...prev,
            userType: {
                raised: false,
                disabled: false,
            }
        }))
        setValues({
             ...values,
             userType: type,
        })
    }

    const handleClickShowPassword = (pwd) => {
        pwd === 'password1' ? 
        setValues({ ...values,
          showPassword1: !values.showPassword1,
         })
         :
         setValues({ ...values,
            showPassword2: !values.showPassword2,
           })
      };
    
    const handleChange = (prop) => {
        setError({ 
            ...error,
            [prop]: {
                raised: false, 
                disable: false,
                message: ''}
         })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = []
        if(values.userType === ''){
            setError({
                ...error,
                userType: {
                    raised: true,
                    disable: true,
                }
            })
        }

        
        for (let i = 0; i < e.target.length; i++){
            if(e.target.elements[i].getAttribute("name") !== null){
                formData.push({
                    'name' : e.target.elements[i].getAttribute("name"),
                    'value' : e.target.elements[i].value === '' ? null : e.target.elements[i].value
            })
            }
        }
        formData.forEach((item) => (item.value ?? 
            setError(prev => ({
            ...prev,
            [item.name]: {
                raised: true, 
                disable: true,
                message: 'This field cannot be empty.'},
            }))
        ))
            
        if(e.target.email.value !== ''){
            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(e.target.email.value)){
                setError(prev => ({
                    ...prev,
                    email: {
                        raised: true,
                        disable: true,
                        message: 'Email is not valid.'
                    }
                }))
             }
        }

        if(e.target.password1.value !== ''){
            if(e.target.password1.value.length < 6){
                setError(prev => ({
                    ...prev,
                    password1: {
                        raised: true,
                        disable: true,
                        message: 'Password must contain at least 6 characters.'
                    }
                }))
            }
            if(e.target.password2.value !== ''){
                if(e.target.password2.value.length < 6){
                setError(prev => ({
                    ...prev,
                    password2: {
                        raised: true,
                        disable: true,
                        message: 'Password must contain at least 6 characters.'
                    }
                }))
                }else if(e.target.password1.value !== e.target.password2.value){
                    setError(prev => ({
                        ...prev,
                        password2: {
                            raised: true,
                            disable: true,
                            message: `Passwords don't match.`
                        }
                    }))
                }
            }
        }
        setValues({
            ...values,
            loading: true,
            email: e.target.email.value,
            password: e.target.password1.value,
            username: e.target.username.value,
        })

    }
    useEffect(() => {

        let registerUser = async () => {
            let response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username': values.username.toLowerCase(), 'email': values.email.toLowerCase(), 'password': values.password, 'user_type': values.userType})
        })
            let data = await response.json()
            let status = response.status
            
            if(status === 201){
                setValues({
                    ...values,
                    success: true,
                    loading: false,
                })
            }else if(status === 400){
                Object.entries(data).forEach(item => {
                    setError((prev) => ({
                        ...prev,
                        [item[0]]: {
                            raised: true,
                            disable: true,
                            message: item[1][0]
                        }
                    }))
            })
            }
        }

        if(values.loading === true){
            let goRegister = true
            Object.entries(error).forEach(item => {
                if(item[1]['raised'] === true){
                    goRegister = false
                    setValues({
                        ...values,
                        loading: false
                    })
                }else{
                    return
                }
            })
            if(goRegister === true){
                registerUser()
            }

    }}, [values.loading, error])
    
  return (
    <>
    <Box sx={{minWidth: "100%", height: "100vh"}}>
        <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        >
            <Box sx={{height: "100vh", width: "82vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Paper elevation={2} sx={{borderRadius:"35px", textAlign:"center", padding:"10px", width:"422px"}}>
                    <Typography
                    sx={{padding:"35px"}}
                    variant="h6"
                    gutterBottom
                    >
                        Property Management App
                    </Typography>
                    <Typography
                    variant="h5"
                    gutterBottom
                    mb={3}
                    sx={{
                        background: `linear-gradient(270deg, rgba(255,255,255,1) 34%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 66%, rgba(255,255,255,1) 66%), 
                        linear-gradient(0deg, ${values.userType === '1' ? `rgba(25, 118, 210, 1)` : values.userType === '2' ? 
                        `rgba(56, 142, 60, 1)` : `rgba(255, 255, 255, 0)`} 12%, ${values.userType === '1' ? `rgba(25, 118, 210, 1)` : values.userType === '2' ? 
                        `rgba(56, 142, 60, 1)` : `rgba(255, 255, 255, 0)`} 12%, ${values.userType === '1' ? `rgba(25, 118, 210, 1)` : values.userType === '2' ? 
                        `rgba(56, 142, 60, 1)` : `rgba(255, 255, 255, 0)`} 23%, rgba(255,255,255,1) 23%)`
                }}
                    >
                        Registration
                    </Typography>
                    <Stack direction="column" justifyContent="flex-start" alignItems="center">
                        <Box sx={{justifyContent: "flex-start", width: "90%", display: "flex", alignItems: "center"}}>
                            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                               Account type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Typography>
                            <ToggleButtonGroup
                            orientation="vertical"
                            disabled={values.success ?? true}
                            exclusive
                            sx={{position: "relative", left: "7%"}}
                            >
                                <ToggleButton size="small" onClick={()=>{ values.userType === '1' ? accTypeClick('') : accTypeClick('1') }} selected={values.userType === '1'} value="list" aria-label="list" 
                                    sx={styles.userTypeButton[1]}>
                                    <MapsHomeWorkRoundedIcon sx={{marginRight: "5px"}} />
                                    <Divider orientation="vertical" flexItem />
                                    &nbsp; OWNER
                                </ToggleButton>
                                <ToggleButton size="small" onClick={()=>{ values.userType === '2' ? accTypeClick('') : accTypeClick('2') }} selected={values.userType === '2'} value="list"
                                    sx={styles.userTypeButton[2]} >
                                    <PersonRoundedIcon sx={{marginRight: "5px"}} />
                                    <Divider orientation="vertical" flexItem />
                                    &nbsp; TENANT
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        {error.userType['raised'] && <Alert variant="outlined" sx={{borderRadius:"10px", paddingTop:"1px", paddingBottom:"1px", marginBottom:"5px", marginTop:"10px"}} onClose={() => {setError({
                        ...error,
                        userType: {
                            raised: false,
                            disable: false
                        },
                        });}} severity="error">Select the user type.</Alert>}
                        <Divider sx={{width:"90%", borderBottomWidth: "2px", marginTop: "10px", marginBottom: "10px", backgroundColor: `${values.userType === '1' ? '#1976d2' : values.userType === '2' ? '#388e3c' : '#f2f2f2' }`}} />
                        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                            {error.username['raised'] ?
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            error
                            name="username"
                            type="text"
                            variant="filled"
                            label="Username"
                            onChange={() => handleChange('username')}
                            placeholder="Username"
                            fullWidth
                            margin="normal"
                            helperText={error.username['message']}
                            sx={styles.errorTextField}
                            
                            />
                            :
                            <TextField
                            disabled={values.success ?? true}
                            InputProps={{ disableUnderline: true }}
                            name="username"
                            type="text"
                            variant="filled"
                            label="Username"
                            placeholder="Username"
                            fullWidth
                            margin="normal"
                            sx={styles.textField}
                            />
                            }
                            {error.email['raised'] ?
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            error
                            name="email"
                            type="text"
                            placeholder="Email Address"
                            onChange={() => handleChange('email')}
                            label="Email"
                            margin="normal"
                            fullWidth
                            helperText={error.email['message']}
                            variant="filled"
                            sx={styles.errorTextField}
                            />
                            :
                            <TextField
                            disabled={values.success ?? true}
                            InputProps={{ disableUnderline: true }}
                            name="email"
                            type="text"
                            variant="filled"
                            label="Email"
                            placeholder="Email Address"
                            fullWidth
                            margin="normal"
                            sx={styles.textField}
                            />
                            }
                            {error.password1['raised'] ?
                            <TextField
                            error
                            name="password1"
                            type={values.showPassword1 ? 'text' : 'password'}
                            placeholder="******"
                            label="Password"
                            onChange={() => handleChange('password1')}
                            margin="normal"
                            fullWidth
                            helperText={error.password1['message']}
                            variant="filled"
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={() => handleClickShowPassword('password1')}>
                                      {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )}}
                            sx={styles.errorTextField}
                            />
                            :
                            <TextField
                            disabled={values.success ?? true}
                            name="password1"
                            type={values.showPassword1 ? 'text' : 'password'}
                            variant="filled"
                            placeholder="******"
                            label="Password"
                            helperText="At least 6 characters (letters, numbers, symbols)."
                            fullWidth
                            margin="normal"
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={() => handleClickShowPassword('password1')}>
                                      {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )}}
                            sx={styles.textField}  
                            />
                            }
                            {error.password2['raised'] ?
                            <TextField
                            error
                            name="password2"
                            type={values.showPassword2 ? 'text' : 'password'}
                            placeholder="******"
                            label="Confirm password"
                            onChange={() => handleChange('password2')}
                            margin="normal"
                            fullWidth
                            helperText={error.password2['message']}
                            variant="filled"
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={() => handleClickShowPassword('password2')}>
                                      {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )}}
                            sx={styles.errorTextField}
                            />
                            :
                            <TextField
                            disabled={values.success ?? true}
                            name="password2"
                            type={values.showPassword2 ? 'text' : 'password'}
                            variant="filled"
                            placeholder="******"
                            label="Confirm password"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={() => handleClickShowPassword('password2')}>
                                      {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )}}
                            sx={styles.textField}  
                            />
                            }
                            {values.success 
                            ? 
                            <Alert variant="outlined" severity="success" sx={{marginTop:"5px", marginBottom:"15px", justifyContent:"left", alignItems:"left"}}>
                                Account created successfully! Check your email inbox for the activation link.
                                <MuiLink to="/login" variant="subtitle1" text="Log in" />
                            </Alert>
                            :
                            <LoadingButton
                            disabled={error.userType['disable'] || error.username['disable'] || error.email['disable'] || error.password1['disable'] || error.password2['disable'] || values.success}
                            type="submit"
                            loading={values.loading}
                            variant="contained"
                            sx={{marginBottom:"30px",
                                 marginTop:"20px", 
                                 width:"50%",
                                 backgroundColor: `${values.userType === '1' ? '#1976d2' : values.userType === '2' ? '#388e3c' : null}`,
                                 '&:hover': {
                                     backgroundColor: `${values.userType === '2' ? '#47854a' : null}`
                                 }
                                }}
                            >
                            Create account
                            </LoadingButton>
                            }
                        </form>
                        <MuiLink to="/login" variant="subtitle2" text="Already registered? Click here to log in." />
                    </Stack>
                </Paper>
            </Box>
            <Box sx={{height: "100vh", width: "100vw", borderRadius: "50px 0 0 50px", background:"#fff", display: {xs: "none", lg:"block"}}} />
        </Stack>
    </Box>
    
    
    </>
  )
}

export default RegisterPage