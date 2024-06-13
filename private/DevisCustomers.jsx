import React, { useCallback, useEffect, useState } from "react";
import { Card, Button } from "antd";
import { axiosInstance } from "../src/api";
import { Typography, Grid, Box } from "@mui/material";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.black,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function DevisCustomers() {
  const [devisCustomers, setDevisCustomers] = useState([]);

  const [searchDevis, setSearchDevis] = useState("")

  const handleSearchInput  = ({target}) => {
    setSearchDevis(target.value)
  }

  // GET all Devis
  useEffect(() => {
    if(!searchDevis) {
        axiosInstance
          .get("/devis")
          .then(({ data }) => {
            console.log(data.data);
            setDevisCustomers(Array.isArray(data.data) ? data.data : []);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [searchDevis]);

  // delete devis customer
  const deleteDevisCustomer = useCallback(( devisId) => {
    axiosInstance
    .delete(`/devis/${devisId}`)
    .then(({data}) => {
        console.log(data)
        setDevisCustomers((prev) => prev.filter((devis) => devis._id !== devisId))
        toast.success("Delete Devis Successfully ")
    })
    .catch((err) => {
        console.log(err)
        toast.error(" Devis is not suppressed");
    })
  },[])

  // Search Devis Customer 

  useEffect(() => {
    if(searchDevis) {
        axiosInstance
        .get(`/devis/search?query=` + searchDevis)
        .then(({data}) => {
            console.log(data)
            setDevisCustomers(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
  },[searchDevis])

  return (
    <div>
       <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          paddingY: 5,
          color:"#659a9a"
        }}
      >
        {" "}
       Devis Client {" "}
      </Typography>
         <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
        type="text"
        name="text"
        onChange={handleSearchInput}
        value={searchDevis}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    <Grid container spacing={2}>
      {devisCustomers.map((devis) => (
        <Grid item xs={12} sm={6} key={devis._id}>
          <Card
            style={{ width: "100%" }}
            extra={
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: "red" }} />}
                onClick={() => deleteDevisCustomer(devis._id)}
              />
            }
          >
            <Box sx={{ '& > *': { marginBottom: 2 } }}>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Type Devis   </span> :{" "}
              <span style={{ fontWeight: "bold", color: "gray" }}>
                {devis.TypeDevis}
              </span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Civilité </span> :{" "}
              <span style={{ fontWeight: "bold", color: "gray" }}>
                {devis.civilité}
              </span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Nom </span> :{" "}
              <span style={{ fontWeight: "bold", color: "gray" }}>
                {devis.nom}
              </span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Prenom </span> :{" "}
              <span style={{ fontWeight: "bold", color: "gray" }}>
                {devis.prenom}
              </span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Société </span> :{" "}
              <span style={{ fontWeight: "bold", color: "gray" }}>
                {devis.Société}
              </span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}> Téléphone </span> :{" "}
              <span style={{ fontWeight: "bold", color: "gray" }}>
                {devis.telephone}
              </span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Volume</span> :{" "}
              <span style={{ fontWeight: "bold", color: "gray" }}>
                {devis.Volume}
              </span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>
                Informations Complémentaires
              </span>
              :{" "}
              <span style={{ fontWeight: "bold", color: "gray" }}>
                {devis.informations_Complémentaires}
              </span>
            </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
}

export default DevisCustomers;
