import React, { memo, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Paper, Typography, useTheme, Button } from "@mui/material";
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

const InvoicesList = ({ data, authTokens, setInvoices }) => {
  const theme = useTheme()
  const switchMobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles = {
    statusPill: {
      due: {
        color: theme.palette.primary.main,
        fontWeight: "400",
        marginLeft: "10px",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "10px",
        padding: "0px 7px 0px 7px",
        backgroundColor: theme.palette.primary.light,
      },
      paid: {
        color: "#14ad00",
        marginLeft: "10px",
        border: "1px solid #14ad00",
        borderRadius: "10px",
        padding: "0px 7px 0px 7px",
        backgroundColor: "#f0f8ec",
      },
      overdue: {
        color: "#d64400",
        marginLeft: "10px",
        border: "1px solid #d64400",
        borderRadius: "10px",
        padding: "0px 7px 0px 7px",
        backgroundColor: "#f8efec",
      },
    },
  };

  const markAsPaid = async (p) => {
    let response = await fetch(`http://127.0.0.1:8000/api/invoices/`, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access),
        },
        body:JSON.stringify({
            'id': p.id,
            'paid': true
        }),
        })
        if(response.status === 200){
            setInvoices((prev)=>prev.map(
              el => el.id === p.id ? { ...el, paid: true } : el
            ))
        }
  }

  function InvoiceItem(props) {
    let today = new Date()
    let due_date = new Date(props.due)
    let difference = due_date.valueOf() - today.valueOf()
    let overdue = false
    difference < 0 ? due_date.toISOString().split("T")[0] === today.toISOString().split("T")[0] ? overdue = false : overdue = true : overdue = false


    return (
      !switchMobile ?
      <Grid2
        container
        spacing={0}
        mt={0}
        sx={{
          width: "100%",
          marginLeft: "0px",
          marginBottom: "0px",
          "&:hover": {
            backgroundColor: "#fafafa",
          },
        }}
      >
        <Grid2
          xs={3}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "4px", background: `linear-gradient(270deg, rgba(255,255,255,0) 98%, ${props.paid ? 'rgba(125,203,114,1)' : overdue ? 'rgba(214,68,0,1)' : 'rgba(25, 118, 210, 1)'} 98%)`}}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#1976d2", fontWeight: "600", padding: "10px 0px 10px 20px"}}
          >
            {props.property}
          </Typography>
        </Grid2>
        <Grid2 xs={3} sx={{paddingLeft: "4px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 20px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}
          >
            {props.tenant}
          </Typography>
        </Grid2>
        <Grid2 xs={2} sx={{paddingLeft: "4px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 10px"}}
          >
            {props.due}
          </Typography>
        </Grid2>
        <Grid2 xs={1.5} sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingLeft: "4px"}}>
          <Typography
            variant="caption"
            sx={props.paid ? styles.statusPill.paid : overdue ? styles.statusPill.overdue : styles.statusPill.due}
          >
            {props.paid ? "Paid" : overdue ? "Overdue" : "Due"}
          </Typography>
        </Grid2>
        <Grid2 xs={1.5} sx={{paddingLeft: "4px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", overflow: "auto", padding: "10px 0px 10px 10px"}}
          >
            {props.cost}
          </Typography>
        </Grid2>
        <Grid2 xs={1} sx={{paddingLeft: "0px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column"}}>
          <Button
            onClick={()=>markAsPaid(props)}
            variant="outlined"
            size="small"
            disabled={props.paid}
            sx={{padding: "1px", fontSize: "12px", fontWeight: "400"}}
          >
            Paid
          </Button>
        </Grid2>
      </Grid2>

      : 
      
      <Paper elevation={1} sx={{position: "relative", overflow: "hidden", backgroundColor: `${props.paid ? "#f0f8ec" : overdue ? "#f8efec" : theme.palette.primary.light}`, display: "flex", flexDirection: "column", padding: "0 7px 7px 7px", width: "55vw", [theme.breakpoints.down('sm')]: {width: "95vw"}, maxHeight: "45vh", border: `1px solid ${props.paid ? "#14ad00" : overdue ? "#d64400" : theme.palette.primary.main}`, borderRadius: "10px", "&.MuiPaper-root": {marginLeft: "0px", marginBottom: "15px"}}}>
        <Grid2
          container
          spacing={0}
          mt={0}
          sx={{width: "100%"}}
        >
          <Grid2 xs={6}>
            <Typography
              variant="caption"
              sx={{textAlign: "center", color: `${props.paid ? "#14ad00" : overdue ? "#d64400" : theme.palette.primary.main}`, fontWeight: "600"}}
            >
              {"IN: "+props.property}
            </Typography>
          </Grid2>
          <Grid2 xs={6}>
            <Typography
              variant="caption"
              sx={{color: `${props.paid ? "#14ad00" : overdue ? "#d64400" : theme.palette.primary.main}`, fontWeight: "500"}}
            >
              {props.paid  ? "Paid" : overdue ? "Overdue" : "Due"}
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
              Tenant:&nbsp;
            </Typography>
          </Grid2>
          <Grid2 xs={10}>
            <Typography
              variant="caption"
              sx={{color: "#02143d", fontWeight: "500"}}
            >
              {props.tenant}
            </Typography>
          </Grid2>
          <Grid2 xs={2} sx={{maxWidth: "75px"}}>
            <Typography
                variant="caption"
                sx={{color: "#7d7d7d"}}
            >
              Due:&nbsp;
            </Typography>
          </Grid2>
          <Grid2 xs={10}>
            <Typography
              variant="caption"
              sx={{ color: "#02143d", fontWeight: "500"}}
            >
              {props.due}
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
              {props.cost}
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2
          container
          spacing={0}
          mt={0}
        >
          <Grid2 xs={10} sx={{maxWidth: "75px"}}>
            <Button
              onClick={()=>markAsPaid(props)}
              variant="contained"
              size="small"
              disabled={props.paid}
              sx={{marginTop: "5px", padding: "1px", fontSize: "12px", fontWeight: "400"}}
            >
              Paid
            </Button>
          </Grid2>
        </Grid2>
        <ArticleRoundedIcon sx={{position: 'absolute', top: "0", right: "0", height: "150%", width: "150px", color: "#000", opacity: "0.08"}} />
      </Paper>   
    );
  }

  return data?.map((item) => (
    <InvoiceItem
      key={item.id}
      id={item.id}
      tenant={item.tenant_email}
      property={item.property_name}
      date={item.created_at}
      due={item.due_day}
      paid={item.paid}
      cost={item.price+" "+item.currency}
    />
  ));

};

export default memo(InvoicesList);
