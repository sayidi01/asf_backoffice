import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Input } from "antd";
import { axiosInstance } from "../src/api";
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

function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");

  const handleSearch = ({ target }) => {
    setSearchOrder(target.value);
  };

  // get all orders
  useEffect(() => {
    if(!searchOrder) {
      axiosInstance
        .get("/orders")
        .then(({ data }) => {
          const mappedData = data.data.map((order) => ({
            ...order,
            key: order._id,
          }));
          setOrders(mappedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchOrder]);

  // delete Order
  const DeleteOrder = useCallback((orderId) => {
    axiosInstance
      .delete(`/orders/${orderId}`)
      .then(({ data }) => {
        console.log(data.data);
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        toast.success("Delete Order Successfully ");
      })
      .catch((err) => {
        console.log(err);
        toast.error("order is not suppressed");
      });
  }, []);

  // Search Order data

  useEffect(() => {
    if(searchOrder) {
      axiosInstance
        .get(`/orders/search?query=` + searchOrder)
        .then(({ data }) => {
          console.log(data.data);
          setOrders(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchOrder]);


  const columns = [
    {
      key: "customer_id",
      title: "customer_id",
      dataIndex: "customer_id",
      width: 150,
    },
    {
      key: "Products",
      title: "Products",
      dataIndex: "Products",
      width: 150,
    },
    {
      key: "Quantity",
      title: "Quantity",
      dataIndex: "Quantity",
      width: 150,
    },
    {
      key: "order_date",
      title: "order_date",
      dataIndex: "order_date",
      width: 150,
    },
    {
      key: " Total Price",
      title: " Total Price",
      dataIndex: "TotalPrice",
      width: 150,
    },
    {
      key: "Ville",
      title: "Ville",
      dataIndex: "ville",
      width: 150,
    },
    {
      key: "delivery Type",
      title: "delivery Type",
      dataIndex: "deliveryType",
      width: 150,
    },
    {
      key: "Prenom",
      title: "Prenom",
      dataIndex: "prenom",
      width: 150,
    },
    {
      key: "Nom",
      title: "Nom",
      dataIndex: "nom",
      width: 150,
    },
    {
      key: "Code Postal",
      title: "Code Postal",
      dataIndex: "codePostal",
      width: 150,
    },
    {
      key: "Tèlèphone",
      title: "Tèlèphone",
      dataIndex: "telephone",
      width: 150,
    },
    {
      key: "Adresse",
      title: "Adresse",
      dataIndex: "adresse",
      width: 150,
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
            onClick={() => DeleteOrder(record._id)}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
        type="text"
        name="text"
          onChange={handleSearch}
          value={searchOrder}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Table columns={columns} dataSource={orders} rowKey="key" />
    </div>
  );
}

export default Orders;
