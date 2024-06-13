

import Dashbord from "../private/Dashbord";
import PrivateRoute from "../private/PrivateRoute.jsx";
import { createBrowserRouter } from "react-router-dom";
import Orders from "../private/Orders.jsx";
import DevisCustomers from "../private/DevisCustomers.jsx";
import NewsLetterCustomers from "../private/NewsLetterCustomers.jsx";
import ContactezNousCustomer from "../private/ContactezNousCustomer.jsx";
import CandidatureRHCustomer from "../private/CandidatureRHCustomer";
import CustomersGasoil from "../private/CustomersGasoil";
import CustomersFuelOil2 from "../private/CustomersFuelOil2";
import CustomersBoisChauffage from "../private/CustomersBoisChauffage.jsx"
import ProductsASF from "../private/ProductsASF";
import Users from "../private/Users";
import Signin from "../private/Signin";
import Home from "../private/Home";




export const router = createBrowserRouter([
  {
    id: 1,
    path: "/",
    element: <Signin/>

  },
  {
    id: 2,
    path: "/dashbord",
    element: <PrivateRoute />,
    children: [
      {
        id: 1,
        path: "",
        element: <Dashbord />,
        children: [
          {
            id: 2,
            path: "orders",
            element: <Orders />,
          },
          {
            id: 3,
            path: "devisCustomers",
            element: <DevisCustomers/>,

          },
          {
            id: 4,
            path: "NewsLetter",
            element: <NewsLetterCustomers/>,
          },
          {
            id: 5,
            path: "ContactezNous",
            element: <ContactezNousCustomer/>
          },
          {
            id: 6,
            path: "CandidatureRH",
            element: <CandidatureRHCustomer/>
          },
          {
            id: 7,
            path: "CustomersGasoil",
            element: <CustomersGasoil/>
          },
          {
            id: 8,
            path: "CustomersFuelOil2",
            element: <CustomersFuelOil2/>
          },
          {
            id: 9,
            path: "CustomersBoisChauffage",
            element: <CustomersBoisChauffage/>
          },
          {
            id: 10,
            path: "ProductsASF",
            element: <ProductsASF/>
          },
          {
            id: 11,
            path: "user",
            element: <Users/>
          },
          {
            id: 12,
            path: "",
            element: <Home/>
          }
        ],
      },
    ],
  },
]);
