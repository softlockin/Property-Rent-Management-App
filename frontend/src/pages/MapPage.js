import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Box, Stack, useTheme } from "@mui/material";
import PageHeading from '../components/static/PageHeading';
import useMediaQuery from '@mui/material/useMediaQuery';
import Map from '../components/map/Map';

const MapPage = ({ setMobileViewNavTitle }) => {

  const theme = useTheme()
  const [properties, setProperties] = useState()
  const {authTokens, user} = useContext(AuthContext)
  const switchMobile = useMediaQuery(theme.breakpoints.down('md'));
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
        },
        [theme.breakpoints.down('md')]: {
          width: "100%",
          left: "0",
        },
    }
  }

  const fetchProperties = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/map/', {
    method: 'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
    },
    })
    let data = await response.json()

    if(response.status === 200){
        setProperties(data)
    }
  }

  useEffect(()=>{
    setMobileViewNavTitle("Map")
      fetchProperties()
  }, [])

  return (
    <Box 
    sx={styles.container}
    >
      <Stack
        direction="column" 
        justifyContent="flex-start"
        alignItems="center"
        spacing={switchMobile ? 0 : 4}
        mr={switchMobile ? 0 : 5}
        ml={switchMobile ? 0 : 5}
        sx={{height: "100%"}}
      >
        <PageHeading title="Map" />
        <Box sx={{width: "100%", height: `${switchMobile ? "100%" : "85%"}`}}>
          <Map properties={properties} />
        </Box>
      </Stack>
    </Box>
  )
}

export default MapPage