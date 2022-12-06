import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import AuthContext from '../../context/AuthContext'
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';

const LatestIssues = () => {

    const {authTokens} = useContext(AuthContext)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('lg'))
    const navigate = useNavigate()
    const [fetchError, setFetchError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [issue, setIssue] = useState([])

    const styles = {
        issuePill: {
            open: {
                color: "#d64400", 
                border: "1px solid #d64400", 
                borderRadius: "10px", 
                padding: "0px 7px 0px 7px",
                backgroundColor: "#f8efec"
            },
            closed: {
                color: "#14ad00", 
                border: "1px solid #14ad00", 
                borderRadius: "10px", 
                padding: "0px 7px 0px 7px",
                backgroundColor: "#f0f8ec"
            }
        }
    }

    function IssueItem({p, d, c, t}) {
        return(
            <Grid2 container sx={{width: "100%"}}>
                <Grid2 xs={6} bss={5}>
                    <Typography variant="body1" 
                        sx={{color: "#02143d", 
                            [theme.breakpoints.down('bss')]: {
                                fontSize: "14px"
                            },}}
                    >
                        {p}
                    </Typography>
                </Grid2>
                <Grid2 display="flex" justifyContent="flex-start" alignItems="center" xs={4} bss={5}>
                    <Typography variant="body2" 
                    sx={{color: "#02143d", 
                        [theme.breakpoints.down('bss')]: {
                            fontSize: "13px"
                        }
                        }}
                    >
                        {d}
                    </Typography>
                </Grid2>
                <Grid2 display="flex" justifyContent="flex-end" alignItems="center" xs={2} bss={2}>
                    <Typography variant="caption" sx={c === true ? styles.issuePill.closed : styles.issuePill.open}>
                        {c === true ? "closed" : "open"}
                    </Typography>
                </Grid2>
                <Grid2 xs={6} mb={1}>
                    <Typography variant="caption" sx={{color: "#7d7d7d"}}>
                        {t}
                    </Typography>
                </Grid2>
            </Grid2>
        )
    }

    const fetchRecentIssues = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/issues/?recent=true', {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        })
        let data = await response.json()
  
        if(response.status === 200){
            setIssue(data)
            setLoaded(true)
        }else{
            setFetchError(true)
        }
    }

    useEffect(()=>{
        fetchRecentIssues();
    }, [])

  return (
    <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{width: matches ? "48%" : "100%"}}
    >
        <Typography variant="subtitle2" sx={{color: "#7d7d7d"}}>
            Latest open issues
        </Typography>
        <Divider sx={{width:"100%", borderBottomWidth: "1px", marginTop: "10px", marginBottom: "10px", backgroundColor: "#cdcbcb"}} />
        {fetchError ? 
        <Typography variant="subtitle2" sx={{color: "#d32f2f", marginTop: "10px"}}>
            Something went wrong while loading data. Refresh page!
        </Typography>
        :
        loaded ? 
        (issue.length === 0 ?
            <Typography variant="caption" ml={1} sx={{color: "#7d7d7d"}}>
                There are no recent issues
            </Typography>
            :
            issue.map((item)=>(
                <IssueItem key={item.id} p={item.property_name} d={item.name} c={item.closed} t={item.created_at}/>
                )
            )
        ):
        <CircularProgress size="30px" sx={{marginTop: "10px"}} />
        }
        <Button
            onClick={() => {navigate('issue-tracker')}}
            variant="outlined"
            elevation={0}
            size="small"
            sx={{marginTop: "20px", boxShadow:"0"}}
        >
            View all issues
        </Button>
    </Stack>
  )
}

export default LatestIssues