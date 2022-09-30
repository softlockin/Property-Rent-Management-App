import React, { memo, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Tooltip from '@mui/material/Tooltip';

const PropertiesList = ({data}) => {

    const styles = {
        statusPill: {
            unoccupied: {
                color: "#7d7d7d",
                fontWeight: "400",
                border: "1px solid #7d7d7d", 
                borderRadius: "10px", 
                padding: "2px 7px 2px 7px",
                backgroundColor: "#fafafa"
            },
            rented: {
                color: "#14ad00", 
                border: "1px solid #14ad00", 
                borderRadius: "10px", 
                padding: "2px 7px 2px 7px",
                backgroundColor: "#f0f8ec"
            },
        },
    }

    function PropertyItem({id, name, address, price, tenant}){
        const [showActions, setShowActions] = useState(false)

        return(
            <Grid2 container onMouseEnter={()=>setShowActions(true)} onMouseLeave={()=>setShowActions(false)} spacing={1} sx={{width: "100%", margin: "10px 10px 10px 10px", "&:hover": {
                backgroundColor: "#fafafa"
            }}}>
                <Grid2 xs={4} sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Typography variant="subtitle2" sx={{color: "#1976d2", fontWeight: "600"}}>
                        {name}
                    </Typography>
                    <Tooltip title="Delete" arrow placement="top">
                        <DeleteOutlineRoundedIcon onClick={()=>console.log(id)} sx={{fontSize: "15px", marginLeft: "35px", display: `${showActions ? "inherit" : "none"}`, cursor: "pointer", "&:hover": {borderRadius: "5px", backgroundColor: "#e1e1e1"}}} />
                    </Tooltip>
                    <Tooltip title="Link" arrow placement="top">
                        <LinkRoundedIcon onClick={()=>console.log(id)} sx={{fontSize: "15px", marginLeft: "5px", display: `${showActions ? "inherit" : "none"}`, cursor: "pointer", "&:hover": {borderRadius: "5px", backgroundColor: "#e1e1e1"}}} />
                    </Tooltip>
                    <Tooltip title="Edit" arrow placement="top">
                        <EditRoundedIcon onClick={()=>console.log(id)} sx={{fontSize: "15px", marginLeft: "5px", display: `${showActions ? "inherit" : "none"}`, cursor: "pointer", "&:hover": {borderRadius: "5px", backgroundColor: "#e1e1e1"}}} />
                    </Tooltip>
                    
                </Grid2>
                <Grid2 xs={3}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d", fontWeight: "400"}}>
                        {address}
                    </Typography>
                </Grid2>
                <Grid2 xs={1.5}>
                    <Typography variant="caption" sx={tenant === null ? styles.statusPill['unoccupied'] : styles.statusPill['rented']}>
                        {tenant === null ? "Unoccupied" : "Rented"}
                    </Typography>
                </Grid2>
                <Grid2 xs={2.5}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d", fontWeight: "400", overflow: "auto"}}>
                        {tenant ? tenant : "--"}
                    </Typography>
                </Grid2>
                <Grid2 xs={1}>
                    <Typography variant="subtitle2" sx={{color: "#7d7d7d", fontWeight: "400"}}>
                        {price}
                    </Typography>
                </Grid2>
            </Grid2>
        )
    }

  return (
    data.map((item)=>(
        <PropertyItem key={item.id} id={item.id} name={item.name} address={item.address+", "+item.city} price={item.price+(item.currency === 2 ? " LEI" : " EUR")} tenant={item.tenant_email}/>
        )
    )
  )
}

export default memo(PropertiesList)