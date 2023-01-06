import { Box, Button, Paper, Stack, TextField, Typography, useTheme, Alert } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import AuthContext from '../../../context/AuthContext';
import React, { useState, useContext } from 'react';

const OpenIssue = ({property}) => {
    const theme = useTheme()
    const lmS = useMediaQuery(theme.breakpoints.down('lmd'))
    const [issueDetails, setIssueDetails] = useState({
        name: '',
        description: '',
    })
    const {authTokens} = useContext(AuthContext)
    const [fieldsError, setFieldsError] = useState({
        nameError: false,
        descriptionError: false
    })
    const [openIssueSuccess, setOpenIssueSuccess] = useState(false)

    const openIssue = async () => {
        if(issueDetails.name === ''){
            setFieldsError(prev => ({
                ...prev,
                nameError: true
            }))
        }
        if(issueDetails.description === ''){
            setFieldsError(prev => ({
                ...prev,
                descriptionError: true
            }))
        }else{
            let response = await fetch(`http://127.0.0.1:8000/api/issues/`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access),
            },
            body:JSON.stringify({
                'name': issueDetails.name,
                'description': issueDetails.description,
                'linked_to_property': property.id
            }),
            })

            if(response.status === 201){
                setOpenIssueSuccess(true)
                setFieldsError({
                    nameError: false,
                    descriptionError: false
                })
                setTimeout(()=>{
                    setOpenIssueSuccess(false)
                }, "3500")
                setIssueDetails({
                    name: '',
                    description: ''
                })
            }
        }
      }

  return (
    <>
        <Paper elevation={3} sx={{width: !lmS ? "48%" : "100%", minHeight: "380px", borderRadius: "10px", "&.MuiPaper-root": {marginLeft: "0px"}}}>
            <Typography variant="h5" sx={{color: "#02143d", fontWeight: "600", margin: "25px 0 0 25px"}}>
                Open new issue
            </Typography>
            <Stack
              direction="column" 
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{margin: "25px 25px 15px 25px"}}
            >
                {property.length === 0 ?
                <Alert variant="outlined" severity="info">Your account is not linked to any property.</Alert>
                :
                <>
              <Typography variant="body2" sx={{color: "#7d7d7d", marginBottom: "10px"}}>
                Enter a name and a description of the issue you are facing.
              </Typography>
              <Typography variant="h7" sx={{color: "#02143d", fontWeight: "400", marginBottom: "10px"}}>
                Name
              </Typography>
              <TextField
                InputProps={{ disableUnderline: true }}
                inputProps={{
                    maxLength: 25,
                  }}            
                name="issue-name"
                type="text"
                variant="filled"
                hiddenLabel
                placeholder="Issue name"
                fullWidth
                value={issueDetails.name}
                onChange={(e) => setIssueDetails(prev => ({
                    ...prev,
                    name: e.target.value
                }))}
                error={fieldsError.nameError}
                sx={{"& .MuiFilledInput-input": {
                    padding: "0px 12px 0px 12px"
                }, marginBottom: "15px", '& .MuiFilledInput-root': {
                    '&.Mui-error':{
                        border: '1px solid #d32f2f'
                    }
                },}}
                helperText={fieldsError.nameError ? "Issue must have a name." : null}
                />
                <Typography variant="h7" sx={{color: "#02143d", fontWeight: "400", marginBottom: "10px"}}>
                    Description
                </Typography>
                <TextField
                InputProps={{ disableUnderline: true }}
                inputProps={{
                    maxLength: 256,
                  }} 
                name="description"
                type="text"
                variant="filled"
                hiddenLabel
                multiline
                minRows={2}
                maxRows={3}
                placeholder="Description"
                fullWidth
                value={issueDetails.description}
                onChange={(e) => setIssueDetails(prev => ({
                    ...prev,
                    description: e.target.value
                }))}
                error={fieldsError.descriptionError}
                sx={{'& .MuiFilledInput-root': {
                    '&.Mui-error':{
                        border: '1px solid #d32f2f'
                    }
                }}}
                helperText={fieldsError.descriptionError ? "Issue must have a description." : null}
                />
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                    <Button
                        onClick={openIssue}
                        type="submit"
                        variant="outlined"
                        elevation={0}
                        size="small"
                        sx={{width:"75px", marginTop: "15px", boxShadow: "0", color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main, "&:hover": {backgroundColor: theme.palette.secondary.light, borderColor: theme.palette.secondary.main}}}
                    >
                        Create
                    </Button>
                    {openIssueSuccess ?
                    <Typography variant="caption" sx={{color: theme.palette.secondary.main, fontWeight: "400", marginTop: "15px", marginLeft: "15px"}}>
                        Issue created!
                    </Typography>
                    : null
                    }
                </Box>
                </>
                }
            </Stack>
        </Paper>
    </>
  )
}

export default OpenIssue