import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const LatestInvoices = () => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('lg'))
    const navigate = useNavigate()

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
        <Typography variant="caption" ml={1} sx={{color: "#7d7d7d"}}>
            There are no recent invoices
        </Typography>
        <Button
            onClick={() => {navigate('invoices')}}
            variant="outlined"
            elevation={0}
            size="small"
            sx={{margin: "20px 0 25px", boxShadow:"0"}}
        >
            View all invoices
        </Button>
    </Stack>
  )
}

export default LatestInvoices