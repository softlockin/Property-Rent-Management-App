import { Alert,Stack } from '@mui/material'
import React from 'react'
import { useEffect, useState, useContext } from "react"
import AuthContext from '../context/AuthContext'

const clientId = process.env.REACT_APP_GOOGLE_CID

const GoogleLoginButton = () => {
    let [googleToken, setGoogleToken] = useState('')
    let [googleLoginErr, setGoogleLoginErr] = useState({
      raised: false,
      error: ''
    })
    
    const google = window.google
    let {loginUser} = useContext(AuthContext)

    const handleCred = (response) => {
        setGoogleToken(response.credential)
    }

    async function googleLogin(token) {
        await fetch('http://127.0.0.1:8000/api/login/google/', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'auth_token': token})})
                .then(response => response.json())
                .then(response => {
                  if(response['detail'] === '403') return setGoogleLoginErr({raised: true, error: "Account inactive!"})
                  if(response['detail'] === '401') return setGoogleLoginErr({raised: true, error: "The provided google account was registered with email/password."})
                  loginUser(response)
                });
            }
    
    useEffect(() => {
    
          google.accounts.id.initialize({
            client_id: `${clientId}`, 
            callback: handleCred,
            login_uri: "http://localhost:3000/",
            context: 'use',
            ux_mode: 'popup',
          });
          google.accounts.id.renderButton( document.getElementById("gs2"), {
            type: 'standard',
            size: 'medium',
            text: 'continue_with'
          });
    },[])
    
    useEffect(() => {
    if(googleToken !== ''){
      googleLogin(googleToken)
    }
  }, [googleToken])

    return (
      <>
      
      <Stack alignItems="center" justifyContent="center" spacing={2}>
         <div id="gs2"></div>
        {googleLoginErr.raised && <Alert variant="outlined" onClose={() => {setGoogleLoginErr({raised: false, error: ''});}} severity="error">{googleLoginErr.error}</Alert>}
      </Stack>
      </>
  )
}

export default GoogleLoginButton