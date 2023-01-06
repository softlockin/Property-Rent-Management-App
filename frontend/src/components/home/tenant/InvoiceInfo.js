import { Box, Paper, Stack, Typography, useTheme, Alert } from '@mui/material';
import Grid2 from "@mui/material/Unstable_Grid2";
import useMediaQuery from '@mui/material/useMediaQuery';
import AuthContext from '../../../context/AuthContext';
import React, { useState, useContext, useEffect } from 'react';

const InvoiceInfo = ({property}) => {
  const theme = useTheme()
  const switchMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const lmS = useMediaQuery(theme.breakpoints.down('lmd'))
  const {authTokens} = useContext(AuthContext)
  const [invoices, setInvoices] = useState()
  const [invoicesFetched, setInvoicesFetched] = useState(false)
  const [currentInvoiceOverdue, setCurrentInvoiceOverdue] = useState(false)

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
        if(data.length > 0){
          setInvoices(data)
          setInvoicesFetched(true)
          let today = new Date()
          let due_date = new Date(data[0].due_day)
          let difference = due_date.valueOf() - today.valueOf()
          if(difference<0){
            if(due_date.toISOString().split("T")[0] !== today.toISOString().split("T")[0]){
              setCurrentInvoiceOverdue(true)
            }
          }
        }
      }
  }

  useEffect(()=>{
    fetchInvoices()
  }, [])

  return (
    <>
        <Paper elevation={3} sx={{width: !lmS ? "48%" : "100%", minHeight: "380px", borderRadius: "10px", "&.MuiPaper-root": {marginLeft: "0px"}}}>
            <Typography variant="h5" sx={{color: "#02143d", fontWeight: "600", margin: "25px 0 0 25px"}}>
                Invoice details
            </Typography>
            <Stack
              direction="column" 
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={4}
              sx={{margin: "25px"}}
            >
              <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                Invoices are generated on the first day of every month.
              </Typography>
              {property.length === 0 ?
              <Alert variant="outlined" severity="info">Your account is not linked to any property.</Alert>
              :
              <Stack
                direction="column" 
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                sx={{width: "100%"}}
              >
                <Box sx={{display: "flex", flexDirection: "row"}}>
                  <Typography variant="h7" sx={{color: "#02143d", fontWeight: "500"}}>
                    Due day: &nbsp;&nbsp;
                  </Typography>
                  <Typography variant="h7" sx={{color: theme.palette.secondary.main, fontWeight: "600"}}>
                    {property.rent_due_day+function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}(property.rent_due_day)}
                  </Typography>
                  <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                    &nbsp;(monthly)
                  </Typography>
                </Box>
                <Grid2
                  container
                  sx={{width: "100%"}}
                > 
                  <Grid2 xs={12}>
                    <Typography variant="h7" sx={{color: "#02143d", fontWeight: "500"}}>
                      Current invoice:
                    </Typography>
                  </Grid2>
                  <Grid2
                    container
                    mt={1}
                    sx={{border: "1px solid #02143d", width: "100%", borderRadius: "10px", padding: "4px 1px 4px 7px"}}
                  > 
                    {invoicesFetched && invoices.length > 0 ?
                    <>
                    <Grid2 xs={12}>
                      <Typography variant="h7" sx={{color: theme.palette.secondary.main, fontWeight: "400"}}>
                        {"IN: "+invoices[0]?.property_name}
                      </Typography>
                    </Grid2>
                    <Grid2
                      container
                      mt={0.5}
                      sx={{width: "100%"}}
                    >
                      <Grid2 xs={4}>
                        <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                          Price
                        </Typography>
                        <Typography variant={switchMobile ? "subtitle2" : "h7"} sx={{color: "#02143d", fontWeight: "500"}}>
                          {invoices[0]?.price+" "+invoices[0]?.currency}
                        </Typography>
                      </Grid2>
                      <Grid2 xs={4}>
                        <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                          Due date
                        </Typography>
                        <Typography variant={switchMobile ? "subtitle2" : "h7"} sx={{color: "#02143d", fontWeight: "500"}}>
                          {invoices[0]?.due_day}
                        </Typography>
                      </Grid2>
                      <Grid2 xs={4}>
                        <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                          Status
                        </Typography>
                        <Typography variant={switchMobile ? "subtitle2" : "h7"} sx={{color: `${invoices[0].paid ? theme.palette.secondary.main : currentInvoiceOverdue ? "#d64400" : theme.palette.primary.main}`, fontWeight: "500"}}>
                          {invoices[0]?.paid ? "Paid" : currentInvoiceOverdue ? "Overdue" : "Due"}
                        </Typography>
                      </Grid2>
                    </Grid2>
                    </>: 
                    <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                      No invoice
                    </Typography>
                    }
                  </Grid2>
                </Grid2>
                <Typography variant="body2" sx={{color: "#7d7d7d"}}>
                  Invoices will be marked as paid by the owner.
                </Typography>
              </Stack>
              }
            </Stack>
        </Paper>
    </>
  )
}

export default InvoiceInfo