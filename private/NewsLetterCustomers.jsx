import React, { useCallback, useEffect, useState } from "react";

import { List } from "antd";
import { axiosInstance } from "../src/api";
import { Typography } from "@mui/material";
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


function NewsLetterCustomers() {
  const [newsLetter, setNewsLetter] = useState([]);

  const [search, setSearch] = useState("")

  const handleInputSearch = ({target}) => {
    setSearch(target.value)
  }

  useEffect(() => {
    if(!search) {
      axiosInstance
        .get("/NewsLetter")
        .then(({ data }) => {
          console.log(data.data);
          if (Array.isArray(data.data)) {
            setNewsLetter(data.data);
          } else {
            console.error("Expected an array but received:", data.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching newsletter data:", err);
        });
    }
  }, [search]);

  // DELETE email NewsLetter

  const deleteNewsLetterCustomer = useCallback((NewsId) => {
    axiosInstance
    .delete(`/NewsLetter/${NewsId}`)
    .then((data) => {
        console.log(data)
        setNewsLetter((prev) => prev.filter((news) => news._id  !== NewsId))
        toast.success(" Delete  Email NewsLetter  Successfully ");
    })
    .catch((err) => {
        console.log(err)
        toast.error("Email NewsLetter  is not suppressed");
    })
  },[])


  // Search email NewsLetter

 useEffect(() => {
  if(search) {
    axiosInstance
    .get(`/NewsLetter/search?query=` + search)
    .then(({data}) => {
      console.log(data)
      setNewsLetter(data)
    })
    .catch((err) => {
      console.log(err)
    })
    
  }
  },[search])


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
        NewsLetter{" "}
      </Typography>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
        type="text"
        name="text"
        onChange={handleInputSearch}
        value={search}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <List
        size="small"
        bordered
        dataSource={newsLetter}
        renderItem={(item) => (
          <List.Item   actions={[
            <DeleteOutlined
              key="delete"
              style={{ color: "red" }}
              onClick={() => deleteNewsLetterCustomer(item._id)}
            />
          ]} >
          
            {" "}
          <span  style={{ fontWeight: "bold" }} >  Email   </span> :  <span style={{ fontWeight: "bold", color: "gray" }}> {item.email}</span>{" "}
          </List.Item>
        )}
      />
    </div>
  );
}

export default NewsLetterCustomers;
