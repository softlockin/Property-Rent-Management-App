import React, { useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode"
import { Box, Divider, Button, Modal, Stack, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AuthContext from '../context/AuthContext'
import { TypographyListItem } from '../components/TypographyListItem';
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Dashboard = () => {
    const theme = useTheme()
    const styles = {
        logo: {
            padding:"35px", 
            justifyContent: "center", 
            textAlign: "center",
            [theme.breakpoints.down('xl')]: {
                display: "none"
            }
        },
        logoResize: {
            padding:"35px", 
            justifyContent: "center", 
            textAlign: "center",
            fontWeight: "500",
            [theme.breakpoints.up('xl')]: {
                display: "none"
            }
        },
        owner: {
            marginBottom: "10px",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "35px",
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
                borderRight: `5px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                '.MuiSvgIcon-root': {
                    color: theme.palette.primary.main,
                }
            },
            '.MuiTypography-root':{
                [theme.breakpoints.down('lg')]: {
                    display: "none"
                }
            },
            '&.MuiButtonBase-root.Mui-selected': {
                backgroundColor: theme.palette.primary.light,
                borderRight: `5px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                '.MuiTypography-root': {
                    fontWeight: "600",
                },
                '.MuiSvgIcon-root': {
                    color: theme.palette.primary.main,
                }
            },
        },
        tenant: {
            marginBottom: "10px",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "35px",
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
                borderRight: `5px solid ${theme.palette.secondary.main}`,
                color: theme.palette.secondary.main,
                '.MuiSvgIcon-root': {
                    color: theme.palette.secondary.main,
                }
            },
            '&.MuiButtonBase-root.Mui-selected': {
                backgroundColor: theme.palette.secondary.light,
                borderRight: `5px solid ${theme.palette.secondary.main}`,
                color: theme.palette.secondary.main,
                '.MuiTypography-root': {
                    fontWeight: "600",
                },
                '.MuiSvgIcon-root': {
                    color: theme.palette.secondary.main,
                }
            },
            
        },
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
        dashboard: {
            width: "15%", 
            height: "100vh",
            [theme.breakpoints.down('lg')]: {
                width: "56px",
            }
        }
    }

  const [propertyItems, setPropertyItems] = useState([])
  const [username, setUsername] = useState('')
  const [userType, setUserType] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [isPending, setIsPending] = useState(true)
  const [active, setActive] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [checkGapiUserType, setCheckGapiUserType] = useState(null)
  const [checkProvider, setCheckProvider] = useState(null)
  const {authTokens, logoutUser, user} = useContext(AuthContext)
  const [style, setStyle] = useState(null)
  const [path, setPath] = useState(window.location.pathname)


  const checkToken = localStorage.getItem("authTokens");


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
        localStorage.setItem('authTokens', `${JSON.stringify(data)}`)
        setUserType(type)
        setCheckGapiUserType(true)
    }else{
        logoutUser()
    }
  }

  const checkUser = () => {
    if(localStorage.getItem('authTokens')){
      setUsername(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['username'])
      setCheckGapiUserType(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['gapi_user_type_set'])
      setCheckProvider(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['provider'])
      setUserType(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['user_type'])
    }
  }

  function CustomListButton({ to, icon, text }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
        <ListItemButton
            component={Link}
            to={to}
            selected={isActive ? true : false}
            sx={style}
        >
            <ListItemIcon sx={{minWidth: "40px"}}>
                {icon}
            </ListItemIcon>
            <ListItemText 
                primary={text} 
                primaryTypographyProps={{fontWeight: "400", fontSize: "15px"}} 
            />
        </ListItemButton>
    )
  }

  useEffect(() => {
    if(checkToken){
        checkUser()
        setModalOpen(checkProvider === 'google' && checkGapiUserType === false)
    }
    }, [checkToken]);

  useEffect(() => {
    checkUser()
    setModalOpen(checkProvider === 'google' && checkGapiUserType === false)
  }, [checkGapiUserType])

  useEffect(()=>{
    if(userType === 1){
        setStyle(styles.owner)
    }else if(userType === 2){
        setStyle(styles.tenant)
    }
    }, [userType])      

if(user){
  return (
    <>
    {/* Modal start */}
    <Modal
        open={modalOpen}
      >
      <Box sx={styles.modal}>
        <Typography variant="h6">
          Welcome {username},
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
    {/* Modal end */}

        {/* <div>
          {propertyItems.map((propertyItem, index) =>(
              <PropertyItem key={index} item={propertyItem} />
          ))}
        </div> */}
    <Box sx={styles.dashboard}>
        {modalOpen ? null 
        : 
        <Box sx={{width: "100%", height: "100vh", backgroundColor: "#fff"}}>
            <Stack
                direction="column" 
                justifyContent="flex-start"
                alignItems="center"
            >
                <Typography
                    sx={styles.logo}
                    variant="subtitle1"
                    gutterBottom
                >
                    Property Management App
                </Typography>
                <Typography
                    sx={styles.logoResize}
                    variant="subtitle1"
                    gutterBottom
                >
                    PMapp
                </Typography>
                <Divider sx={{width:"90%", borderBottomWidth: "2px", marginTop: "10px", marginBottom: "10px", backgroundColor: `${userType === 1 ? theme.palette.primary.main : theme.palette.secondary.main}`}} />
                <List sx={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <CustomListButton to="/" icon={<GridViewRoundedIcon />} text="Dashboard" />
                    <CustomListButton to="/property-list" icon={<HomeRoundedIcon />} text="Properties" />
                    <CustomListButton to="/issue-tracker" icon={<ErrorRoundedIcon />} text="Issue Tracker" />
                    <CustomListButton to="/reports" icon={<ArticleRoundedIcon />} text="Reports" />
                    <CustomListButton to="/map" icon={<LocationOnRoundedIcon />} text="Map" />
                    <ListItemButton
                        selected={false}
                        onClick={logoutUser}
                        sx={style}
                    >
                        <ListItemIcon sx={{minWidth: "40px"}}>
                            <LogoutRoundedIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Logout"
                            primaryTypographyProps={{fontWeight: "400", fontSize: "15px"}} 
                        />
                    </ListItemButton>
                </List>
            </Stack>
        </Box>
        }
    </Box>
  </>
  )
}else{
    return null;
}
}

export default Dashboard