import React, { useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode"
import { Box, Button, Modal, Stack, Typography, useTheme } from "@mui/material"
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AuthContext from '../context/AuthContext'
import { TypographyListItem } from '../components/custom/TypographyListItem';
import PageHeading from '../components/static/PageHeading';

const IssueTrackerPage = () => {

  const theme = useTheme()
  const [data, setData] = useState([])
  const styles = {
    container: {
        width: "85vw", 
        height: "100%",
        position: "absolute", 
        top: "0", 
        left: "15vw",
        [theme.breakpoints.down('lg')]: {
            width: "calc(100% - 56px)",
            left: "56px"
        }
    }
  }

  useEffect(() => {
    console.log('test')
  }, [data])


  return (
  <>
    <Box 
    sx={styles.container}
    >
     <Stack
        direction="column" 
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
        mr={5}
        ml={5}
      >
        <PageHeading title="Issue tracker" />
      </Stack>
    </Box>
  </>
  )
}

export default IssueTrackerPage