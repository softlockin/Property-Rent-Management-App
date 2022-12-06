import { Box, Modal, Stack, TextField, Typography, useTheme, Select, MenuItem, Paper, InputAdornment } from '@mui/material';
import Grid2 from "@mui/material/Unstable_Grid2";
import { LoadingButton } from '@mui/lab';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useEffect, useState } from 'react'
import IssueMessages from './IssueMessages';

const EditIssueModal = ({data, authTokens, editModalOpen, setEditModalOpen, setRefreshList, setSnackbar}) => {
    const [closingIssue, setClosingIssue] = useState(false)
    const [costValue, setCostValue] = useState('')
    const [issueMessages, setIssueMessages] = useState([])
    const [issueMessagesFetched, setIssueMessagesFetched] = useState(false)
    const [newMessage, setNewMessage] = useState('')
    const theme = useTheme()
    
    const styles = {
        modal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "50%",
            minWidth: "504px",
            maxWidth: "700px",
            [theme.breakpoints.down('sm')]: {maxWidth: "auto", width: "98vw", minWidth: "auto"},
            bgcolor: 'background.paper',
            borderRadius: '7px',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            padding: "0"
        },
        textField:{
            '& .MuiFilledInput-root': {
                '&:hover': {
                    borderColor: theme.palette.primary.main
                },
                '&.Mui-focused': {
                    borderColor: theme.palette.primary.main,
                  }},
                '& .MuiInputLabel-shrink, &.Mui-focused':{
                    // color: ,
                },
            '& .MuiFilledInput-input': {
                height: "0px",
                backgroundColor: "white",
                width: "100%",
            },
            '& .MuiFormControl-root, &.MuiTextField-root': {
                width: "70%"
            }
        },
        errorTextField: {
            '& .MuiFilledInput-root': {
                '&.Mui-error':{
                    border: '1px solid #d32f2f'
                }
            },
            '& .MuiFilledInput-input': {
                height: "0px",
                backgroundColor: "white",
                width: "100%"
            },
            '& .MuiFormControl-root, &.MuiTextField-root': {
                width: "70%"
            } 
        },
        statusPill: {
            open: {
              color: "#d64400",
              fontWeight: "400",
              marginLeft: "10px",
              border: "1px solid #d64400",
              borderRadius: "10px",
              padding: "0px 7px 0px 7px",
              backgroundColor: "#f8efec",
            },
            closed: {
              color: "#14ad00",
              marginLeft: "10px",
              marginBottom: "5px",
              border: "1px solid #14ad00",
              borderRadius: "10px",
              padding: "0px 7px 0px 7px",
              backgroundColor: "#f0f8ec",
            },
          },
    }

    const handleClose = () => {
        setEditModalOpen(false)
        setClosingIssue(false)
        setCostValue('')
    }
    
    const handleSave = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/issue/${data.id}/`, {
              method: 'PUT',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'Bearer ' + String(authTokens.access)
              },
              body:JSON.stringify({
                'closed': true,
                'cost': parseInt(costValue)
                
              }),
              })
            let status = response.status
            let message = await response.json()

            if(status === 200){
                setClosingIssue(false)
                setCostValue('')
                setTimeout(function(){
                    setSnackbar(prev => ({
                        ...prev,
                        open: true,
                        type: 'success',
                        message: 'Issue has been closed.'
    
                    }))
                }, 500)
                
                setTimeout(function(){
                    setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
                setRefreshList(true)
                setEditModalOpen(false)
            }else{
                setClosingIssue(false)
                setCostValue('')
                setEditModalOpen(false)
                setSnackbar(prev => ({
                    ...prev,
                    open: true,
                    type: 'error',
                    message: message.error

                }))
                setTimeout(function(){
                    setSnackbar(prev => ({
                        ...prev,
                        open: false,
                    })) 
                }, 3500)
            }
    }

    const addMessage = async () => {
        if(newMessage === ''){return}
        let response = await fetch(`http://127.0.0.1:8000/api/issue/${data.id}/message/`, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access),
        },
        body:JSON.stringify({
            'message': newMessage
        }),
        })
        let message_object = await response.json()
        if(response.status === 201){
            setNewMessage('')
            setIssueMessages((prev) => [...prev, message_object])
        }
      }

      const fetchIssueMessages = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/issue/${data.id}/message/`, {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        })
        let fetched_data = await response.json()
    
        if(response.status === 200){
            setIssueMessages(fetched_data)
            setIssueMessagesFetched(true)
        }
      }

    useEffect(() => {
        if(editModalOpen === true){
            setSnackbar(prev => ({
                ...prev,
                open: false,
                type: 'warning',
                message: ''

            }))
            fetchIssueMessages()
        }
    }, [editModalOpen])

  return (
    <Modal
        open={editModalOpen}
    >
        <Box sx={styles.modal}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "flex-start", width: "100%"}}>
                <Box sx={{width: "80%"}}>
                    <Typography variant="h5" sx={{color: "#02143d", fontWeight: "600", margin: "10px 0 5px 10px"}}>
                        {data?.name}
                    </Typography>
                </Box>
                <Box sx={{width: "20%", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", margin: "5px"}}>
                    <CloseRoundedIcon onClick={()=>{handleClose()}} sx={{color: "#7d7d7d", "&:hover": {color: "black", cursor: "pointer"}}}/>
                </Box>
            </Box>
            <Box sx={{backgroundColor: "#f2f2f2", borderRadius: "inherit"}}>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{width: "100%", borderRadius: "inherit"}}
                >
                    <Grid2
                        container
                        sx={{width: "100%", padding: "20px"}}
                        spacing={1}
                    >
                        <Grid2 xs={6} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                                Property
                            </Typography>
                        </Grid2>
                        <Grid2 xs={6} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Typography variant="subtitle2" sx={{color: "#02143d"}}>
                                Created on
                            </Typography>
                        </Grid2>
                        <Grid2 xs={6} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <Typography
                            variant="subtitle2"
                            sx={{ color: "#1976d2", fontWeight: "600"}}
                        >
                            {data?.property}
                        </Typography>
                        </Grid2>
                        <Grid2 xs={6} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Typography
                                variant="subtitle2"
                                sx={{ color: "#1976d2", fontWeight: "600"}}
                            >
                                {data?.date}
                            </Typography>
                        </Grid2>
                        <Grid2 xs={12} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Typography variant="subtitle2" mt={2} sx={{color: "#02143d"}}>
                                Description
                            </Typography>
                        </Grid2>
                        <Grid2 xs={12} sx={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Paper elevation={2} sx={{width: "100%", minHeight: "60px"}}>
                                <Typography variant="subtitle1" sx={{color: "#02143d", paddingLeft: "10px"}}>
                                    {data?.description}
                                </Typography>
                            </Paper>
                        </Grid2>
                    </Grid2>
                    <Typography variant="subtitle2" sx={{color: "#02143d", padding: "10px 10px 0px 20px"}}>
                        Messages
                    </Typography>
                    <Box sx={{backgroundColor: "#f2f2f2", width: "100%", minHeight: "120px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <QuestionAnswerIcon sx={{color: "#919191", fontSize: "65px", position: "fixed", zIndex: "1"}} />
                        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "0px 20px 0px 20px", border: "1px solid #919191", minHeight: "inherit", minWidth: "calc(100% - 42px)"}}>
                            { issueMessages.length === 0 ?
                            <Typography variant="caption" sx={{color: "#02143d", position: "relative", top: "38px"}}>
                                No messages
                            </Typography>
                            :
                            <IssueMessages messagesLoaded={issueMessagesFetched} data={issueMessages} />
                            }
                        </Box> 
                    </Box>
                    {!data?.closed ? 
                    <Box sx={{width:"100%", margin: "0px 0px 20px 20px"}}>
                        <TextField
                        variant="outlined"
                        onChange={(e)=>setNewMessage(e.target.value)}
                        value={newMessage}
                        multiline
                        maxRows={3}
                        placeholder="Add a message"
                        sx={{width: "calc(100% - 40px)", "& .MuiInputBase-root": {borderRadius: "0px", backgroundColor: "#fff", padding: "0px"}, "& .MuiInputBase-input": {padding: "5px", fontWeight: "400", fontSize: "0.875rem"}}}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position='end' onClick={()=>addMessage()} sx={{margin: "0", padding: "5px", height: "100%", color: theme.palette.primary.main, "&:hover": {cursor: "pointer"}}}>
                                <Typography variant="body1">
                                    Add
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                    </Box>
                    : null}
                </Stack>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="subtitle2" sx={{display: {[theme.breakpoints.down('bss')]: {display: 'none'}},color: "#02143d"}}>
                        Status:
                    </Typography>
                    <Select
                        disabled={data?.closed}
                        disableUnderline
                        defaultValue={data?.closed ? 2 : 1}
                        variant="standard"
                        onChange={() => setClosingIssue(!closingIssue)}
                        sx={{margin: "0px 10px 0px 10px"}}
                    >
                        <MenuItem value={1}>Open</MenuItem>
                        <MenuItem value={2}>Closed</MenuItem>
                    </Select>
                    {!data?.closed ?
                    closingIssue ?
                    <TextField
                            variant="outlined"
                            placeholder="0"
                            value={costValue}
                            onChange={(e)=>{
                                const input = e.target.value.replace(/[^0-9]/g, '')
                                setCostValue(input)
                            }}
                            sx={{width: "140px", "& .MuiInputBase-root": {borderRadius: "0px", backgroundColor: "#fff", padding: "0px"}, "& .MuiInputBase-input": {padding: "5px", fontWeight: "400", fontSize: "0.875rem"}}}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <Typography variant="subtitle2" sx={{color: "#02143d", marginLeft: "5px"}}>
                                            Cost:
                                        </Typography>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <>
                                <InputAdornment position='end' sx={{margin: "0px 5px 0px 0px"}}>
                                    <Typography variant="body1">
                                        LEI
                                    </Typography>
                                </InputAdornment>
                                </>
                                ),
                            }}
                    />
                    :null
                    :
                    <TextField
                        disabled
                        variant="outlined"
                        value={data?.cost}
                        sx={{width: "140px", "& .MuiInputBase-root": {borderRadius: "0px", backgroundColor: "#fff", padding: "0px"}, "& .MuiInputBase-input": {padding: "5px", fontWeight: "400", fontSize: "0.875rem"}}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <Typography variant="subtitle2" sx={{color: "#02143d", marginLeft: "5px"}}>
                                        Cost:
                                    </Typography>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <>
                            <InputAdornment position='end' sx={{margin: "0px 5px 0px 0px"}}>
                                <Typography variant="body1">
                                    LEI
                                </Typography>
                            </InputAdornment>
                            </>
                            ),
                        }}
                    />
                    }
                </Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <LoadingButton
                    onClick={()=>handleSave()}
                    disabled={data?.closed || costValue === ''}
                    variant="contained"
                    elevation={0}
                    size="small"
                    color="success"
                    sx={{width:"75px", boxShadow:"0", marginLeft: "10px", backgroundColor: "#61a531", "&:hover": {backgroundColor: "#58952d"}}}
                    >
                        Save
                    </LoadingButton>
                </Box>
            </Box>
        </Box>
    </Modal>
  )
}

export default EditIssueModal