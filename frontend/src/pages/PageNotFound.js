import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/')
  }, [])

  return (
    <div>404</div>
  )
}

export default PageNotFound