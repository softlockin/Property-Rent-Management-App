import { Paper, Stack, Typography, useTheme, Alert } from '@mui/material';
import Grid2 from "@mui/material/Unstable_Grid2";
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect } from 'react';

const Summary = ({property}) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const lgS = useMediaQuery(theme.breakpoints.down('lg'))
    const lmS = useMediaQuery(theme.breakpoints.down('lmd'))
    const switchMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Paper elevation={3} sx={{width: "100%", minHeight: "114px", borderRadius: "10px"}}>
        <Typography variant="h5" sx={{color: "#02143d", fontWeight: "600", margin: "25px 0 0 25px"}}>
            Property details
        </Typography>
        <Stack
          direction="column" 
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={4}
          sx={{margin: "25px"}}
        >
            {property.length === 0 ?
            <Alert variant="outlined" severity="info">Your account is not linked to any property.</Alert>
            :
            <Grid2
            container
            spacing={1}
            mt={0}
            sx={{
                width: "100%",
                padding: "5px",
                backgroundColor: theme.palette.secondary.light,
                border: `1px solid ${theme.palette.secondary.main}`,
                borderRadius: "10px",
            }}
            >
                {!lmS ?
                <>
                <Grid2
                xs={4}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Address
                    </Typography>
                </Grid2>
                <Grid2
                xs={4}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Owner
                    </Typography>
                </Grid2>
                <Grid2
                xs={2}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Rent
                    </Typography>
                </Grid2>
                <Grid2
                xs={2}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Since
                    </Typography>
                </Grid2>
                <Grid2
                xs={4}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={lgS ? "h7" : "h6"} sx={{color: theme.palette.secondary.main, fontWeight: "500"}}>
                        {property.address+", "+property.city}
                    </Typography>
                </Grid2>
               
                <Grid2
                xs={4}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={lgS ? "h7" : "h6"} sx={{color: theme.palette.secondary.main, fontWeight: "500"}}>
                        {property.owner_email}
                    </Typography>
                </Grid2>
                <Grid2
                xs={2}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={lgS ? "h7" : "h6"} sx={{color: theme.palette.secondary.main, fontWeight: "500"}}>
                        {property.price+" "+(property.currency === 1 ? "EUR" : "LEI")}
                    </Typography>
                </Grid2>
                <Grid2
                xs={2}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={lgS ? "h7" : "h6"} sx={{color: theme.palette.secondary.main, fontWeight: "500"}}>
                        {property.rental_first_day}
                    </Typography>
                </Grid2>
                </>
                :
                <>
                <Grid2
                xs={3}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Address
                    </Typography>
                </Grid2>
                <Grid2
                xs={9}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={lgS ? "h7" : "h6"} sx={{color: theme.palette.secondary.main, fontWeight: "500"}}>
                        {property.address+", "+property.city}
                    </Typography>
                </Grid2>
                <Grid2
                xs={3}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Owner
                    </Typography>
                </Grid2>
                <Grid2
                xs={9}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={lgS ? "h7" : "h6"} sx={{color: theme.palette.secondary.main, fontWeight: "500"}}>
                        {property.owner_email}
                    </Typography>
                </Grid2>
                <Grid2
                xs={3}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Rent
                    </Typography>
                </Grid2>
                <Grid2
                xs={9}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={lgS ? "h7" : "h6"} sx={{color: theme.palette.secondary.main, fontWeight: "500"}}>
                        {property.price+" "+(property.currency === 1 ? "EUR" : "LEI")}
                    </Typography>
                </Grid2>
                <Grid2
                xs={3}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Since
                    </Typography>
                </Grid2>
                <Grid2
                xs={9}
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
                >
                    <Typography variant={lgS ? "h7" : "h6"} sx={{color: theme.palette.secondary.main, fontWeight: "500"}}>
                        {property.rental_first_day}
                    </Typography>
                </Grid2>
                </> 
                }
                
            </Grid2>
            }
        </Stack>
    </Paper>
  )
}

export default Summary