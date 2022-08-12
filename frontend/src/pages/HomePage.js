import React, { useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode"
import { Box, Stack, useTheme } from "@mui/material"
import AuthContext from '../context/AuthContext'
import PageHeading from '../components/static/PageHeading';
import Summary from '../components/home/Summary';
import QuickAdd from '../components/home/QuickAdd';


const HomePage = () => {

  const theme = useTheme()
  const styles = {
    container: {
        width: "85vw", 
        height: "100%",
        position: "absolute",
        top: "0", 
        left: "15vw",
        overflow: "auto",
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
        <Stack
          direction="column" 
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={4}
          mr={5}
          ml={5}
        >
          <PageHeading title="Dashboard" />
          <Summary />
        </Stack>
        <Stack
          direction="row" 
          justifyContent="space-between"
          alignItems="flex-start"
          // spacing={2}
          mr={5}
          mt={4}
          ml={5}
        >
          <QuickAdd />
          <QuickAdd />
        </Stack>
      </Box>
    </>
    )

}

export default HomePage