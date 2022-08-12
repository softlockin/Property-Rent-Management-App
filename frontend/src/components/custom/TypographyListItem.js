import { Typography } from '@mui/material'
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import React from 'react'

export const TypographyListItem = ({ color, text }) => {
  return (
    <Typography variant="subtitle2" mb={1} sx={{fontWeight: "400", color: "#292929", display: "flex", alignItems: "center"}}>
        <ArrowRightRoundedIcon sx={{color: {color}}} />
        {text}
    </Typography>
  )
}

