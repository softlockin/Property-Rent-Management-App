import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const PropertyPage = () => {
    let { id } = useParams()
    let [property, setProperty] = useState(null)
    let [isPending, setIsPending] = useState(true)
    let [error, setError] = useState(null)
    const [name, setName] = useState('')
    let {authTokens, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()

   useEffect(() => {
        getProperty()
   },[id])

    let getProperty = async ()=>{
        let response = await fetch(`http://127.0.0.1:8000/api/property/${ id }/`, {
            method:'GET',
            headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if(response.status === 200){
            setProperty(data)
            setName(data.name)
            setIsPending(false)
          }else if(response.status === 400){
            setError('Woops, something went wrong!')
            setIsPending(false)
          }else if(response.status === 401){
            setError('You are not authorized to view this property')
            setIsPending(false)
          }else if(response.status === 404){
            setError('Not found')
            setIsPending(false)
          }
    }

    let updateProperty = async (e) =>{
        e.preventDefault();
        property['name'] = e.target.propertyName.value
        await fetch(`http://127.0.0.1:8000/api/property/${ id }/`, {
            method:'PUT',
            headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify(property)
        })
        navigate('/')
    }

    let deleteProperty = async (e) =>{
        e.preventDefault();
        await fetch(`http://127.0.0.1:8000/api/property/${ id }/`, {
            method:'DELETE',
            headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify(property)
        })
        navigate('/')
    }

    return (
    <div>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {property && <p>Property <span style={{'fontWeight': 'bold', 'color': 'blue'}}>{property?.name}</span></p>}
        {property &&
        <div>

            Update details <br /><br />
            <form onSubmit={updateProperty}>
                <label htmlFor="name">Property name:</label> <br />
                <input type="text" name="propertyName" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="submit" value="Save" />
            </form> 
        <p>Delete property</p>
        <input type="submit" value="Delete" onClick={deleteProperty} />
        </div>}
    </div>
    )
    }

export default PropertyPage