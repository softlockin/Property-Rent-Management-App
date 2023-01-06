import React, { memo } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Paper, Typography, useTheme } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const PropertiesList = ({ data, setEditModalOpen, setSelectedProperty }) => {
  const theme = useTheme()
  const switchMobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles = {
    statusPill: {
      unoccupied: {
        color: "#7d7d7d",
        fontWeight: "400",
        marginLeft: "10px",
        border: "1px solid #7d7d7d",
        borderRadius: "10px",
        padding: "0px 7px 0px 7px",
        backgroundColor: "#fafafa",
      },
      rented: {
        color: "#14ad00",
        marginLeft: "10px",
        border: "1px solid #14ad00",
        borderRadius: "10px",
        padding: "0px 7px 0px 7px",
        backgroundColor: "#f0f8ec",
      },
    },
  };

  function PropertyItem(props) {
    return (
      !switchMobile ? 
      <Grid2
        onClick={() => {
        setSelectedProperty(props);
        setEditModalOpen(true);}}
        container
        spacing={0}
        mt={0}
        sx={{
          width: "100%",
          marginLeft: "0px",
          marginBottom: "0px",
          "&:hover": {
            backgroundColor: "#fafafa",
            cursor: "pointer"
          },
        }}
      >
        <Grid2
          xs={3}
          sx={{position: "relative", display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px", background: `linear-gradient(270deg, rgba(255,255,255,0) 98%, ${props.tenant === null ? 'rgba(230,230,230,1)' : 'rgba(125,203,114,1)'} 98%)`}}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#1976d2", fontWeight: "600", padding: "10px 0px 10px 20px" }}
          >
            {props.name}
          </Typography>
        </Grid2>
        <Grid2 xs={3} sx={{display: "flex", flexDirection: "row", alignItems: "center",paddingLeft: "4px"}}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 10px" }}
          >
            {props.address}
          </Typography>
        </Grid2>
        <Grid2 xs={2} sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingLeft: "4px"}}>
          <Typography
            variant="caption"
            sx={
              props.tenant === null
                ? styles.statusPill["unoccupied"]
                : styles.statusPill["rented"]
            }
          >
            {props.tenant === null ? "Unoccupied" : "Rented"}
          </Typography>
        </Grid2>
        <Grid2 xs={3} sx={{display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", overflow: "auto", padding: "10px 0px 10px 10px" }}
          >
            {props.tenant ? props.tenant : "--"}
          </Typography>
        </Grid2>
        <Grid2 xs={1} sx={{paddingLeft: "4px"}}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 10px" }}
          >
            {props.price + (props.currency === 2 ? " LEI" : " EUR")}
          </Typography>
        </Grid2>
      </Grid2>
    :
    <Paper onClick={() => {
      setSelectedProperty(props);
      setEditModalOpen(true);}} elevation={1} sx={{overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", padding: "0 7px 7px 7px", width: "55vw", [theme.breakpoints.down('sm')]: {width: "95vw"}, maxHeight: "45vh", backgroundColor: `${props.tenant === null ? "#fafafa" : "#f0f8ec"}`, border: `1px solid ${props.tenant === null ? "#7d7d7d" : "#14ad00"}`, borderRadius: "10px", "&.MuiPaper-root": {marginLeft: "0px", marginBottom: "15px"}, "&:hover": {cursor: "pointer"}}}>
      <Grid2
        container
        spacing={0}
        mt={0}
        sx={{width: "100%"}}
      >
        <Grid2 xs={6}>
          <Typography
            variant="caption"
            sx={{textAlign: "center", color: `${props.tenant === null ? "#7d7d7d" : "#14ad00"}`, fontWeight: "600"}}
          >
            {props.name}
          </Typography>
        </Grid2>
        <Grid2 xs={6}>
          <Typography
            variant="caption"
            sx={{color: `${props.tenant === null ? "#7d7d7d" : "#14ad00"}`, fontWeight: "500"}}
          >
            {props.tenant === null ? "Unoccupied" : "Rented"}
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2
        container
        spacing={0}
        mt={0}
      >
        <Grid2 xs={2} sx={{maxWidth: "75px"}}>
          <Typography
              variant="caption"
              sx={{color: "#7d7d7d"}}
          >
            Address:&nbsp;
          </Typography>
        </Grid2>
        <Grid2 xs={10}>
          <Typography
            variant="caption"
            sx={{color: "#02143d", fontWeight: "500"}}
          >
            {props.address}
          </Typography>
        </Grid2>
        <Grid2 xs={2} sx={{maxWidth: "75px"}}>
          <Typography
              variant="caption"
              sx={{color: "#7d7d7d"}}
          >
            Tenant:&nbsp;
          </Typography>
        </Grid2>
        <Grid2 xs={10}>
          <Typography
            variant="caption"
            sx={{ color: "#02143d", fontWeight: "500"}}
          >
            {props.tenant ? props.tenant : "--"}
          </Typography>
        </Grid2>
        <Grid2 xs={2} sx={{maxWidth: "75px"}}>
          <Typography
              variant="caption"
              sx={{color: "#7d7d7d"}}
          >
            Rent:&nbsp;
          </Typography>
        </Grid2>
        <Grid2 xs={10} sx={{maxWidth: "75px"}}>
          <Typography
            variant="caption"
            sx={{ color: "#02143d", fontWeight: "500"}}
          >
            {props.price + (props.currency === 2 ? " LEI" : " EUR")}
          </Typography>
        </Grid2>
      </Grid2>
      <HomeRoundedIcon sx={{position: 'absolute', top: "0", right: "0", height: "150%", width: "150px", color: "#000", opacity: "0.08"}} />
    </Paper>    
    );
  }

  return data.map((item) => (
    <PropertyItem
      key={item.id}
      id={item.id}
      name={item.name}
      address={item.address + ", " + item.city}
      price={item.price}
      currency={item.currency}
      tenant={item.tenant_email}
    />
  ));
};

export default memo(PropertiesList);
