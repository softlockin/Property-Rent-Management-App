import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'

const Summary = ({data}) => {

  return (
    <Paper elevation={3} sx={{width: "100%", borderRadius: "10px"}}>
            <Grid container spacing={2} sx={{width: "100%", padding: "25px"}}>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Total properties
                    </Typography>
                    <Typography variant="h4" sx={{color: "#02143d"}}>
                        {data['properties_listed']}
                    </Typography>
                </Grid>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Total income
                    </Typography>
                    <Typography variant="h4" sx={{color: "#02143d"}}>
                        {data['income']} lei
                    </Typography>
                </Grid>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Total expenses
                    </Typography>
                    <Typography variant="h4" sx={{color: "#02143d"}}>
                        {data['expenses']} lei
                    </Typography>
                </Grid>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Open issues
                    </Typography>
                    <Typography variant="h4" sx={{color: "#02143d"}}>
                        {data['open_issues']}
                    </Typography>
                </Grid>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Overdue
                    </Typography>
                    <Typography variant="h4" sx={{color: `${data['overdue']>0 ? "#e60000" : "#02143d"}`}}>
                        {data['overdue']}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
  )
}

export default Summary