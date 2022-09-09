import { LoadingButton } from '@mui/lab'
import { Grid, Paper, Typography, TextField, Select, MenuItem, Snackbar, Alert } from '@mui/material'
import Slide from '@mui/material/Slide';
import AuthContext from '../../context/AuthContext'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React, { useState, useContext, useEffect } from 'react'

const QuickAdd = (props) => {

    const {authTokens} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: 'warning',
        message: '',
    })
    
    const [inputFields, setInputFields] = useState({
        name: '',
        price: '',
        street: '',
        number: '',
        city: '',
        currency: '2'
    })
    const [errors, setErrors] = useState({
        name: {
            raised: false,
            message: '',
        },
        price: {
            raised: false,
            message: '',
        },
        street: {
            raised: false,
            message: '',
        },
        number: {
            raised: false,
            message: '',
        },
        city: {
            raised: false,
            message: '',
        },
    })

    const styles = {
        textField:{
            '& .MuiFilledInput-root': {
                '&:hover': {
                    borderRadius: '10px',
                },
                '&.Mui-focused': {
                    // backgroundColor: ,
                    // borderColor: ,
                  }},
                '& .MuiInputLabel-shrink, &.Mui-focused':{
                    // color: ,
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
    }

    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
      }

    const clearInput = () =>{
        setInputFields({
            name: '',
            price: '',
            street: '',
            number: '',
            city: '',
            currency: '2',
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({
            name: {
                raised: false,
                message: '',
            },
            price: {
                raised: false,
                message: '',
            },
            street: {
                raised: false,
                message: '',
            },
            number: {
                raised: false,
                message: '',
            },
            city: {
                raised: false,
                message: '',
            },
        })

        const addProperty = async () => {
            let response = await fetch('http://127.0.0.1:8000/api/property-items/', {
              method: 'POST',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'Bearer ' + String(authTokens.access)
              },
              body:JSON.stringify({
                  'name': inputFields.name,
                  'price': inputFields.price,
                  'address': inputFields.street+' '+ inputFields.number,
                  'city': inputFields.city,
                  'currency': inputFields.currency
                }),
              })
            let status = response.status
            setLoading(false)
            
            if(status === 201){
                setTimeout(function(){
                    setSnackbar(prev => ({
                        ...prev,
                        open: true,
                        type: 'success',
                        message: 'Property added!'
    
                    }))
                }, 500)
                
                clearInput()
                setTimeout(function(){
                    setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
                props.setData(prev => ({
                    ...prev,
                    properties_listed: prev.properties_listed + 1
                }))
            }else{
                setSnackbar(prev => ({
                    ...prev,
                    open: true,
                    type: 'error',
                    message: 'Something went wrong!'

                }))
                clearInput()
                setTimeout(function(){
                    setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
            }

        }

        // Fields validation

        let invalidFormData = []

        for (let i = 0; i < e.target.length; i++){
            if(e.target.elements[i].getAttribute("name") !== null){
                if(e.target.elements[i].value === ''){
                    invalidFormData.push(e.target.elements[i].getAttribute("name"))
                }
            }
            }
        

        invalidFormData.forEach((item) => (
            setErrors(prev => ({
            ...prev,
            [item]: {
                raised: true, 
                message: 'Can\'t be empty.'},
            }))
        ),
        );
        
        if(e.target.name.value !== ''){
            if(!(/^.{0,30}$/).test(e.target.name.value)){
                setErrors(prev=> ({
                    ...prev,
                    name: {
                        raised: true,
                        message: 'Maximum 30 characters.'
                    }
                }));
                invalidFormData.push("name")
            }
        }

        if(!(/^[0-9]+([.][0-9]+)?$/).test(e.target.price.value)){
            setErrors(prev=> ({
                ...prev,
                price: {
                    raised: true,
                    message: 'Invalid entry.'
                }
            }));
            invalidFormData.push("price")
        }else if(e.target.price.value[0] === '0'){
            setErrors(prev=> ({
                ...prev,
                price: {
                    raised: true,
                    message: 'Must be greater than 0.'
                }
            }));
            invalidFormData.push("price")
        }

        if (invalidFormData.length > 0){
            setLoading(false)
            return;
        }
    
        //Sending data

        addProperty(e)

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

        {/* //Quick add property component */}

        <Paper elevation={3} sx={{width: "48%", minHeight: "380px", borderRadius: "10px", "&.MuiPaper-root": {marginLeft: "0px"}}}>
            <Typography variant="h5" sx={{color: "#02143d", fontWeight: "600", margin: "25px 0 0 25px"}}>
                Add property
            </Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{width: "100%", padding: "25px"}}>
                    <Grid item md={12}>
                        <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                            Enter the details of the property you want to add.
                        </Typography>
                    </Grid>
                    <Grid item md={7}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Name
                        </Typography>
                        <TextField
                            InputProps={{ disableUnderline: true }}
                            name="name"
                            type="text"
                            variant="filled"
                            hiddenLabel
                            placeholder='E.g. "Apartament Mihai Bravu"'
                            fullWidth
                            margin="normal"
                            value={inputFields.name}
                            onChange={(e) => setInputFields(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                            error={errors.name['raised']}
                            sx={errors.name['raised'] ? styles.errorTextField : styles.textField}
                            helperText={errors.name['message']}
                            />
                    </Grid>
                    <Grid item md={3}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Rent
                        </Typography>
                        <TextField
                            InputProps={{ disableUnderline: true }}
                            name="price"
                            type="text"
                            variant="filled"
                            hiddenLabel
                            placeholder="0.00"
                            fullWidth
                            margin="normal"
                            value={inputFields.price}
                            onChange={(e) => setInputFields(prev => ({
                                ...prev,
                                price: e.target.value
                            }))}
                            error={errors.price['raised']}
                            sx={errors.price['raised'] ? styles.errorTextField : styles.textField}
                            helperText={errors.price['message']}
                            />
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Currency
                        </Typography>
                        <Select
                            name="currency"
                            disableUnderline
                            defaultValue={2}
                            variant="standard"
                            onChange={(e) => setInputFields(prev => ({...prev, currency: e.target.value }))}
                            sx={{marginTop: "17px", marginBottom: "9px"}}
                        >
                            <MenuItem value={1}>EUR</MenuItem>
                            <MenuItem value={2}>LEI</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Street
                        </Typography>
                        <TextField
                            InputProps={{ disableUnderline: true }}
                            name="street"
                            type="text"
                            variant="filled"
                            hiddenLabel
                            placeholder="Street"
                            fullWidth
                            margin="normal"
                            value={inputFields.street}
                            onChange={(e) => setInputFields(prev => ({
                                ...prev,
                                street: e.target.value
                            }))}
                            error={errors.street['raised']}
                            sx={errors.street['raised'] ? styles.errorTextField : styles.textField}
                            helperText={errors.street['message']}
                            />
                    </Grid>
                    <Grid item md={3}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            Number
                        </Typography>
                        <TextField
                            InputProps={{ disableUnderline: true }}
                            name="number"
                            type="text"
                            variant="filled"
                            hiddenLabel
                            placeholder="Number"
                            fullWidth
                            margin="normal"
                            value={inputFields.number}
                            onChange={(e) => setInputFields(prev => ({
                                ...prev,
                                number: e.target.value
                            }))}
                            error={errors.number['raised']}
                            sx={errors.number['raised'] ? styles.errorTextField : styles.textField}
                            helperText={errors.number['message']}
                            />
                    </Grid>
                    <Grid item md={3}>
                        <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                            City
                        </Typography>
                        <TextField
                            error={errors.city['raised']}
                            InputProps={{ disableUnderline: true }}
                            name="city"
                            type="text"
                            variant="filled"
                            hiddenLabel
                            placeholder="City"
                            fullWidth
                            margin="normal"
                            value={inputFields.city}
                            onChange={(e) => setInputFields(prev => ({
                                ...prev,
                                city: e.target.value
                            }))}
                            sx={errors.city['raised'] ? styles.errorTextField : styles.textField}
                            helperText={errors.city['message']}
                            />
                    </Grid>
                </Grid>
                <LoadingButton
                    type="submit"
                    loadingPosition="start"
                    loading={loading}
                    variant="outlined"
                    elevation={0}
                    size="small"
                    sx={{width:"75px", margin: "0 0 25px 25px", boxShadow:"0"}}
                    startIcon={<AddRoundedIcon />}
                >
                    Add
                </LoadingButton>
            </form>
        </Paper>
    </>
  )
}

export default QuickAdd