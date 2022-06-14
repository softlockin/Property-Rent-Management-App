import React, { useState, useEffect, useContext } from 'react'
import jwt_decode from "jwt-decode"
import { Box, Modal, Typography } from "@mui/material"
import AuthContext from '../context/AuthContext'
import PropertyItem from '../components/PropertyItem'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  let [propertyItems, setPropertyItems] = useState([])
  let [isPending, setIsPending] = useState(true)
  let [active, setActive] = useState(false)
  let [modalOpen, setModalOpen] = useState(false)
  let [checkGapiUserType, setCheckGapiUserType] = useState(localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['gapi_user_type_set'] : null)
  let [checkProvider, setCheckProvider] = useState(localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['provider'] : null)
  let {authTokens, logoutUser, provider, gapiUserType} = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(()=> {
    getPropertyItems()
  }, [])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  let getPropertyItems = async ()=> {
    let response = await fetch('http://127.0.0.1:8000/api/property-items/', {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if(response.status === 200){
      setPropertyItems(data)
      setIsPending(false)
    }else if(response.status === 401){
      logoutUser()
    }
  }

  let addProperty = async (e)=>{
    e.preventDefault()
    let response = await fetch('http://127.0.0.1:8000/api/property-items/', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        body:JSON.stringify({'name':e.target.name.value, 'address':e.target.address.value}),
    })
    if(response.status === 201){
      navigate('/')
    }
  }

  let handleAdd = () => {
    setActive(!active)
  }

  useEffect(() => {
    console.log(checkGapiUserType)
    console.log(gapiUserType)
    console.log(provider)
    console.log(checkProvider)
    if((provider === 'google' || checkProvider === 'google') && (checkGapiUserType === false || gapiUserType === false)){
      setModalOpen(true)
    }
  }, [])

  return (
    <>
    <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
    <div>
        <p>You opened home page!</p>

        <div >
          <input type="button" value="Add new" style={{'color':'red','textAlign':'left'}} onClick={handleAdd} />
        </div>
        {isPending && <div>Loading...</div>}
        {active === true && <div className="addNew">
          <form onSubmit={addProperty}>
            <input type="text" name="name" placeholder="Property name..." />
            <input type="text" name="address" placeholder="Address..." />
            <input type="submit" value="Add" />
          </form>
        </div>}
        <div>
          {propertyItems.map((propertyItem, index) =>(
              <PropertyItem key={index} item={propertyItem} />
          ))}
        </div>
        <div>{authTokens?.user_type}</div>
    </div>
  </>
  )
}

export default HomePage