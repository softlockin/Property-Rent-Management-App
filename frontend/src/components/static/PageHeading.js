import React, { useContext } from 'react';
import { Button, Stack, Typography, useTheme, Box } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AuthContext from '../../context/AuthContext';

const PageHeading = ({ title }) => {

    const {user} = useContext(AuthContext)
    const theme = useTheme()
    const switchMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    !switchMobile ?
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
    : 
    <Box sx={{width: "100%", height: "50px"}}></Box>
  )
}

export default PageHeading