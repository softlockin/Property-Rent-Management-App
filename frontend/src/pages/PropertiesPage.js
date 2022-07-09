import React, { useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode"
import { Box, Button, Modal, Stack, Typography, useTheme } from "@mui/material"
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AuthContext from '../context/AuthContext'
import { TypographyListItem } from '../components/TypographyListItem';

const PropertiesPage = () => {
  
    const theme = useTheme()
    const styles = {
        container: {
            width: "85vw", 
            height: "100%",
            backgroundColor: 'yellow',
            position: "absolute", 
            top: "0", 
            left: "15vw",
            [theme.breakpoints.down('lg')]: {
                width: "calc(100% - 56px)",
                left: "56px"
            }
        }
    }

    return (
        <>
            <Box 
            sx={styles.container}
            >
                Property list page
            </Box>
        </>
    )
}

export default PropertiesPage