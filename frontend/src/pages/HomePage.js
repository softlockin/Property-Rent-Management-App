import React, { useState, useEffect, useContext } from 'react'
import { Box, Stack, useTheme } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import AuthContext from '../context/AuthContext'
import PageHeading from '../components/static/PageHeading';
import Summary from '../components/home/Summary';
import QuickAdd from '../components/home/QuickAdd';
import TenantInvite from '../components/home/TenantInvite';
import LatestIssues from '../components/home/LatestIssues';
import LatestInvoices from '../components/home/LatestInvoices';


const HomePage = () => {
  const {authTokens, user} = useContext(AuthContext)
  const [data, setData] = useState({})
  const [properties, setProperties] = useState([])

  const fetchSummary = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/fetch-summary/', {
      method: 'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
      },
      })
      let data = await response.json()

      if(response.status === 200){
          setData(data)
      }
  }

  const fetchProperties = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/property-items/', {
    method: 'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
    },
    })
    let data = await response.json()

    if(response.status === 200){
        setProperties(data.filter((el) => {
          return el.tenant === null;
        }))
    }
}

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
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
  useEffect(()=>{
    if(user.user_type === 1){
      fetchSummary()
    }
  }, [])

  useEffect(()=>{
    if(user.user_type === 1){
      fetchProperties()
    }
  }, [data])
  
  if(user.user_type === 1){
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
          <Summary data={data} />
        </Stack>
        <Stack
          direction={matches ? "row" : "column"}
          justifyContent={matches ? "space-between" : "flex-start"}
          alignItems={matches ? "flex-start" : "center"}
          spacing={2}
          mr={5}
          mt={4}
          ml={5}
          mb={3}
        >
          <QuickAdd setData={setData}/>
          <TenantInvite properties={properties}/>
        </Stack>
        <Stack
          direction={matches ? "row" : "column"}
          justifyContent={matches ? "space-between" : "flex-start"}
          alignItems={matches ? "flex-start" : "center"}
          spacing={2}
          mr={5}
          mt={4}
          ml={5}
          mb={3}
        >
          <LatestIssues />
          <LatestInvoices />
        </Stack>
      </Box>
    </>
    )}else{
      return (
        <div>Tenant homepage</div>
      )
    }

}

export default HomePage