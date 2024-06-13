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

function ContactezNousCustomer() {
  const [contactezNous, setContactezNous] = useState([]);

  const [SearchForm, setSearchForm] = useState("")

  const handleInputSearch = ({target}) => {
    setSearchForm(target.value)
  }


  useEffect(() => {
    if(!SearchForm) {
        axiosInstance
          .get("/contactezNous")
          .then(({ data }) => {
            console.log(data.data);
            if (Array.isArray(data.data)) {
              setContactezNous(data.data);
            } else {
              console.error("Le résultat de la requête n'est pas un tableau.");
            }
          })
          .catch((err) => {
            console.log(err);
          });

    }
  }, [SearchForm]);

  // Delete Form Contactez-Nous

  const deleteFormContactezNous = useCallback((contactId) => {
    axiosInstance
    .delete(`/contactezNous/${contactId}`)
    .then((data) => {
        console.log(data)
        setContactezNous((prev) => prev.filter((contact) => contact._id !== contactId))
        toast.success("Delete Form Successfully");
    })
    .catch((err) => {
        console.log(err)
        toast.error(" Form is not suppressed");
    })
  },[])


  // Search Form Contactez-Nous

  useEffect(() => {
    if(SearchForm) {
        axiosInstance
        .get(`/contactezNous/search?query=` + SearchForm)
        .then(({data}) => {
            console.log(data)
            setContactezNous(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
  },[SearchForm])

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
        Formulaire de Contact Support{" "}
      </Typography>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          type="text"
          name="text"
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleInputSearch}
          value={SearchForm}
        />
      </Search>
      <Grid container spacing={3}>
        {contactezNous.map((contactez) => (
          <Grid item xs={12} sm={6} key={contactez._id}>
            <Card
              style={{ width: "100%" }}
              extra={
                <Button
                  type="text"
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                  onClick={() => deleteFormContactezNous(contactez._id)}
                />
              }
            >
                <Box sx={{ '& > *': { marginBottom: 2 } }}>
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  Type Contact{" "}
                </span> :{" "}
                <span style={{ fontWeight: "bold", color: "gray" }}>
                  {" "}
                  {contactez.contactType}{" "}
                </span>{" "}
              </Typography>
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}> Prenom </span> :{" "}
                <span style={{ fontWeight: "bold", color: "gray" }}>
                  {" "}
                  {contactez.firstName}{" "}
                </span>{" "}
              </Typography>
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}> Nom </span> :{" "}
                <span style={{ fontWeight: "bold", color: "gray" }}>
                  {" "}
                  {contactez.lastName}{" "}
                </span>{" "}
              </Typography>
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}> Téléphone </span> :{" "}
                <span style={{ fontWeight: "bold", color: "gray" }}>
                  {" "}
                  {contactez.phone}{" "}
                </span>{" "}
              </Typography>
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}> Email </span> :{" "}
                <span style={{ fontWeight: "bold", color: "gray" }}>
                  {" "}
                  {contactez.email}{" "}
                </span>{" "}
              </Typography>
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}> Departement </span> :{" "}
                <span style={{ fontWeight: "bold", color: "gray" }}>
                  {" "}
                  {contactez.department}{" "}
                </span>{" "}
              </Typography>
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}> Sujet </span> :{" "}
                <span style={{ fontWeight: "bold", color: "gray" }}>
                  {" "}
                  {contactez.subject}{" "}
                </span>{" "}
              </Typography>
              <Typography>
                {" "}
                <span style={{ fontWeight: "bold" }}> Message </span> :{" "}
                <span style={{ fontWeight: "bold", color: "gray" }}>
                  {" "}
                  {contactez.message}{" "}
                </span>{" "}
              </Typography>
                </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ContactezNousCustomer;
