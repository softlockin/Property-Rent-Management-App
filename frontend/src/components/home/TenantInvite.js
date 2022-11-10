import { LoadingButton } from '@mui/lab';
import React, { useState, useContext, useEffect } from 'react';
import { Paper, Typography, TextField, Select, MenuItem, Snackbar, Alert, useTheme, FormHelperText, FormControl } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slide from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import AuthContext from '../../context/AuthContext';

const TenantInvite = ({properties}) => {

    const dueDayInfo = "If day is not valid when the invoice is generated, the last valid day of the month will be auto-selected."
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('lg'))
    const switchMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [loading, setLoading] = useState(false)
    const {authTokens} = useContext(AuthContext)
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: 'warning',
        message: '',
    })
    

    const [errors, setErrors] = useState({
        email: {
            raised: false,
            message: '', 
        },
        property: {
            raised: false,
            message: '',
        }
    })

    const [inputFields, setInputFields] = useState({
        property_id: '',
        email: '',
        due_day: '1',
    })

    const styles = {
        textField:{
            '& .MuiFilledInput-root': {
                '&:hover': {
                    borderRadius: '10px',
                },
                },
            '& .MuiFilledInput-input': {
                height: "0px"
            },
        },
        errorTextField: {
            '& .MuiFilledInput-root': {
                '&.Mui-error':{
                    border: '1px solid #d32f2f'
                }
            },
            '& .MuiFilledInput-input': {
                height: "0px",
            }
        },
        selectField: !switchMobile ? {
            marginTop: "17px", 
            marginBottom: "9px",
            marginRight: "17px",
            border: "1px solid #e2e2e1", 
            borderRadius: "10px", 
            paddingLeft: "12px",
            width: "200px",
            overflow: "hidden"
        } :
        {
            marginTop: "0px", 
            marginBottom: "0px",
            marginRight: "0px",
            border: "1px solid #e2e2e1", 
            borderRadius: "10px", 
            paddingLeft: "12px",
            width: "200px",
            overflow: "hidden"
        }
        ,
        errorSelectField: !switchMobile ?{
            marginTop: "17px", 
            marginBottom: "9px",
            border: "1px solid #d32f2f", 
            borderRadius: "10px", 
            paddingLeft: "12px",
            '&.MuiInput-root': {
                marginBottom: '0'
            }
        }:
        {
            marginTop: "0px", 
            marginBottom: "0px",
            border: "1px solid #d32f2f", 
            borderRadius: "10px", 
            paddingLeft: "12px",
            '&.MuiInput-root': {
                marginBottom: '0'
            }
        }
    }

    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
      }

    const clearInput = () =>{
        setInputFields({
            property_id: '',
            email: '',
            due_day: '',
        })
        setSelectedProperty(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({
            email: {
                raised: false,
                message: ''
            },
            property: {
                raised: false,
                message: ''
            },
        });

        const linkUser = async () => {
            let response = await fetch(`http://127.0.0.1:8000/api/link-request/`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({
                'email': (e.target.email.value).toLowerCase(),
                'property_id': e.target.property_id.value,
                'due_day': e.target.due_day.value

            }),
            })

            let data = await response.json()

            if(response.status === 200){
                setSnackbar(prev => ({
                    ...prev,
                    open: true,
                    type: 'success',
                    message: data['message']

                }))
                clearInput()
                setLoading(false)
                setTimeout(function(){
                    setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
            }else{
                setSnackbar(prev => ({
                    ...prev,
                    open: true,
                    type: 'error',
                    message: data['error']

                }))
                clearInput()
                setLoading(false)
                setTimeout(function(){
                    setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
            }
            }
        

        //Validating email and selected property
        
        if(selectedProperty === null){
            setErrors(prev=> ({
                ...prev,
                property: {
                    raised: true,
                    message: 'Select a property.'
                }
            }));
        }

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(e.target.email.value)){
            setErrors(prev=> ({
                ...prev,
                email: {
                    raised: true,
                    message: 'Email not valid.'
                }
            }));
            setLoading(false)
            return;
        }
        
        //Sending request

        linkUser()
    }

  return (
      <>

    <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={TransitionUp}
    >
        <Alert severity={snackbar.type} variant="filled" onClose={() => {setSnackbar(prev => ({...prev, open: false, message: ''}))}} sx={{width: '100%', backgroundColor: `${snackbar.type === 'success' ? "#48b155" : ""}`}}>
            {snackbar.message}
        </Alert>
    </Snackbar>
    <Paper elevation={3} sx={{width: matches ? "calc(48% - 10px)" : "calc(100% - 10px)", minHeight: "380px", borderRadius: "10px", borderLeft: `10px solid ${theme.palette.primary.main}`, "&.MuiPaper-root": {marginLeft: "0px"}}}>
            <Typography variant="h5" sx={{color: "#02143d", fontWeight: "600", margin: "25px 0 0 15px"}}>
                Link tenant to property {selectedProperty?.name}
            </Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid2 container spacing={1} sx={{width: "100%", padding: "25px 0px 25px 15px"}}>
                    <Grid2 sm={12}>
                        <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                            Select the rented property, enter the user's email address and select the recurring day when the rent will be due. {<br />}
                            An email for tenant's confirmation will be sent.
                        </Typography>
                    </Grid2>
                    {switchMobile ?
                    <>
                    <Grid2 xs={3.5} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Property
                        </Typography>
                    </Grid2>
                    <Grid2 xs={8.5} sx={{"& .MuiFormControl-root": {margin: "0px"}}}>
                        <FormControl error>
                            <Select
                                name="property_id"
                                disableUnderline
                                value={inputFields['property_id']}
                                displayEmpty
                                variant="standard"
                                fullWidth
                                onChange={(e) => {
                                    setInputFields(prev => ({...prev, property_id: e.target.value }));
                                    setSelectedProperty(properties.length>0 ? (e.target.value!=='' ? properties.filter((property)=>{return property.id === e.target.value}) : null) : null)
                                }}
                                sx={errors.property['raised'] ? styles.errorSelectField : styles.selectField}
                            >
                                {(()=>{
                                    let elems = properties.length>0 ? properties.map( (item, index) => {return <MenuItem key={index+1} value={item.id}>{item.name}</MenuItem>}) : []
                                    elems.unshift(<MenuItem key="0" value=''><em>Select a property</em></MenuItem>)
                                    return elems;
                                })()}
                            </Select>
                            {errors.property['raised'] ? <FormHelperText>{errors.property['message']}</FormHelperText> : null}
                        </FormControl>
                    </Grid2>
                    <Grid2 xs={12} >
                        <>
                            <Typography variant="caption" sx={{color: "#7d7d7d"}}>
                                Address: {selectedProperty ? (selectedProperty[0].address +", " + selectedProperty[0].city) : null}
                            </Typography>
                        
                        {<br />}
                        <Typography variant="caption" sx={{color: "#7d7d7d"}}>
                            Rent: {selectedProperty ? (selectedProperty[0].price + (selectedProperty[0].currency === 1 ? " EUR" : " LEI")) : null}
                        </Typography>
                        </>
                    </Grid2>
                    <Grid2 xs={3.5} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Tenant's email
                        </Typography>
                    </Grid2>
                    <Grid2 xs={8.5} sx={{"& .MuiFormControl-root": {margin: "0px"}}}>
                        <TextField
                            InputProps={{ disableUnderline: true }}
                            name="email"
                            type="text"
                            variant="filled"
                            hiddenLabel
                            placeholder="Email"
                            fullWidth
                            margin="normal"
                            value={inputFields.email}
                            onChange={(e) => setInputFields(prev => ({
                                ...prev,
                                email: e.target.value
                            }))}
                            error={errors.email['raised']}
                            sx={errors.email['raised'] ? styles.errorTextField : styles.textField}
                            helperText={errors.email['message']}
                            />
                    </Grid2>
                    <Grid2 xs={3.5} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Due day
                        </Typography>
                    </Grid2>
                    <Grid2 xs={8.5} sx={{"& .MuiFormControl-root": {margin: "0px"}}}>
                        <Select
                            name="due_day"
                            disableUnderline
                            defaultValue={1}
                            variant="standard"
                            onChange={(e) => setInputFields(prev => ({...prev, due_day: e.target.value }))}
                            sx={{border: "1px solid #e2e2e1", borderRadius: "10px", paddingLeft: "12px"}}
                        >
                            {(() => {
                                let days = [];
                                for(let i=1;i<=31;i++){
                                    days.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
                                };
                                return days;
                            })()
                            }
                            
                        </Select>
                    </Grid2>
                    </>
                    :
                    <>
                    <Grid2 sm={5}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Property
                        </Typography>
                        <FormControl error>
                            <Select
                                name="property_id"
                                disableUnderline
                                value={inputFields['property_id']}
                                displayEmpty
                                variant="standard"
                                fullWidth
                                onChange={(e) => {
                                    setInputFields(prev => ({...prev, property_id: e.target.value }));
                                    setSelectedProperty(properties.length>0 ? (e.target.value!=='' ? properties.filter((property)=>{return property.id === e.target.value}) : null) : null)
                                }}
                                sx={errors.property['raised'] ? styles.errorSelectField : styles.selectField}
                            >
                                {(()=>{
                                    let elems = properties.length>0 ? properties.map( (item, index) => {return <MenuItem key={index+1} value={item.id}>{item.name}</MenuItem>}) : []
                                    elems.unshift(<MenuItem key="0" value=''><em>Select a property</em></MenuItem>)
                                    return elems;
                                })()}
                            </Select>
                            {errors.property['raised'] ? <FormHelperText>{errors.property['message']}</FormHelperText> : null}
                        </FormControl>
                    </Grid2>
                    <Grid2 sm={4.5}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Tenant's email
                        </Typography>
                        <TextField
                            InputProps={{ disableUnderline: true }}
                            name="email"
                            type="text"
                            variant="filled"
                            hiddenLabel
                            placeholder="Email"
                            fullWidth
                            margin="normal"
                            value={inputFields.email}
                            onChange={(e) => setInputFields(prev => ({
                                ...prev,
                                email: e.target.value
                            }))}
                            error={errors.email['raised']}
                            sx={errors.email['raised'] ? styles.errorTextField : styles.textField}
                            helperText={errors.email['message']}
                            />
                    </Grid2>
                    <Grid2 sm={2.5}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Due day
                            <Tooltip title={dueDayInfo} placement="top">
                                <InfoRoundedIcon fontSize="small" sx={{display: "inline-flex", verticalAlign: "middle", color: "#7d7d7d"}} />
                            </Tooltip>
                        </Typography>
                        <Select
                            name="due_day"
                            disableUnderline
                            defaultValue={1}
                            variant="standard"
                            onChange={(e) => setInputFields(prev => ({...prev, due_day: e.target.value }))}
                            sx={{marginTop: "17px", marginBottom: "9px", border: "1px solid #e2e2e1", borderRadius: "10px", paddingLeft: "12px"}}
                        >
                            {(() => {
                                let days = [];
                                for(let i=1;i<=31;i++){
                                    days.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
                                };
                                return days;
                            })()
                            }
                            
                        </Select>
                    </Grid2>
                    <Grid2 sm={12} >
                        <>
                            <Typography variant="caption" sx={{color: "#7d7d7d"}}>
                                Address: {selectedProperty ? (selectedProperty[0].address +", " + selectedProperty[0].city) : null}
                            </Typography>
                        
                        {<br />}
                        <Typography variant="caption" sx={{color: "#7d7d7d"}}>
                            Rent: {selectedProperty ? (selectedProperty[0].price + (selectedProperty[0].currency === 1 ? " EUR" : " LEI")) : null}
                        </Typography>
                        </>
                    </Grid2>
                    </>
                }
                </Grid2>
                <LoadingButton
                    type="submit"
                    loadingPosition="start"
                    loading={loading}
                    variant="outlined"
                    elevation={0}
                    size="small"
                    sx={{margin: "11px 0 25px 15px", boxShadow:"0"}}
                    startIcon={<InsertLinkRoundedIcon />}
                >
                    Link account
                </LoadingButton>
            </form>
    </Paper>
    </>
  )
}

export default TenantInvite