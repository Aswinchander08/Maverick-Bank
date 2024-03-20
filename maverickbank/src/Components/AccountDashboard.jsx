import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AccountDashboard.css";
import CustomerService from "../service/CustomerService";
import { Calculation } from "./Calculation";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const AccountDashboard = () => {
  const [account, setAccount] = useState([]);
  const [totaltransaction, setTotalTransaction] = useState([]);
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    CustomerService.accountDetails(id, token).then((response) => {
      console.log("Account Details :", response.data);
      setAccount(response.data);
    });
    // CustomerService.getInoutBound(id).then((response) => {
    //   console.log("In Out Bound :", response.data);
    //   setTotalTransaction(response.data);
    // });
  }, []);
  const handleCloseAccount = (e) => {
    e.preventDefault();
    if (window.confirm("Do you really want to CLOSE this Account?")) {
      closeAccount();
    }
  };

  const closeAccount = () => {
    CustomerService.deleteAccountRequest(id, token).then((response) => {
      console.log("Response :", response.data);
      toast.success(response.data);
      navigate(-1);
    });
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="full-background1">
      <div style={{ margin: "15px", float: "right" }}>
        <button className="btn btn-primary" onClick={goBack}>
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-circle"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
              />
            </svg>
          </h3>
        </button>
      </div>
      <div>
        <button
          className="btn btn-primary"
          style={{ margin: "10px", float: "left" }}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fillRule="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>{" "}
          Services
        </button>
      </div>
      <div className="table1">
        <table className=" table  table-dark">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#78941b", color: "white" }}>
                Account Number
              </th>
              <th style={{ backgroundColor: "#78941b", color: "white" }}>
                Available Balance
              </th>
              <th style={{ backgroundColor: "#78941b", color: "white" }}>
                Bank
              </th>
              <th style={{ backgroundColor: "#78941b", color: "white" }}>
                Branch
              </th>
              <th style={{ backgroundColor: "#78941b", color: "white" }}>
                IFSC Code
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td-content">{account.accountNumber}</td>
              <td className="td-content">{account.balance}</td>
              <td className="td-content">{account.bankName}</td>
              <td className="td-content">{account.branchName}</td>
              <td className="td-content">{account.ifscCode} </td>
              {/* <td>{acc.accountBalance}</td>
                <td>{acc.accountStatus}</td> */}
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="offcanvas offcanvas-bottom offcanvas-md"
        // tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Actions
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div></div>
          <div
            className="btn-group-vertical"
            role="group"
            aria-label="Vertical button group"
          >
            <Link to={`transaction/${id}`} style={{ margin: "10px" }}>
              <button
                className="btn btn-primary"
                data-bs-dismiss="offcanvas"
                style={{ width: "200px" }}
              >
                <i className="uil uil-transaction"></i>
                Transaction
              </button>
            </Link>
            <Link to={`loan/${id}`} style={{ margin: "10px" }}>
              <button
                className="btn btn-primary"
                data-bs-dismiss="offcanvas"
                style={{ width: "200px" }}
              >
                <i className="uil uil-bill"></i>
                Loan
              </button>
            </Link>
            <Link to={`beneficiary/${id}`} style={{ margin: "10px" }}>
              <button
                className="btn btn-primary"
                data-bs-dismiss="offcanvas"
                style={{ width: "200px" }}
              >
                <i className="uil uil-user-plus"></i>
                Add Beneficiary
              </button>
            </Link>
            <button
              className="btn btn-danger"
              data-bs-dismiss="offcanvas"
              style={{ margin: "10px", width: "200px" }}
              onClick={(e) => {
                handleCloseAccount(e);
              }}
            >
              <i className="uil uil-user-times"></i>
              Close Account
            </button>
          </div>
        </div>
      </div>
      {/* <div
        className="card  text-bg-warning "
        style={{ width: "35rem", marginLeft: "35%", marginTop: "10%" }}
      >
         <div className="card-Header">
          Transaction
          <div className="card-body">
            <p>Total Inbound : {totaltransaction.totalInBound}</p>
            <p>Total Outbound : {totaltransaction.totalOutBound}</p>
            <p>Total Loan Availed : {totaltransaction.loan}</p>
          </div>
        </div> 
        
      </div> */}
      <Calculation />
    </div>
  );
};
