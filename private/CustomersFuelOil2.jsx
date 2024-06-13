import React, { useCallback, useEffect, useState } from 'react'
import { axiosInstance } from '../src/api'
import { Table, Button, Input } from "antd";
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
function CustomersFuelOil2() {

const [fueloil2, setFueloil2] = useState([])

const [searchFuelOil2, setSearchFuelOil2] = useState("")

const handleInputSearchFuelOil2 = ({target}) => {
    setSearchFuelOil2(target.value)
}

// get All customers Fuel Oil n2 
useEffect(() => {
    if(!searchFuelOil2) {
        axiosInstance
        .get("/customer/ClientFuelOil2")
        .then(({data}) => {
            console.log(data.data)
            setFueloil2(Array.isArray(data.data) ? data.data : []);
        })
        .catch((err) => {
            console.log(err)
        })
    }
},[searchFuelOil2])

// Delete Customer Fuel Oil n 2 

const deleteCustomerFuelOil2 = useCallback((fuelId) => {
    axiosInstance
    .delete(`/customer/ClientFuelOil2/${fuelId}`)
    .then((data) => {
        console.log(data)
        setFueloil2((prev) => prev.filter((fuel) => fuel._id !== fuelId))
            toast.success("Delete Customer Fuel Oil n 2 Candidature Successfully ") 
    })
    .catch((err) => {
        console.log(err)
        toast.error(" Customer Fuel Oil n 2 is not suppressed");
    })
},[])


// Search Customer Fuel Oil n 2 

useEffect(() => {
    if(searchFuelOil2) {
        axiosInstance
        .get(`/customer/ClientFuelOil2/search?query=` + searchFuelOil2)
        .then(({data}) => {
            console.log(data)
            setFueloil2(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
},[searchFuelOil2])








    const columns = [
        {
            key: "id",
            title: "customer_id",
            dataIndex: "id",
            width: "20%",
        },
        {
            key: " first_name",
            title: "Prenom",
            dataIndex: "first_name",
            width: "20%",
        },
        {
            key: "last_name",
            title: "Nom",
            dataIndex: "last_name"
        },
        {
            key: "email",
            title: "Email",
            dataIndex: "email"
        },
        
        {
            key: "addresseLivraison",
            title: "Adresse de livraison",
            dataIndex: "addresseLivraison",
            children: [
              {
                key: "addresseLivraison.first_name",
                title: "Prenom",
                dataIndex: ["addresseLivraison", "first_name"],
              },
              {
                key: "last_name",
                title: "Nom",
                dataIndex: ["addresseLivraison", "last_name"],
              },
              {
                key: "telephone",
                title: "Télephone",
                dataIndex: ["addresseLivraison", "telephone"],
              },
              {
                key: "adresse",
                title: "Adresse",
                dataIndex:["addresseLivraison", "adresse"],
              },
              {
                key: "ville",
                title: "Ville",
                dataIndex: ["addresseLivraison", "ville"],
              },
              {
                key: "codePostal",
                title: "Code postal",
                dataIndex:["addresseLivraison", "codePostal"],
              },
            ]},
            {
                key: "addresseFacturation",
                title: "Adresse Facturation",
                dataIndex: "addresseFacturation",
                children: [
                    {
                        key: "addresseFacturation.first_name",
                        title: "Prenom",
                        dataIndex: ["addresseFacturation", "first_name"],
                      },
                      {
                        key: "last_name",
                        title: "Nom",
                        dataIndex: ["addresseFacturation", "last_name"],
                      },
                      {
                        key: "telephone",
                        title: "Télephone",
                        dataIndex: ["addresseFacturation", "telephone"],
                      },
                      {
                        key: "adresse",
                        title: "Adresse",
                        dataIndex:["addresseFacturation", "adresse"],
                      },
                      {
                        key: "ville",
                        title: "Ville",
                        dataIndex: ["addresseFacturation", "ville"],
                      },
                      {
                        key: "codePostal",
                        title: "Code postal",
                        dataIndex:["addresseFacturation", "codePostal"],
                      },
                ]
            },
            {
                key: "Action",
                title: "Action",
          
                render: (text, record) => {
                  return (
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => deleteCustomerFuelOil2(record._id)}
                    />
                  );
                },
              },
    ]

  return (
    <div>
          <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          type="text"
          name="text"
           onChange={handleInputSearchFuelOil2}
           value={searchFuelOil2}
        
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
         <Table columns={columns} dataSource={fueloil2} rowKey="key" />
      
    </div>
  )
}

export default CustomersFuelOil2
