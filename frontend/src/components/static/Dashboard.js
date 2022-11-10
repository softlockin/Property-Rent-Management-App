import React, { useState, useEffect, useContext } from 'react'
import { Button, Box, Divider, Stack, Typography, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import AuthContext from '../../context/AuthContext'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Drawer from '@mui/material/Drawer';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Dashboard = (props) => {
    const theme = useTheme()
    const switchMobile = useMediaQuery(theme.breakpoints.down('md'));
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
                    display: "none",
                },
                [theme.breakpoints.down('md')]: {
                    display: "block"
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

  const {logoutUser, user} = useContext(AuthContext)
  const [style, setStyle] = useState(null)
  const [userType, setUserType] = useState('')
  const [openMenu, setOpenMenu] = useState(false)

  function CustomListButton({ to, icon, text }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
        <ListItemButton
            component={Link}
            to={to}
            disableRipple
            selected={isActive ? true : false}
            sx={style}
            onClick={()=>setOpenMenu(false)}
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
    if(user && props.otherActions === false){
      setUserType(user['user_type'])

      if(user['gapi_user_type_set'] === true || user['provider'] === 'email'){
        props.setBarVisible(true)
      }
    }else{
      props.setBarVisible(false)
    }
    }, [user, props.otherActions])
  
  useEffect(()=>{
    if(userType === 1){
        setStyle(styles.owner)
    }else if(userType === 2){
        setStyle(styles.tenant)
    }
  }, [userType])

if(props.barVisible){
  return (
    <>
    {!switchMobile ?
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
                    <CustomListButton to="/invoices" icon={<ArticleRoundedIcon />} text="Invoices" />
                    <CustomListButton to="/map" icon={<LocationOnRoundedIcon />} text="Map" />
                    <Divider sx={{width:"90%", borderBottomWidth: "2px", marginTop: "10px", marginBottom: "10px", position: "relative", left: "5%", backgroundColor: `${userType === 1 ? theme.palette.primary.main : theme.palette.secondary.main}`}} />
                    <ListItemButton
                        selected={false}
                        disableRipple
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
                        disableRipple
                        selected={false}
                        onClick={logoutUser}
                        sx={style}
                      >
                        <ListItemIcon sx={{minWidth: "40px"}}>
                            <LogoutRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                            disableRipple
                            primary="Logout"
                            primaryTypographyProps={{fontWeight: "400", fontSize: "15px"}} 
                        />
                      </ListItemButton>
                    </>}
                </List>
            </Stack>
        </Box>       
    </Box>
    :
    <React.Fragment>
        <Box sx={{width: "100%", borderBottom: `2px solid ${theme.palette.primary.main}`, backgroundColor: "#fff", display: "flex", position: "relative", zIndex: "1", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
            <Button startIcon={<MenuRoundedIcon />} onClick={()=>setOpenMenu(true)} sx={{zIndex: "1", marginLeft: "10px", minWidth: "5px"}}>
                PMapp
            </Button>
            <Typography variant="h6" sx={{color: "#02143d", fontWeight: "600", position: "absolute", left: "calc(50% - 54.883px)"}}>
                {props.mobileViewNavTitle}
            </Typography>
            <Button variant="outlined" startIcon={<AccountCircleRoundedIcon />} size="small" 
            sx={{color: "#02143d", borderColor: "#02143d", borderRadius: "7px",
                    marginRight: "10px",
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
                {user?.username}
            </Button>
        </Box>
        <Drawer
        open={openMenu}
        onClose={()=>setOpenMenu(false)}
        >
            <Box sx={{width: "255px", height: "100vh", backgroundColor: "#fff"}}>
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
                        <CustomListButton to="/invoices" icon={<ArticleRoundedIcon />} text="Invoices" />
                        <CustomListButton to="/map" icon={<LocationOnRoundedIcon />} text="Map" />
                        <Divider sx={{width:"90%", borderBottomWidth: "2px", marginTop: "10px", marginBottom: "10px", position: "relative", left: "5%", backgroundColor: `${userType === 1 ? theme.palette.primary.main : theme.palette.secondary.main}`}} />
                        <ListItemButton
                            selected={false}
                            disableRipple
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
                            disableRipple
                            selected={false}
                            onClick={logoutUser}
                            sx={style}
                        >
                            <ListItemIcon sx={{minWidth: "40px"}}>
                                <LogoutRoundedIcon />
                            </ListItemIcon>
                            <ListItemText
                                disableRipple
                                primary="Logout"
                                primaryTypographyProps={{fontWeight: "400", fontSize: "15px"}} 
                            />
                        </ListItemButton>
                        </>}
                    </List>
                </Stack>
            </Box>
        </Drawer>
    </React.Fragment>}
  </>
  )
}else{
    return null;
}
}

export default Dashboard