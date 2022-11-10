import React, { useState } from 'react';
import { Box, Grid, MenuItem, TextField, Select, Button, Modal, Typography, useTheme } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const AddPropertyModal = (props) => {
    
    const theme = useTheme()
    const [loading, setLoading] = useState(false)
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
        container: {
            width: "85vw", 
            height: "100%",
            position: "absolute", 
            top: "0", 
            left: "15vw",
            [theme.breakpoints.down('lg')]: {
                width: "calc(100% - 56px)",
                left: "56px"
            }
        },
        modal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "80%",
            maxWidth: "700px",
            minHeight: "350px",
            bgcolor: 'background.paper',
            borderRadius: '7px',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            padding: "0",
            [theme.breakpoints.down('bsx')]: {
                width: "95%",
            }
        },
        textField:{
            '& .MuiFilledInput-root': {
                '&:hover': {
                    borderColor: theme.palette.primary.main
                },
                '&.Mui-focused': {
                    borderColor: theme.palette.primary.main,
                  }},
                '& .MuiInputLabel-shrink, &.Mui-focused':{
                    // color: ,
                },
            '& .MuiFilledInput-input': {
                height: "0px",
                backgroundColor: "white"
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
                backgroundColor: "white"
            }
                
        },
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
                  'Authorization':'Bearer ' + String(props.authTokens.access)
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
            let data = await response.json()
            setLoading(false)
            
            if(status === 201){
                setTimeout(function(){
                    props.setSnackbar(prev => ({
                        ...prev,
                        open: true,
                        type: 'success',
                        message: 'Property added!'
    
                    }))
                }, 500)
                
                clearInput()
                setTimeout(function(){
                    props.setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
                props.setProperties(prev => ([data, ...prev]))
                props.setModalOpen(false)
            }else{
                props.setSnackbar(prev => ({
                    ...prev,
                    open: true,
                    type: 'error',
                    message: 'Something went wrong!'

                }))
                clearInput()
                setTimeout(function(){
                    props.setSnackbar(prev => ({
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
    <Modal
        open={props.modalOpen}
    >
        <Box sx={styles.modal}>
            <Typography variant="h5" sx={{color: "#02143d", fontWeight: "600", margin: "10px 0 10px 10px"}}>
                Add property
            </Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Box sx={{backgroundColor: "#f2f2f2", padding: "20px"}}> 
                <Grid container spacing={0} sx={{width: "100%", margin: "0", padding: "0"}}>
                    <Grid item sm={12}>
                        <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                            Enter the details of the property you want to add.
                        </Typography>
                    </Grid>
                    <Grid item sm={7}>
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
                    <Grid item sm={3}>
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
                    <Grid item sm={2}>
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
                    <Grid item sm={6}>
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
                    <Grid item sm={3}>
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
                    <Grid item sm={3}>
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
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end", padding: "20px"}}>
                <Button onClick={() => props.setModalOpen(false)} size="small" variant="outlined" sx={{color: "#7d7d7d", border: "1px solid #7d7d7d", "&:hover": {border: "1px solid #7d7d7d", backgroundColor: "unset"}}}>
                    Cancel
                </Button>
                <LoadingButton
                type="submit"
                loadingPosition="start"
                loading={loading}
                variant="outlined"
                elevation={0}
                size="small"
                sx={{width:"75px", boxShadow:"0", marginLeft: "10px"}}
                startIcon={<AddRoundedIcon />}
                >
                    Add
                </LoadingButton>
            </Box>
            </form>
        </Box>
    </Modal>
  )
}

export default AddPropertyModal