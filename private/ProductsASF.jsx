import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../src/api";
import { Table, Button, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ModalCreateProduct from "../private/ModalCreateProduct";
import ModalEditProduct from "./ModalEditProduct";

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

function ProductsASF() {
  const [products, setProducts] = useState([]);

  const [searchProduct, setSearchProduct] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState({
    status: false,
    productData: null,
  });

  const handleInputSearchProducts = ({ target }) => {
    setSearchProduct(target.value);
  };

  // Get all Products

  useEffect(() => {
    if (!searchProduct) {
      axiosInstance
        .get("/products")
        .then(({ data }) => {
          console.log(data.data);
          setProducts(Array.isArray(data.data) ? data.data : []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchProduct]);

  // Search Product ASF

  useEffect(() => {
    if (searchProduct) {
      axiosInstance
        .get(`/products/search?query=` + searchProduct)
        .then(({ data }) => {
          console.log(data);
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchProduct]);

  //  Delete Product ASF

  const DeleteProductASF = useCallback((productId) => {
    axiosInstance
      .delete(`/products/${productId}`)
      .then((data) => {
        console.log(data);
        setProducts((prev) => prev.filter((prd) => prd._id !== productId));
        toast.success("Delete Product Successfully ");
      })
      .catch((err) => {
        console.log(err);
        toast.error(" Product is not suppressed");
      });
  }, []);

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    { key: "price", title: "Price", dataIndex: "price" },
    {
      key: "Action",
      title: "Action",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              icon={<EditOutlined />}
              style={{ marginRight: 8 }}
              onClick={() => {
                setIsModalOpenEdit({status: true, productData: record});
              }}
            />
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => DeleteProductASF(record._id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ paddingTop: "2rem" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            type="text"
            name="text"
            onChange={handleInputSearchProducts}
            value={searchProduct}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>
      <div style={{ marginLeft: "15px", paddingTop: "2rem", fontSize: "20px" }}>
        <PlusOutlined
          style={{ color: "#659a9a" }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </div>
      <div style={{ paddingTop: "2rem" }}>
        <Table columns={columns} dataSource={products} rowKey="key" />
      </div>
      {isModalOpen && (
        <ModalCreateProduct
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setProducts={setProducts}
        />
      )}
      {isModalOpenEdit.status && (
        <ModalEditProduct
          isModalOpenEdit={isModalOpenEdit}
          setIsModalOpenEdit={setIsModalOpenEdit}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}

export default ProductsASF;
