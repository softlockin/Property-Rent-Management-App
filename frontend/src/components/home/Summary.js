import { Grid, Paper, Typography, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

const Summary = ({data, summaryLoaded, fetchSummaryError}) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const switchMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Paper elevation={3} sx={{width: "100%", minHeight: "114px", borderRadius: "10px"}}>
            <Grid container sx={{width: "100%", padding: "25px", justifyContent: "center", alignItems: "center"}}>
                {fetchSummaryError ?
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#d32f2f", marginTop: "10px"}}>
                        Something went wrong while loading data. Refresh page!
                    </Typography>
                : summaryLoaded ?
                switchMobile ?
                <>
                <Grid item xs={6}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Total properties
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: "#02143d"}}>
                        {data['properties_listed']}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Total income
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: "#02143d"}}>
                        {data['income']} lei
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Total expenses
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: "#02143d"}}>
                        {data['expenses']} lei
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Open issues
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: "#02143d"}}>
                        {data['open_issues']}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Overdue
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: `${data['overdue']>0 ? "#e60000" : "#02143d"}`}}>
                        {data['overdue']}
                    </Typography>
                </Grid>
                </>
                :
                <>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Total properties
                    </Typography>
                </Grid>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Total income
                    </Typography>
                </Grid>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Total expenses
                    </Typography>
                </Grid>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Open issues
                    </Typography>
                </Grid>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "caption" : "subtitle2"} sx={{color: "#7d7d7d"}}>
                        Overdue
                    </Typography>
                </Grid>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: "#02143d"}}>
                        {data['properties_listed']}
                    </Typography>
                </Grid>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: "#02143d"}}>
                        {data['income']} lei
                    </Typography>
                </Grid>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: "#02143d"}}>
                        {data['expenses']} lei
                    </Typography>
                </Grid>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: "#02143d"}}>
                        {data['open_issues']}
                    </Typography>
                </Grid>
                <Grid item sm={2.4} md={2.4}>
                    <Typography variant={matches ? "h6" : "h4"} sx={{color: `${data['overdue']>0 ? "#e60000" : "#02143d"}`}}>
                        {data['overdue']}
                    </Typography>
                </Grid>
                </>
                :
                <CircularProgress size="30px" sx={{marginTop: "10px"}} />
                }
            </Grid>
        </Paper>
  )
}

export default Summary