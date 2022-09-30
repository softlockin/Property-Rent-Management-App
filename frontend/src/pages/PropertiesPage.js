import React, { useState, useEffect, useContext } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import Slide from '@mui/material/Slide';
import { Box, Button, Divider, Paper, Stack, Typography, Snackbar, Alert, useTheme } from "@mui/material";
import AuthContext from '../context/AuthContext';
import PageHeading from '../components/static/PageHeading';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PropertiesList from '../components/properties/PropertiesList';
import AddPropertyModal from '../components/properties/AddPropertyModal';

const PropertiesPage = (props) => {

    const theme = useTheme()
    const {authTokens, user} = useContext(AuthContext)
    const [properties, setProperties] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: 'warning',
        message: '',
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
        }
    }

    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
    }

    const fetchProperties = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/property-items/', {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        })
        let data = await response.json()

        if(response.status === 200){
            setProperties(data)
        }
    }

    useEffect(()=>{
        if(user.user_type === 1){
          fetchProperties()
        }
    }, [])
    

    return (
        <>
            <AddPropertyModal authTokens={authTokens} setProperties={setProperties} setModalOpen={setModalOpen} modalOpen={modalOpen} setSnackbar={setSnackbar} />
            <Box 
            sx={styles.container}
            >
                <Snackbar
                open={snackbar.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={TransitionUp}
                >
                    <Alert severity={snackbar.type} variant="filled" onClose={() => {setSnackbar(prev => ({...prev, open: false, message: ''}))}} sx={{width: '100%', backgroundColor: `${snackbar.type === 'success' ? "#48b155" : ""}`}}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
                <Stack
                    direction="column" 
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={3}
                    mr={5}
                    ml={5}
                 >
                    <PageHeading title="Properties" />
                    <Button
                    onClick={() => setModalOpen(!modalOpen)}
                    type="submit"
                    variant="contained"
                    size="small"
                    startIcon={<AddRoundedIcon />}
                    >
                    Add property
                    </Button>
                    <Paper elevation={3} sx={{width: "100%", minHeight: "380px", maxHeight: "85vh", borderRadius: "10px", "&.MuiPaper-root": {marginLeft: "0px"}}}>
                        <Grid2 container spacing={1} sx={{width: "100%", margin: "10px 10px 10px 10px"}}>
                            <Grid2 xs={4}>
                                <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600"}}>
                                    Name
                                </Typography>
                            </Grid2>
                            <Grid2 xs={3}>
                                <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600"}}>
                                    Address
                                </Typography>
                            </Grid2>
                            <Grid2 xs={1.5}>
                                <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600"}}>
                                    Status
                                </Typography>
                            </Grid2>
                            <Grid2 xs={2.5}>
                                <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600"}}>
                                    Tenant
                                </Typography>
                            </Grid2>
                            <Grid2 xs={1}>
                                <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600"}}>
                                    Rent
                                </Typography>
                            </Grid2>
                        </Grid2>
                        <Divider sx={{width:"100%", backgroundColor: "#f2f2f2"}} />
                        <Box sx={{maxHeight: "75vh", marginBottom: "25px", overflowX: "hidden", overflowY: "auto", "::-webkit-scrollbar": {
                        width: "0px",
                        background: "transparent",
                        }}}>
                        {
                        properties.length === 0 ?
                        <Typography variant="body1" sx={{color: "#7d7d7d", fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "155px"}}>
                            No properties to be listed.
                        </Typography> 
                        :
                        <PropertiesList data={properties} />
                        }
                        </Box>
                    </Paper>
                </Stack>
            </Box>
        </>
    )
}

export default PropertiesPage