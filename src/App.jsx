import React, { useState } from "react";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { router } from "../components/Routes.jsx";
import UserContext from "../context/userContext.js";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "react-hot-toast";
console.log(import.meta.env)

function App() {
  const [data, setData] = useState({});
  const [isConnected, setisConnected] = useState(false);

  return (
    <PrimeReactProvider>
      <UserContext.Provider
        value={{ setData, setisConnected, isConnected, data }}
      >
        <RouterProvider router={router} />
        <Toaster />
      </UserContext.Provider>
    </PrimeReactProvider>
  );
}

export default App;
