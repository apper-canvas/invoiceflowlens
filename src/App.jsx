import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import React from "react";
import PromptPassword from "@/components/pages/PromptPassword";
import Callback from "@/components/pages/Callback";
import ErrorPage from "@/components/pages/ErrorPage";
import Dashboard from "@/components/pages/Dashboard";
import Settings from "@/components/pages/Settings";
import Transactions from "@/components/pages/Transactions";
import Invoices from "@/components/pages/Invoices";
import Signup from "@/components/pages/Signup";
import Clients from "@/components/pages/Clients";
import Login from "@/components/pages/Login";
import ResetPassword from "@/components/pages/ResetPassword";


function App() {
  
  
  
return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;