import React, { useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode"
import { Box, Divider, Button, Modal, Stack, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AuthContext from '../../context/AuthContext'
import { TypographyListItem } from '../custom/TypographyListItem';
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
            '.MuiTypography-root':{
                [theme.breakpoints.down('lg')]: {
                    display: "none"
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

  const [checkGapiUserType, setCheckGapiUserType] = useState(null)
  const [checkProvider, setCheckProvider] = useState(null)
  const {logoutUser, user} = useContext(AuthContext)
  const [style, setStyle] = useState(null)
  const [userType, setUserType] = useState('')
  const [barVisible, setBarVisible] = useState(true)

  // const checkUser = () => {
  //   if(localStorage.getItem('authTokens')){
  //     setUsername(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['username'])
  //     setCheckGapiUserType(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['gapi_user_type_set'])
  //     setCheckProvider(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['provider'])
  //     setUserType(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['user_type'])
  //   }
  // }

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

  useEffect(()=>{
    if(user){
      setUserType(user['user_type'])

      if(user['gapi_user_type_set'] === true || user['provider'] === 'email'){
        setBarVisible(true)
      }
    }else{
      setBarVisible(false)
    }
    }, [user])
  
  useEffect(()=>{
    if(userType === 1){
        setStyle(styles.owner)
    }else if(userType === 2){
        setStyle(styles.tenant)
    }
  }, [userType])
  
  // useEffect(()=> {
    
  //   }
  // }, [])

if(barVisible){
  return (
    <>
    <Box sx={styles.dashboard}>
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
                  {userType === 1 ? 
                    <>
                    <CustomListButton to="/" icon={<GridViewRoundedIcon />} text="Dashboard" />
                    <CustomListButton to="/property-list" icon={<HomeRoundedIcon />} text="Properties" />
                    <CustomListButton to="/issue-tracker" icon={<ErrorRoundedIcon />} text="Issue Tracker" />
                    <CustomListButton to="/reports" icon={<ArticleRoundedIcon />} text="Reports" />
                    <CustomListButton to="/map" icon={<LocationOnRoundedIcon />} text="Map" />
                    <Divider sx={{width:"90%", borderBottomWidth: "2px", marginTop: "10px", marginBottom: "10px", position: "relative", left: "5%", backgroundColor: `${userType === 1 ? theme.palette.primary.main : theme.palette.secondary.main}`}} />
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
                    </>
                    : 
                    <>
                      <CustomListButton to="/" icon={<GridViewRoundedIcon />} text="Dashboard" />
                      <CustomListButton to="/issue-tracker" icon={<ErrorRoundedIcon />} text="Issue Tracker" />
                      <CustomListButton to="/map" icon={<LocationOnRoundedIcon />} text="Map" />
                      <Divider sx={{width:"90%", borderBottomWidth: "2px", marginTop: "10px", marginBottom: "10px", position: "relative", left: "5%", backgroundColor: `${userType === 1 ? theme.palette.primary.main : theme.palette.secondary.main}`}} />
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
                    </>}
                </List>
            </Stack>
        </Box>
        
    </Box>
  </>
  )
}else{
    return null;
}
}

export default Dashboard