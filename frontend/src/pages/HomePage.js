import React, { useState, useEffect, useContext } from 'react'
import { Box, Stack, useTheme} from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import AuthContext from '../context/AuthContext'
import PageHeading from '../components/static/PageHeading';
import Summary from '../components/home/owner/Summary';
import TenantSummary from '../components/home/tenant/Summary';
import QuickAdd from '../components/home/owner/QuickAdd';
import TenantInvite from '../components/home/owner/TenantInvite';
import LatestIssues from '../components/home/owner/LatestIssues';
import LatestInvoices from '../components/home/owner/LatestInvoices';
import InvoiceInfo from '../components/home/tenant/InvoiceInfo';
import OpenIssue from '../components/home/tenant/OpenIssue';


const HomePage = ({ setMobileViewNavTitle }) => {
  const {authTokens, user} = useContext(AuthContext)
  const [summary, setSummary] = useState({})
  const [summaryLoaded, setSummaryLoaded] = useState(false)
  const [fetchSummaryError, setFetchSummaryError] = useState(false)
  const [properties, setProperties] = useState([])
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const lmS = useMediaQuery(theme.breakpoints.down('lmd'))
  const switchMobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles = {
    container: {
        width: "85vw", 
        maxHeight: "100%",
        position: "absolute",
        top: "0", 
        left: "15vw",
        overflow: "auto",
        
        [theme.breakpoints.down('lg')]: {
            width: "calc(100% - 56px)",
            left: "56px"
        },
        [theme.breakpoints.down('md')]: {
          width: "100vw",
          left: "0",
          "::-webkit-scrollbar": {width: "0px", background: "transparent"}
      }
    }
  }

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
        setSummary(data)
        setSummaryLoaded(true)
      }else{
        setFetchSummaryError(true)
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
      if(user.user_type === 1){
        setProperties(data.filter((el) => {
          return el.tenant === null;
        }))
      }
      if(user.user_type === 2){
        setProperties(data)
      }
    }
  }

  useEffect(()=>{
    setMobileViewNavTitle("Dashboard")
    if(user.user_type === 1){
      fetchSummary()
      fetchProperties()
    };
    if(user.user_type === 2){
      fetchProperties()
    };
    return () => {
      setSummary({});
      setProperties([]);
    };
  }, [])

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
          mr={switchMobile ? 1 : 5}
          ml={switchMobile ? 1 : 5}
        >
          <PageHeading title="Dashboard" />
          <Summary data={summary} summaryLoaded={summaryLoaded} fetchSummaryError={fetchSummaryError} />
        </Stack>
        <Stack
          direction={matches ? "row" : "column"}
          justifyContent={matches ? "space-between" : "flex-start"}
          alignItems={matches ? "flex-start" : "center"}
          spacing={2}
          mr={switchMobile ? 1 : 5}
          mt={4}
          ml={switchMobile ? 1 : 5}
          mb={3}
        >
          <QuickAdd setData={setSummary} setProperties={setProperties} />
          <TenantInvite properties={properties}/>
        </Stack>
        <Stack
          direction={matches ? "row" : "column"}
          justifyContent={matches ? "space-between" : "flex-start"}
          alignItems={matches ? "flex-start" : "center"}
          spacing={2}
          mr={switchMobile ? 1 : 5}
          mt={4}
          ml={switchMobile ? 1 : 5}
          mb={3}
        >
          <LatestIssues />
          <LatestInvoices />
        </Stack>
      </Box>
    </>
    )}else{
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
          mr={switchMobile ? 1 : 5}
          ml={switchMobile ? 1 : 5}
          >
            <PageHeading title="Dashboard" />
          </Stack>
          <Stack
            direction={matches ? "row" : "column"}
            justifyContent={matches ? "space-between" : "flex-start"}
            alignItems={matches ? "flex-start" : "center"}
            spacing={2}
            mr={switchMobile ? 1 : 5}
            mt={4}
            ml={switchMobile ? 1 : 5}
            mb={3}
          >
            <TenantSummary property={properties} />
          </Stack>
          <Stack
            direction={!lmS ? "row" : "column"}
            justifyContent={!lmS ? "space-between" : "flex-start"}
            alignItems={!lmS ? "flex-start" : "center"}
            spacing={2}
            mr={switchMobile ? 1 : 5}
            mt={4}
            ml={switchMobile ? 1 : 5}
            mb={3}
          >
            <InvoiceInfo property={properties} />
            <OpenIssue property={properties} />
          </Stack>
        </Box>
      </>
      )
    }

}

export default HomePage