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




function CustomersGasoil() {

    const [gasoil, setGasoil] = useState([])
    const [searchGasoil, setSearchGasoil] = useState("")

    const handleIputGasoil = ({target}) => {
        setSearchGasoil(target.value)
    }

    // Get all customers Gasoil 

    useEffect(() => {
        if(!searchGasoil) {
            axiosInstance
            .get("/customer/ClientGazoil")
            .then(({data}) => {
                console.log(data.data)
                setGasoil(Array.isArray(data.data) ? data.data : []);
            })
            .catch((err) => {
                console.log(err)
            })

        }
    },[searchGasoil])

    // Delete Customer Gasoil

    const DeleteCustomerGasoil = useCallback((gazoilId) => {
        axiosInstance
        .delete(`/customer/ClientGazoil/${gazoilId}`)
        .then((data) => {
            console.log(data)
            setGasoil((prev) => prev.filter((gasoil) => gasoil._id !== gazoilId))
            toast.success("Delete Customer gasoil Candidature Successfully ")
        })
        .catch((err) => {
            console.log(err)
            toast.error(" Customer Gasoil is not suppressed");
        })
    },[])


    // Search Customer Gasoil

    useEffect(() => {
        if(searchGasoil) {
            axiosInstance
            .get(`/customer/ClientGazoil/search?query=` + searchGasoil)
            .then(({data}) => {
                console.log(data.data)
                setGasoil(data)
            })
            .catch((err) => {
                console.log(err)
            })
        }

    },[searchGasoil])

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
                      onClick={() => DeleteCustomerGasoil(record._id)}
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
           onChange={handleIputGasoil}
           value={searchGasoil} 
        
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
         <Table columns={columns} dataSource={gasoil} rowKey="key" />
      
    </div>
  )
}

export default CustomersGasoil
