import { Grid, Paper, Typography } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'

const Summary = () => {
  return (
    <Paper elevation={3} sx={{width: "100%", borderRadius: "10px"}}>
            <Grid container spacing={2} sx={{width: "100%", padding: "25px"}}>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Total properties
                    </Typography>
                    <Typography variant="h4" sx={{color: "#02143d"}}>
                        5
                    </Typography>
                </Grid>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Total income
                    </Typography>
                    <Typography variant="h4" sx={{color: "#02143d"}}>
                        0 lei
                    </Typography>
                </Grid>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Total expenses
                    </Typography>
                    <Typography variant="h4" sx={{color: "#02143d"}}>
                        50 lei
                    </Typography>
                </Grid>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Open issues
                    </Typography>
                    <Typography variant="h4" sx={{color: "#02143d"}}>
                        1
                    </Typography>
                </Grid>
                <Grid item sm={2.4}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
                        Overdue
                    </Typography>
                    <Typography variant="h4" sx={{color: "#e60000"}}>
                        5
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
  )
}

export default Summary