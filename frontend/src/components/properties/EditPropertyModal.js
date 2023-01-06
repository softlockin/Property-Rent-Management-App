import { Box, Button, Tooltip, Divider, Modal, Stack, TextField, Typography, useTheme, Select, MenuItem } from '@mui/material';
import Grid2 from "@mui/material/Unstable_Grid2";
import { LoadingButton } from '@mui/lab';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import React, { useEffect, useState } from 'react'

const EditPropertyModal = (props) => {
    const dueDayInfo = "If day is not valid when the invoice is generated, the last valid day of the month will be auto-selected."
    const [tenant, setTenant] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [loadingLinkBtn, setLoadingLinkBtn] = useState(false)
    const [linkRequestResponse, setLinkRequestResponse] = useState({})
    const [linkRequestSent, setLinkRequestSent] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const theme = useTheme()
    const [inputFields, setInputFields] = useState({
        name: '',
        price: '',
        currency: '',
        email: '',
        due_day: '1'
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
        email: {
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
            [theme.breakpoints.down('sm')]: {maxWidth: "auto", width: "98vw"},
            bgcolor: 'background.paper',
            borderRadius: '7px',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            padding: "0"
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
                backgroundColor: "white",
                width: "100%",
            },
            '& .MuiFormControl-root, &.MuiTextField-root': {
                width: "70%",
                [theme.breakpoints.down('sm')]: {width: "90%"}
            }
        },
        errorTextField: {
            '& .MuiFilledInput-root': {
                '&.Mui-error':{
                    border: '1px solid #d32f2f'
                }
            },
            '& .MuiFilledInput-input': {
                height: "0px",
                backgroundColor: "white",
                width: "100%"
            },
            '& .MuiFormControl-root, &.MuiTextField-root': {
                width: "70%",
                [theme.breakpoints.down('sm')]: {width: "90%"}
            } 
        },
    }

    const handleClose = () => {
        setErrors({
            name: {
                raised: false,
                message: '',
            },
            price: {
                raised: false,
                message: '',
            },
            email: {
                raised: false,
                message: '',
            }
        });
        setLinkRequestSent(false);
        setLinkRequestResponse({});
        setConfirmDelete(false);
        props.setEditModalOpen(false);
    }

    const handleLink = async () => {
        setLoadingLinkBtn(true);
        setErrors(prev => ({
            ...prev,
            email: {
                raised: false,
                message: ''
            }
        }));

        const linkUser = async () => {
            let response = await fetch(`http://127.0.0.1:8000/api/link-request/`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(props.authTokens.access)
            },
            body:JSON.stringify({
                'email': inputFields.email.toLowerCase(),
                'property_id': props.data.id,
                'due_day': inputFields.due_day

            }),
            })

            let data = await response.json()
            setLinkRequestSent(true)
            if(response.status === 200){
                setLoadingLinkBtn(false)
                setLinkRequestResponse({success: true, message: data['message']})
            }else{
                setLoadingLinkBtn(false)
                setLinkRequestResponse({success: false, message: data['error']})
            }
            }
        

        //Validating email and selected property

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(inputFields.email)){
            setErrors(prev=> ({
                ...prev,
                email: {
                    raised: true,
                    message: 'Email not valid.'
                }
            }));
            setLoadingLinkBtn(false)
            return;
        }
        
        //Sending request

        linkUser()
    }

    const handleDelete = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/property/${props.data.id}/`, {
              method: 'DELETE',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'Bearer ' + String(props.authTokens.access)
              }
              })
            let status = response.status
            let data = await response.json()
            setConfirmDelete(false)

            if(status === 200){
                setTimeout(function(){
                    props.setSnackbar(prev => ({
                        ...prev,
                        open: true,
                        type: 'success',
                        message: data.message
    
                    }))
                }, 500)
                
                setTimeout(function(){
                    props.setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
                props.setRefreshList(true)
                props.setEditModalOpen(false)
            }else{
                props.setEditModalOpen(false)
                props.setSnackbar(prev => ({
                    ...prev,
                    open: true,
                    type: 'error',
                    message: data.message

                }))
                setTimeout(function(){
                    props.setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
            }
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
            email: {
                raised: false,
                message: '',
            }
        })


        const editProperty = async () => {
            let response = await fetch(`http://127.0.0.1:8000/api/property/${props.data.id}/`, {
              method: 'PUT',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'Bearer ' + String(props.authTokens.access)
              },
              body:JSON.stringify({
                  'name': inputFields.name,
                  'price': inputFields.price,
                  'currency': inputFields.currency
                }),
              })
            let status = response.status
            
            if(status === 200){
                setLoading(false)
                setTimeout(function(){
                    props.setSnackbar(prev => ({
                        ...prev,
                        open: true,
                        type: 'success',
                        message: 'Property has been edited!'
    
                    }))
                }, 500)
                
                setTimeout(function(){
                    props.setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
                props.setRefreshList(true)
                props.setEditModalOpen(false)
            }else{
                setLoading(false)
                props.setEditModalOpen(false)
                props.setSnackbar(prev => ({
                    ...prev,
                    open: true,
                    type: 'error',
                    message: 'Something went wrong!'

                }))
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
            if(e.target.elements[i].getAttribute("name") !== null && e.target.elements[i].getAttribute("name") !== 'email'){
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

        editProperty()

    }

    useEffect(()=>{
        if(props.editModalOpen === true){
            if(props.data){
                setTenant(props.data['tenant']);
                setInputFields(prev => ({
                    ...prev,
                    name: props.data?.name,
                    price: props.data?.price.toString(),
                    currency: props.data?.currency
                }))
                setShowModal(true)
            }
        }
        if(props.editModalOpen === false){
            setShowModal(false)
            setTenant(null);
            setInputFields({
                name: '',
                price: '',
                currency: '',
                email: '',
                due_day: '1'
            })
        }  
    }, [props.editModalOpen])

  return (
    <Modal
        open={showModal}
    >
        <Box sx={styles.modal}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
                <Box sx={{width: "90%"}}>
                    <Typography variant="h5" sx={{color: "#02143d", fontWeight: "600", margin: "10px 0 10px 10px"}}>
                        {props.data?.name}
                    </Typography>
                    <Typography variant="body2" sx={{color: "#7d7d7d", fontStyle: "italic", marginLeft: "10px"}}>
                        {props.data?.address}
                    </Typography> 
                </Box>
                <Box sx={{width: "10%", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", margin: "5px"}}>
                    <CloseRoundedIcon onClick={()=>{handleClose()}} sx={{color: "#7d7d7d", "&:hover": {color: "black", cursor: "pointer"}}}/>
                </Box>
            </Box>
            
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Box sx={{backgroundColor: "#f2f2f2"}}>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{width: "100%"}}
            >
                <Grid2
                    container
                    sx={{width: "100%"}}
                >
                    <Grid2
                        xs={3}
                        sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", [theme.breakpoints.down('bss')]: {display: "none"} }}
                    >
                        <BorderColorRoundedIcon sx={{fontSize: "75px", color: `${theme.palette.primary.main}4D`, margin: "10px 0 10px 0"}} />
                    </Grid2>
                    <Grid2
                        xs={9}
                        sx={{display: "flex", justifyContent: "center", alignItems: "center", [theme.breakpoints.down('bss')]: {width: "100%"}}}
                    >
                        <Grid2
                            container
                            sx={{width: "100%", padding: "20px"}}
                            spacing={2}
                        >
                            <Grid2 xs={3} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                                    Name
                                </Typography>
                            </Grid2>
                            <Grid2 xs={9}>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                name="name"
                                type="text"
                                variant="filled"
                                hiddenLabel
                                placeholder='E.g. "Apartament Mihai Bravu"'
                                value={inputFields.name}
                                onChange={(e) => setInputFields(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))}
                                error={errors.name['raised']}
                                sx={errors.name['raised'] ? styles.errorTextField : styles.textField}
                                helperText={errors.name['message']}
                                />
                            </Grid2>
                            <Grid2 xs={3} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                                    Price
                                </Typography>
                            </Grid2>
                            <Grid2 xs={9}>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                name="price"
                                type="text"
                                variant="filled"
                                hiddenLabel
                                value={inputFields.price}
                                onChange={(e) => setInputFields(prev => ({
                                    ...prev,
                                    price: e.target.value
                                }))}
                                error={errors.price['raised']}
                                sx={errors.price['raised'] ? styles.errorTextField : styles.textField}
                                helperText={errors.price['message']}
                                />
                            </Grid2>
                            <Grid2 xs={3} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                                    Currency
                                </Typography>
                            </Grid2>
                            <Grid2 xs={9}>
                                <Select
                                    name="currency"
                                    disableUnderline
                                    value={inputFields.currency}
                                    variant="standard"
                                    onChange={(e) => setInputFields(prev => ({...prev, currency: e.target.value }))}
                                >
                                    <MenuItem value={1}>EUR</MenuItem>
                                    <MenuItem value={2}>LEI</MenuItem>
                                </Select>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Divider sx={{width:"100%", backgroundColor: "#f2f2f2"}} />
                <Grid2
                    container
                    sx={{width: "100%"}}
                >
                    <Grid2
                    xs={3}
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", [theme.breakpoints.down('bss')]: {display: "none"} }}
                >
                        <LinkRoundedIcon sx={{fontSize: "75px", color: `${theme.palette.primary.main}4D`, margin: "10px 0 10px 0"}} />
                    </Grid2>
                    <Grid2
                        xs={9}
                        sx={{display: "flex", justifyContent: "center", alignItems: "center", [theme.breakpoints.down('bss')]: {width: "100%"}}}
                    >
                        {tenant === null ? 
                        <Grid2
                            container
                            sx={{width: "100%", padding: "20px"}}
                            spacing={2}
                        >
                            <Grid2 xs={12} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                                    Enter the user's email address and select the recurring day when the rent will be due. An email for tenant's confirmation will be sent.
                                </Typography>
                            </Grid2>
                            <Grid2 xs={3} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                                    Tenant's email
                                </Typography>
                            </Grid2>
                            <Grid2 xs={9}>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                name="email"
                                type="text"
                                variant="filled"
                                hiddenLabel
                                placeholder="Email"
                                onChange={(e) => setInputFields(prev => ({
                                    ...prev,
                                    email: e.target.value
                                }))}
                                error={errors.email['raised']}
                                sx={errors.email['raised'] ? styles.errorTextField : styles.textField}
                                helperText={errors.email['message']}
                                />
                            </Grid2>
                            <Grid2 xs={3} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                                    Due day
                                    <Tooltip title={dueDayInfo} placement="top">
                                        <InfoRoundedIcon fontSize="small" sx={{display: "inline-flex", verticalAlign: "middle", color: "#7d7d7d"}} />
                                    </Tooltip>
                                </Typography>
                            </Grid2>
                            <Grid2 xs={9}>
                                <Select
                                    name="due_day"
                                    disableUnderline
                                    defaultValue={1}
                                    variant="standard"
                                    onChange={(e) => setInputFields(prev => ({...prev, due_day: e.target.value }))}
                                    sx={{marginTop: "0px", border: "1px solid #e2e2e1", borderRadius: "10px", paddingLeft: "12px"}}
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
                            <Grid2 xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <LoadingButton
                                    onClick={()=>handleLink()}
                                    loadingPosition="start"
                                    loading={loadingLinkBtn}
                                    variant="contained"
                                    size="small"
                                    startIcon={<LinkRoundedIcon />}
                                >
                                    Link account
                                </LoadingButton>
                            </Grid2>
                            {linkRequestSent ?
                            <Grid2 xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Typography variant="caption" sx={{color: `${linkRequestResponse['success'] === true ? 'green' : 'red'}`}}>
                                    {linkRequestResponse['message']}
                                </Typography>
                            </Grid2>
                            : null}
                        </Grid2>
                        : 
                        <Grid2 xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="body2" sx={{color: theme.palette.success.dark}}>
                                Property is being rented by {tenant}.
                            </Typography>
                        </Grid2>}
                    </Grid2>
                </Grid2>
            </Stack>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {!confirmDelete ?
                    <Button onClick={()=>setConfirmDelete(true)} size="small" variant="outlined" sx={{color: "#d32f2f", border: "1px solid #d32f2f", "&:hover": {border: "1px solid #d32f2f", backgroundColor: "unset"}}}>
                        Delete
                    </Button>
                    :
                    <Button onClick={()=>{handleDelete()}} size="small" variant="contained" sx={{color: "#fff", backgroundColor: "#d32f2f", "&:hover": {backgroundColor: "#d32f2f"}}}>
                        Confirm delete?
                    </Button>
                    }
                </Box>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <LoadingButton
                    type="submit"
                    disabled={!(props.data?.name !== inputFields.name || props.data?.currency !== inputFields.currency || props.data?.price.toString() !== inputFields.price)}
                    loading={loading}
                    variant="contained"
                    elevation={0}
                    size="small"
                    color="success"
                    sx={{width:"75px", boxShadow:"0", marginLeft: "10px", backgroundColor: "#61a531", "&:hover": {backgroundColor: "#58952d"}}}
                    >
                        Save
                    </LoadingButton>
                </Box>
            </Box>
            </form>
        </Box>
    </Modal>
  )
}

export default EditPropertyModal