import React, { useEffect, useContext } from "react";
import UserContext from "../context/userContext";
import { axiosInstance } from "../src/api";
import { CircularProgress } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const { setData, setisConnected, isConnected } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!isConnected) {
      axiosInstance
        .post("/users/login/token")
        .then(({ data }) => {
          console.log(data);
          setisConnected(true);
          setData(data.data);
        })
        .catch((error) => {
          console.error("Customer not connected", error);
          navigate("/Signin")
        });
    }
  }, []);

  if (!isConnected) return <CircularProgress />;
  return <Outlet />;
}
