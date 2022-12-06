import React, { useState, useEffect, useContext } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Box, Button, Stack, Typography, useTheme, Paper, Divider } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import AuthContext from '../context/AuthContext';
import PageHeading from '../components/static/PageHeading';
import InvoicesList from '../components/invoices/InvoicesList';

const InvoicesPage = ({ setMobileViewNavTitle }) => {

  const theme = useTheme()
  const {authTokens, user} = useContext(AuthContext)
  const [invoices, setInvoices] = useState([])
  const [invoicesFetched, setInvoicesFetched] = useState(false)
  const [invoicesFetchError, setInvoicesFetchError] = useState(false)
  const switchMobile = useMediaQuery(theme.breakpoints.down('md'));
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
        },
        [theme.breakpoints.down('md')]: {
            width: "100%",
            left: "0",
        },
    }
  }

  const fetchInvoices = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/invoices/', {
    method: 'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
    },
    })
    let data = await response.json()

    if(response.status === 200){
        setInvoices(data)
        setInvoicesFetched(true)
    }else{
        setInvoicesFetchError(true)
    }
  }

  useEffect(()=>{
    setMobileViewNavTitle("Invoices")
    if(user.user_type === 1){
        fetchInvoices()
        }
  }, [])

  return (
    <>
      <Box 
        sx={styles.container}
      >
         <Stack
          direction="column" 
          justifyContent="flex-start"
          alignItems="center"
          spacing={4}
          mr={switchMobile ? 1 : 5}
          ml={switchMobile ? 1 : 5}
        >
        <PageHeading title="Invoices" />
        {!switchMobile ?
        <Paper elevation={3} sx={{width: "100%", minHeight: "380px", maxHeight: "85vh", borderRadius: "10px", "&.MuiPaper-root": {marginLeft: "0px"}}}>
            <Grid2 container spacing={1} sx={{width: "100%", marginLeft: "0px"}}>
                <Grid2 xs={3}>
                    <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600", padding: "10px 0px 10px 20px"}}>
                        Property
                    </Typography>
                </Grid2>
                <Grid2 xs={3}>
                    <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600", padding: "10px 0px 10px 20px"}}>
                        Tenant
                    </Typography>
                </Grid2>
                <Grid2 xs={2}>
                    <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600", padding: "10px 0px 10px 10px"}}>
                        Due Date
                    </Typography>
                </Grid2>
                <Grid2 xs={1.5}>
                    <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600", padding: "10px 0px 10px 10px"}}>
                        Status
                    </Typography>
                </Grid2>
                <Grid2 xs={1.5}>
                    <Typography variant="subtitle2" sx={{color: "#02143d", fontWeight: "600", padding: "10px 0px 10px 10px"}}>
                        Rent
                    </Typography>
                </Grid2>
            </Grid2>
            <Divider sx={{width:"100%", backgroundColor: "#f2f2f2"}} />
            <Box sx={{maxHeight: "75vh", marginBottom: "25px", display: "flex", flexDirection: "column", justifyContent: "center", overflowX: "hidden", overflowY: "auto", "::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
            }}}>
                {invoicesFetchError ? 
                <Typography variant="subtitle2" sx={{color: "#d32f2f", marginTop: "10px", textAlign: "center"}}>
                    Something went wrong while loading data. Refresh page!
                </Typography>
                :
                invoicesFetched ?
                invoices.length === 0 ?
                <Typography variant="body1" sx={{color: "#7d7d7d", fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "155px"}}>
                    There are no invoices.
                </Typography> 
                :
                <InvoicesList data={invoices} authTokens={authTokens} setInvoices={setInvoices} />
                :
                <CircularProgress size="30px" sx={{marginTop: "10px"}} />
                }
            </Box>
        </Paper>
        :
        <Box sx={{maxHeight: "calc(100vh - 128.75px)", marginBottom: "25px", overflowX: "hidden", overflowY: "auto", "::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
        }}}>
        {invoicesFetchError ? 
            <Typography variant="subtitle2" sx={{color: "#d32f2f", marginTop: "10px", textAlign: "center"}}>
                Something went wrong while loading data. Refresh page!
            </Typography>
            :
            invoicesFetched ?
            invoices.length === 0 ?
            <Typography variant="body1" sx={{color: "#7d7d7d", fontStyle: "italic", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "155px"}}>
                There are no invoices.
            </Typography> 
            :
            <InvoicesList data={invoices} authTokens={authTokens} setInvoices={setInvoices} />
            :
            <CircularProgress size="30px" sx={{marginTop: "10px"}} />}
        </Box>
        }
      </Stack>
      </Box>
    </>
  )
}
export default InvoicesPage