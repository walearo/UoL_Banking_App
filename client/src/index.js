import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter as Router, RouterProvider } from "react-router-dom";
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./components/pages/HomePage/HomePage";
import Customers from "./components/pages/Customer/Customers";
import Transfer from "./components/pages/Transfer/Transfer";
import Deposit from "./components/pages/Deposit/Deposit";
import Withdraw from "./components/pages/Withdraw/Withdraw";
import Transaction from "./components/pages/Transaction/Transaction";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import UserLogin from "./components/pages/Login/UserLogin";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import VerifyEmailOtp from "./components/pages/Otp/VerifyEmailOtp";
import BankUser from "./components/pages/Register/Bankuser";

const router = Router(
  [
  {
    path: "/",
    element: <HomePage />,
    errorElement:<PageNotFound />
  },
  {
    path: "/customers",
    element: <Customers />,
    errorElement:<PageNotFound />
  },
  {
    path: "/transfer",
    element: <Transfer />,
    errorElement:<PageNotFound />
  },
  {
    path: "/deposit",
    element: <Deposit />,
    errorElement:<PageNotFound />
  },
  {
    path: "/withdraw",
    element: <Withdraw />,
    errorElement:<PageNotFound />
  },
  {
    path: "/transactions",
    element: <Transaction />,
    errorElement:<PageNotFound />
  },
  {
    path: "/register",
    element: <Register />,
    errorElement:<PageNotFound />
  },
  {
    path: "/createuser",
    element: <BankUser />,
    errorElement:<PageNotFound />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement:<PageNotFound />
  },
  {
    path: "/userlogin",
    element: <UserLogin />,
    errorElement:<PageNotFound />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement:<PageNotFound />
  },
  {
    path: "/register/verify-otp",
    element: <VerifyEmailOtp />,
    errorElement:<PageNotFound />
  }
  ]
);

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ToastContainer />
      <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals