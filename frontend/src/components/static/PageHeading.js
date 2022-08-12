import React, { useContext } from 'react'
import { Button, Stack, Typography, useTheme } from "@mui/material"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AuthContext from '../../context/AuthContext'

const PageHeading = ({ title }) => {

    const {user} = useContext(AuthContext)
    const theme = useTheme()

  return (
    <Stack
        direction="row" 
        justifyContent="space-between"
        alignItems="flex-start"
        mt={3.5}
        sx={{width: "100%"}}
    >
        <Typography variant="h6" sx={{color: "#02143d", fontWeight: "600"}}>
            {title}
        </Typography>
        <Button variant="outlined" startIcon={<AccountCircleRoundedIcon />} size="small" 
        sx={{color: "#02143d", borderColor: "#02143d", borderRadius: "7px",
                "&.MuiButton-root.MuiButton-sizeSmall": {
                    [theme.breakpoints.down('sm')]: {
                        fontSize: "0",
                        paddingRight: "0",
                        minWidth: "10px"
                    }
                },
                "&:hover": {
                color: "#02143d",
                borderColor: "#02143d",
                backgroundColor: "#d1d1d1"
                }}}>
            {user.username}
        </Button>
    </Stack>
  )
}

export default PageHeading