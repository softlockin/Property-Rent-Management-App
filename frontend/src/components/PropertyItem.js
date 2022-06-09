import React from 'react'
import { Link } from 'react-router-dom'

const PropertyItem = ({item}) => {
  return (
    <div>
      <Link to={`/property/${item.id}`}>
        <h3>{item.name}</h3>
      </Link>
    </div>
  )
}

export default PropertyItem