//eslint-disable-next-line
import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CustomerDashboard } from "./Components/CustomerDashboard";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { AccountDashboard } from "./Components/AccountDashboard";
import { TransactionDashboard } from "./Components/TransactionDashboard";
import { LoanDashboard } from "./Components/LoanDashboard";
import AddBeneficiary from "./Components/AddBeneficiary";
import BankNameInput from "./Components/Bankname";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import EmployeeLoan from "./Components/EmployeeLoan";
import EmpAccountDash from "./Components/EmpAccountDash";
import photo from "./images/photo.avif";
import AdminDashboard from "./Components/AdminDashboard";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${photo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homepage" element={<SignUp />} />
            <Route path="/dashboard/:id" element={<CustomerDashboard />} />
            <Route
              path="/dashboard/:id/account/:id"
              element={<AccountDashboard />}
            />
            <Route
              path="/dashboard/:id/account/:id/transaction/:id"
              element={<TransactionDashboard />}
            />
            <Route
              path="/dashboard/:id/account/:id/loan/:id"
              element={<LoanDashboard />}
            />
            <Route
              path="/dashboard/:id/account/:id/beneficiary/:id/"
              element={<AddBeneficiary />}
            />
            <Route
              path="/employeedashboard/:id"
              element={<EmployeeDashboard />}
            />
            <Route
              path="/employeeaccountdashboard/:id"
              element={<EmpAccountDash />}
            />
            <Route
              path="/employeeloandashboard/:id"
              element={<EmployeeLoan />}
            />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/adminloandashboard" element={<EmployeeLoan />} />
          </Routes>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
{
  /* <AddCustomer/>
      <AddBankEmployee/>
      <AllTransaction/>
      <AllAccount/> */
}
