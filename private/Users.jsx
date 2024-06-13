import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../src/api";
import { Table, Button, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import ModalCreateUser from "./ModalCreateUser";
import ModalEditUser from "./ModalEditUser";

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

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEditUser, setIsModalOpenEditUser] = useState({
    status: false,
    user: null,
  });

  const [usersASF, setUsersASF] = useState([]);

  const [searchUser, setSearchUser] = useState("");

  const handleInputSearchUsers = ({ target }) => {
    setSearchUser(target.value);
  };

  // Get ALL Users ASF

  useEffect(() => {
    if (!searchUser) {
      axiosInstance
        .get("/users")
        .then(({ data }) => {
          console.log(data.data);
          setUsersASF(Array.isArray(data.data) ? data.data : []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchUser]);

  // Search User ASF

  useEffect(() => {
    if (searchUser) {
      axiosInstance
        .get("/users/search?query=" + searchUser)
        .then(({ data }) => {
          console.log(data);
          setUsersASF(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchUser]);

  // Delete  User ASF

  const DelteUserASF = useCallback((UserId) => {
    axiosInstance
      .delete(`/users/${UserId}`)
      .then((data) => {
        console.log(data);
        setUsersASF((prev) => prev.filter((prd) => prd._id !== UserId));
        toast.success("Delete User Successfully ");
      })
      .catch((err) => {
        console.log(err);
        toast.error(" User is not suppressed");
      });
  }, []);

  const columns = [
    { key: "id", title: "ID USER", dataIndex: "id" },
    {
      key: "first_name",
      title: "Prenom",
      dataIndex: "first_name",
    },
    { key: "last_name", title: "Nom", dataIndex: "last_name" },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "password", title: "Mot de passe ", dataIndex: "password" },
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
                setIsModalOpenEditUser({ status: true, user: record });
              }}
            />
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => DelteUserASF(record._id)}
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
            onChange={handleInputSearchUsers}
            value={searchUser}
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
        <Table columns={columns} dataSource={usersASF} rowKey="key" />
      </div>
      {isModalOpen && (
        <ModalCreateUser
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isModalOpenEditUser.status && (
        <ModalEditUser
          isModalOpenEditUser={isModalOpenEditUser}
          setIsModalOpenEditUser={setIsModalOpenEditUser}
          setUsersASF={setUsersASF}
        />
      )}
    </div>
  );
}

export default Users;
