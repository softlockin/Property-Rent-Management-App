import React, { memo, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Typography, useTheme } from "@mui/material";

const PropertiesList = ({ data, setEditModalOpen, setSelectedProperty }) => {
  const theme = useTheme()
  const styles = {
    statusPill: {
      unoccupied: {
        color: "#7d7d7d",
        fontWeight: "400",
        border: "1px solid #7d7d7d",
        borderRadius: "10px",
        padding: "2px 7px 2px 7px",
        backgroundColor: "#fafafa",
      },
      rented: {
        color: "#14ad00",
        border: "1px solid #14ad00",
        borderRadius: "10px",
        padding: "2px 7px 2px 7px",
        backgroundColor: "#f0f8ec",
      },
    },
  };

  function PropertyItem(props) {

    return (
      <Grid2
        onClick={() => {
            setSelectedProperty(props);
            setEditModalOpen(true);
        }}
        container
        spacing={1}
        sx={{
          width: "100%",
        //   margin: "10px 10px 10px 10px",
          "&:hover": {
            backgroundColor: "#fafafa",
            cursor: "pointer"
          },
        }}
      >
        <Grid2
          xs={3}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#1976d2", fontWeight: "600", padding: "10px 0px 10px 20px" }}
          >
            {props.name}
          </Typography>
        </Grid2>
        <Grid2 xs={3}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 10px" }}
          >
            {props.address}
          </Typography>
        </Grid2>
        <Grid2 xs={2} sx={{padding: "10px 0px 10px 10px"}}>
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
        <Grid2 xs={3}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", overflow: "auto", padding: "10px 0px 10px 10px" }}
          >
            {props.tenant ? props.tenant : "--"}
          </Typography>
        </Grid2>
        <Grid2 xs={1}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#7d7d7d", fontWeight: "400", padding: "10px 0px 10px 10px" }}
          >
            {props.price + (props.currency === 2 ? " LEI" : " EUR")}
          </Typography>
        </Grid2>
      </Grid2>
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
