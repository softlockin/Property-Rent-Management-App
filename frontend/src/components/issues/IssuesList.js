import React, { memo, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Paper, Typography, useTheme } from "@mui/material";

const IssuesList = ({ data, setEditModalOpen, setSelectedIssue }) => {
  const theme = useTheme()
  const switchMobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles = {
    statusPill: {
      open: {
        color: "#d64400",
        fontWeight: "400",
        marginLeft: "10px",
        border: "1px solid #d64400",
        borderRadius: "10px",
        padding: "0px 7px 0px 7px",
        backgroundColor: "#f8efec",
      },
      closed: {
        color: "#14ad00",
        marginLeft: "10px",
        border: "1px solid #14ad00",
        borderRadius: "10px",
        padding: "0px 7px 0px 7px",
        backgroundColor: "#f0f8ec",
      },
    },
  };

  function IssueItem(props) {

    return (
      !switchMobile ?
      <Grid2
        onClick={() => {
            setSelectedIssue(props);
            setEditModalOpen(true);
        }}
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
          sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px", background: `linear-gradient(270deg, rgba(255,255,255,0) 98%, ${props.closed ? 'rgba(125,203,114,1)' : 'rgba(214,68,0,1)'} 98%)`}}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#1976d2", fontWeight: "600", padding: "10px 0px 10px 20px"}}
          >
            {props.name}
          </Typography>
        </Grid2>
        <Grid2 xs={3} sx={{paddingLeft: "4px"}}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 20px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}
          >
            {props.property}
          </Typography>
        </Grid2>
        <Grid2 xs={3} sx={{paddingLeft: "4px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 10px"}}
          >
            {props.date}
          </Typography>
        </Grid2>
        <Grid2 xs={2} sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingLeft: "4px"}}>
          <Typography
            variant="caption"
            sx={props.closed ? styles.statusPill.closed : styles.statusPill.open}
          >
            {props.closed ? "Closed" : "Open"}
          </Typography>
        </Grid2>
        <Grid2 xs={1} sx={{paddingLeft: "4px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", overflow: "auto", padding: "10px 0px 10px 10px"}}
          >
            {props.closed ? props.cost+" LEI" : "--"}
          </Typography>
        </Grid2>
      </Grid2>

      : 
      
      <Paper onClick={() => {
        setSelectedIssue(props);
        setEditModalOpen(true);}} elevation={1} sx={{backgroundColor: `${props.closed ? "#f0f8ec" : "#f8efec"}`, display: "flex", flexDirection: "column", padding: "0 7px 7px 7px", width: "55vw", [theme.breakpoints.down('sm')]: {width: "95vw"}, maxHeight: "45vh", border: `1px solid ${props.closed ?  "#14ad00" : "#d64400"}`, borderRadius: "10px", "&.MuiPaper-root": {marginLeft: "0px", marginBottom: "15px"}, "&:hover": {cursor: "pointer"}}}>
        <Grid2
          container
          spacing={0}
          mt={0}
          sx={{width: "100%"}}
        >
          <Grid2 xs={6}>
            <Typography
              variant="caption"
              sx={{textAlign: "center", color: `${props.closed ? "#14ad00" : "#d64400"}`, fontWeight: "600"}}
            >
              {props.name}
            </Typography>
          </Grid2>
          <Grid2 xs={6}>
            <Typography
              variant="caption"
              sx={{color: `${props.closed ? "#14ad00" : "#d64400"}`, fontWeight: "500"}}
            >
              {props.closed  ? "Closed" : "Open"}
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
              Property:&nbsp;
            </Typography>
          </Grid2>
          <Grid2 xs={10}>
            <Typography
              variant="caption"
              sx={{color: "#02143d", fontWeight: "500"}}
            >
              {props.property}
            </Typography>
          </Grid2>
          <Grid2 xs={2} sx={{maxWidth: "75px"}}>
            <Typography
                variant="caption"
                sx={{color: "#7d7d7d"}}
            >
              Date:&nbsp;
            </Typography>
          </Grid2>
          <Grid2 xs={10}>
            <Typography
              variant="caption"
              sx={{ color: "#02143d", fontWeight: "500"}}
            >
              {props.date}
            </Typography>
          </Grid2>
          <Grid2 xs={2} sx={{maxWidth: "75px"}}>
            <Typography
                variant="caption"
                sx={{color: "#7d7d7d"}}
            >
              Cost:&nbsp;
            </Typography>
          </Grid2>
          <Grid2 xs={10} sx={{maxWidth: "75px"}}>
            <Typography
              variant="caption"
              sx={{ color: "#02143d", fontWeight: "500"}}
            >
              {props.closed ? props.cost+" LEI" : "--"}
            </Typography>
          </Grid2>
        </Grid2>
        {/* <Grid2
          container
          spacing={0}
          mt={0}
          sx={{
            borderRadius: "10px",
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
            xs={4}
            sx={{display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}
          >
            
          </Grid2>
          <Grid2 xs={5} sx={{display: "flex", flexDirection: "row", alignItems: "center",paddingLeft: "4px"}}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 10px" }}
            >
              {props.address}
            </Typography>
          </Grid2>
          <Grid2 xs={3} sx={{paddingLeft: "4px"}}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 10px" }}
            >
              {props.price + (props.currency === 2 ? " LEI" : " EUR")}
            </Typography>
          </Grid2>
          <Grid2 xs={4} sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingLeft: "4px"}}>
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
          <Grid2 xs={8} sx={{display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px"}}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#7d7d7d", fontWeight: "400", overflow: "auto", padding: "10px 0px 10px 10px" }}
            >
              {props.tenant ? props.tenant : "--"}
            </Typography>
          </Grid2>
        </Grid2> */}
      </Paper>   
    );
  }

  return data?.map((item) => (
    <IssueItem
      key={item.id}
      id={item.id}
      description={item.description}
      name={item.name}
      property={item.property_name}
      date={item.created_at}
      closed={item.closed}
      cost={item.cost}
    />
  ));

};

export default memo(IssuesList);
