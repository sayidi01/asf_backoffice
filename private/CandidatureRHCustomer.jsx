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

function CandidatureRHCustomer() {
  const [candidatureRh, setCandidatureRh] = useState([]);
  const [searchCandidature, setSearchCandidature] = useState("");

  const handleSearchCandiature = ({ target }) => {
    setSearchCandidature(target.value);
  };

  // GET all Candidature Rh(cv)

  useEffect(() => {
    if (!searchCandidature) {
      axiosInstance
        .get("/candidatureRH")
        .then(({ data }) => {
          console.log(data.data);
          setCandidatureRh(Array.isArray(data.data) ? data.data : []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchCandidature]);

  // Saerch Candidature Customer (cv)

  useEffect(() => {
    if (searchCandidature) {
      axiosInstance
        .get(`/candidatureRH/search?query=` + searchCandidature)
        .then(({data}) => {
          console.log(data);
          setCandidatureRh(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchCandidature]);

  // Delete Candidature Customer (cv)

  const deleteCandidatureRH = useCallback(( candidatureId) => {
    axiosInstance
    .delete(`/candidatureRH/${candidatureId}`)
    .then((data) => {
        console.log(data)
        setCandidatureRh((prev) => prev.filter((Rh) => Rh._id !== candidatureId))
        toast.success("Delete Form Candidature Successfully ")
    })
    .catch((err) => {
        console.log(err)
        toast.error(" Form Candidature is not suppressed");
    })
  },[])

  return (
    <div>
         <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          paddingY: 5,
          color:"#659a9a"
        }}
      >
        {" "}
       Formulaire Candidature {" "}
      </Typography>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          type="text"
          name="text"
          onChange={handleSearchCandiature}
          value={searchCandidature}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Grid container spacing={2}>
        {candidatureRh.map((rh) => (
          <Grid item xs={12} key={rh._id}>
            <Card
              style={{ width: "100%" }}
              extra={
                <Button
                  type="text"
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                  onClick={() => deleteCandidatureRH(rh._id)}
                />
              }
            >
              <Box sx={{ "& > *": { marginBottom: 2 } }}>
                <Typography>
                  <span style={{ fontWeight: "bold" }}> Prenom </span> :{" "}
                  <span style={{ fontWeight: "bold", color: "gray" }}>
                    {" "}
                    {rh.prenom}{" "}
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontWeight: "bold" }}> Nom </span> :{" "}
                  <span style={{ fontWeight: "bold", color: "gray" }}>
                    {" "}
                    {rh.nom}{" "}
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontWeight: "bold" }}> Emai </span>l:{" "}
                  <span style={{ fontWeight: "bold", color: "gray" }}>
                    {" "}
                    {rh.email}{" "}
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    Lettre Motivation{" "}
                  </span>{" "}
                  :
                  <span style={{ fontWeight: "bold", color: "gray" }}>
                    {rh.lettreMotivation}
                  </span>
                </Typography>
                <Typography>
                  <span style={{ fontWeight: "bold" }}> CV </span> :{" "}
                  <a href={rh.cv} target="_blank">
                    {" "}
                    {rh.cv}{" "}
                  </a>
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CandidatureRHCustomer;
