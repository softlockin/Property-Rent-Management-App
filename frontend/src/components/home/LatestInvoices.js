import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import AuthContext from '../../context/AuthContext'
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';

const LatestInvoices = () => {

    const {authTokens} = useContext(AuthContext)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('lg'))
    const navigate = useNavigate()
    const [fetchError, setFetchError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [invoice, setInvoice] = useState([])

    const styles = {
        invoicePill: {
            due: {
                color: theme.palette.primary.main, 
                border: `1px solid ${theme.palette.primary.main}`, 
                borderRadius: "10px", 
                padding: "0px 7px 0px 7px",
                backgroundColor: theme.palette.primary.light
            },
            paid: {
                color: "#14ad00", 
                border: "1px solid #14ad00", 
                borderRadius: "10px", 
                padding: "0px 7px 0px 7px",
                backgroundColor: "#f0f8ec"
            },
            overdue: {
                color: "#d64400", 
                border: "1px solid #d64400", 
                borderRadius: "10px", 
                padding: "0px 7px 0px 7px",
                backgroundColor: "#f8efec"
            }
        }
    }

    function InvoiceItem({property, price, paid, created_at, due_date}) {

        let today = new Date()
        let due_date_formated = new Date(due_date)
        let overdue = false
        if(today.getDate() - due_date_formated.getDate() > 0){
            overdue = true
        }

        return(
            <Grid2 container sx={{width: "100%"}}>
                <Grid2 xs={6}>
                    <Typography variant="body1" sx={{color: "#02143d"}}>
                        {"IN: "+property}
                    </Typography>
                </Grid2>
                <Grid2 display="flex" justifyContent="flex-start" alignItems="center" xs={2}>
                    <Typography variant="body2" sx={{color: "#02143d"}}>
                        {price}
                    </Typography>
                </Grid2>
                <Grid2 display="flex" justifyContent="flex-end" alignItems="center" xs={4}>
                    <Typography variant="caption" sx={paid === true ? styles.invoicePill.paid : overdue === true ? styles.invoicePill.overdue : styles.invoicePill.due}>
                        {paid === true ? "Paid" : overdue === true ? "Overdue" : "Due"}
                    </Typography>
                </Grid2>
                <Grid2 xs={8} mb={1}>
                    <Typography variant="caption" sx={{color: "#7d7d7d"}}>
                        {created_at}
                    </Typography>
                </Grid2>
                <Grid2 display="flex" justifyContent="flex-end" alignItems="center" xs={4} mb={1}>
                    <Typography variant="caption" sx={{color: "#7d7d7d"}}>
                        {"Due date: "+due_date}
                    </Typography>
                </Grid2>
            </Grid2>
        )
    }

    const fetchRecentInvoices = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/invoices/?recent=true', {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        })
        let data = await response.json()
  
        if(response.status === 200){
            setInvoice(data)
            setLoaded(true)
        }else{
            setFetchError(true)
        }
    }

    useEffect(()=>{
        fetchRecentInvoices();
        return () => {
            setInvoice([]);
        };
    }, [])

  return (
    <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{width: matches ? "48%" : "100%"}}
    >
        <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
            Latest issued invoices
        </Typography>
        <Divider sx={{width:"100%", borderBottomWidth: "1px", marginTop: "10px", marginBottom: "10px", backgroundColor: "#cdcbcb"}} />
        {fetchError ?
        <Typography variant="subtitle2" sx={{color: "#d32f2f", marginTop: "10px"}}>
            Something went wrong while loading data. Refresh page!
        </Typography>
        :
        loaded ?
        (invoice.length === 0 ?
            <Typography variant="caption" ml={1} sx={{color: "#7d7d7d"}}>
                There are no recent invoices
            </Typography>
            :
            invoice.map((item)=>(
                <InvoiceItem key={item.id} property={item.property_name} created_at={item.created_at} paid={item.paid} price={item.price+" "+item.currency} due_date={item.due_day}/>
                )
            )
        ):
        <CircularProgress size="30px" sx={{marginTop: "10px"}} />
        }
        <Button
            onClick={() => {navigate('invoices')}}
            variant="outlined"
            elevation={0}
            size="small"
            sx={{marginTop: "20px", boxShadow:"0"}}
        >
            View all invoices
        </Button>
    </Stack>
  )
}

export default LatestInvoices