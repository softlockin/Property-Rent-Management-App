import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import PropertyItem from '../components/PropertyItem'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  let [propertyItems, setPropertyItems] = useState([])
  let [isPending, setIsPending] = useState(true)
  let [active, setActive] = useState(false)
  let {authTokens, logoutUser} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=> {
    getPropertyItems()
  }, [])

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

 

  return (
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
  )
}

export default HomePage