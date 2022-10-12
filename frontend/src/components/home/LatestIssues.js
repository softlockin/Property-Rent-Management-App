import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import AuthContext from '../../context/AuthContext'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';

const LatestIssues = () => {

    const {authTokens} = useContext(AuthContext)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('lg'))
    const navigate = useNavigate()
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
                <Grid2 xs={4}>
                    <Typography variant="body1" sx={{color: "#02143d"}}>
                        {p}
                    </Typography>
                </Grid2>
                <Grid2 display="flex" justifyContent="flex-start" alignItems="center" xs={6}>
                    <Typography variant="body2" sx={{color: "#02143d"}}>
                        {d}
                    </Typography>
                </Grid2>
                <Grid2 display="flex" justifyContent="flex-end" alignItems="center" xs={2}>
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
        {
        issue.length === 0 ?
            <Typography variant="caption" ml={1} sx={{color: "#7d7d7d"}}>
                There are no recent issues
            </Typography>
            :
            issue.map((item)=>(
                <IssueItem key={item.id} p={item.property_name} d={item.name} c={item.closed} t={item.created_at}/>
                )
            )
        }
        <Button
            onClick={() => {navigate('issue-tracker')}}
            variant="outlined"
            elevation={0}
            size="small"
            sx={{margin: "20px 0 25px", boxShadow:"0"}}
        >
            View all issues
        </Button>
    </Stack>
  )
}

export default LatestIssues