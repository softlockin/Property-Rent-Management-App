import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Box, Button, Modal, Stack, Typography } from "@mui/material"
import { TypographyListItem } from '../components/custom/TypographyListItem';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useNavigate } from 'react-router-dom'

const CompleteRegistration = () => {

    const styles = {
        modal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: '7px',
            boxShadow: 24,
            p: 4,
            outline: 'none'
        },
    }

    const {authTokens, logoutUser, user} = useContext(AuthContext)
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()

    const selectType = async (type) => {
        setDisabled(true)
        let response = await fetch('http://127.0.0.1:8000/api/usertype-set/', {
          method: 'POST',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          body:JSON.stringify({'user_type': type}),
          })
        let data = await response.json()
        
        if (response.status === 200){
            localStorage.setItem('authTokens', `${JSON.stringify(data)}`);
            setTimeout(()=>{
                window.location.reload();
            }, 500)
        }else{
            logoutUser()
        }
      }
    
      useEffect(()=>{
        if(user.gapi_user_type_set === true || user.provider === 'email'){
          navigate('/')
        }
      }, [])

  return (
    <Modal
        open
      >
      <Box sx={styles.modal}>
        <Typography variant="h6">
          Welcome {user['username']},
        </Typography>
        <Typography variant="h7" sx={{ mt: 2 }}>
          One more step is required to finalize your account creation.
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Select the account type:
        </Typography>
        <Stack
          direction="row" 
          justifyContent="space-between"
          alignItems="flex-start"
          mt={2}
        >
          <Box sx={{
            width: 295,
            height: 400,
            border: "1px solid #1976d2",
            borderRadius: "10px",
            overflow: "hidden",
          }}>
            <Box>
              <Typography variant="h6" sx={{fontWeight: "400", color: "#1976d2", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e8f4fd", width: "100%", height: "50px"}}>
                <MapsHomeWorkRoundedIcon size="large" sx={{marginRight: "3px"}} />
                OWNER 
              </Typography>
            </Box>
            <Stack
              direction="column" 
              justifyContent="space-between"
              alignItems="center"
              sx={{height: "80%"}}
            >
              <Stack
                direction="column" 
                justifyContent="flex-start"
                alignItems="flext-start"
                mt={1.5}
                sx={{width: "100%", paddingLeft: "7px"}}
                >
                <TypographyListItem color="#1976d2" text="Property listing" />
                <TypographyListItem color="#1976d2" text="Rental agreement creation" />
                <TypographyListItem color="#1976d2" text="Tenant account invite based linking" />
                <TypographyListItem color="#1976d2" text="Income and expenses tracking" />
                <TypographyListItem color="#1976d2" text="Properties information overview" />
                <TypographyListItem color="#1976d2" text="Rent overdue notifications" />
                <TypographyListItem color="#1976d2" text="Issue tracking system" />
              </Stack>
            
              <Button
              size="small"
              disabled={disabled}
              onClick={() => selectType(1)}
              variant="contained"
              sx={{width: "50%", backgroundColor: "#1976d2" }}
              >
                Select
              </Button>
            </Stack>
          </Box>
          <Box sx={{
            width: 295,
            height: 400,
            border: "1px solid #388e3c",
            borderRadius: "10px",
            overflow: "hidden"
          }}>
            <Box>
              <Typography variant="h6" sx={{fontWeight: "400", color: "#388e3c", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ecf7ed", width: "100%", height: "50px"}}>
                <PersonRoundedIcon size="large" color="success" />
                TENANT 
              </Typography>
            </Box>
            <Stack
              direction="column" 
              justifyContent="space-between"
              alignItems="center"
              sx={{height: "80%"}}
            >
              <Stack
                direction="column" 
                justifyContent="flex-start"
                alignItems="flex-start"
                mt={1.5}
                sx={{paddingLeft: "7px"}}
                >
                  <TypographyListItem color="#388e3c" text="Search map for available properties" />
                  <TypographyListItem color="#388e3c" text="View rent information" />
                  <TypographyListItem color="#388e3c" text="Receive, review and accept rental agreement" />
                  <TypographyListItem color="#388e3c" text="Tenant account linking to property" />
                  <TypographyListItem color="#388e3c" text="Issue tracking system" />
              </Stack>
            
              <Button
              size="small"
              onClick={() => selectType(2)}
              disabled={disabled}
              variant="contained"
              sx={{width: "50%", backgroundColor: "#388e3c", '&:hover': {
                backgroundColor: "#47854a"}
              }}
              >
                Select
              </Button>
            </Stack>
            
          </Box>
        </Stack>
      </Box>
    </Modal>
  )
}

export default CompleteRegistration