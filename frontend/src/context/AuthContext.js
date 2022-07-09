import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : null)
    let [userType, setUserType] = (useState(() => localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['user_type'] : null))
    let [provider, setProvider] = useState('')
    let [gapiUserType, setGapiUserType] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)['gapi_user_type_set'] : null)
    let [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        let data = e
        let status = 200
        setProvider('google')
        if(e.type){
            let response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'email': e.target.email.value, 'password': e.target.password.value}),
            })
            data = await response.json()
            status = response.status
            setProvider('email')
        }
        if(status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            setGapiUserType(jwt_decode(data.access)['gapi_user_type_set'])
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
            return ({status: 200})
        }else if(status === 401){
            return ({status: 401, error: data['error']})
        }else{
            alert('Something went wrong!')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async ()=>{
        if (authTokens !== null){
            let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'refresh':authTokens?.refresh}),
            })
            let data = await response.json()
            if (response.status === 200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', `${JSON.stringify(data).slice(0, -1)},"email":"${jwt_decode(data.access).email}"}`)
            }else{
                logoutUser()
            }

            if(loading){
                setLoading(false)
            }
    }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        userType:userType,
        loginUser:loginUser,
        logoutUser:logoutUser,
        provider:provider,
        gapiUserType:gapiUserType,
        updateToken:updateToken
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }
        // let fourDays = 1000*3600*24*4
        let fourMinutes = 1000*60*4
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}