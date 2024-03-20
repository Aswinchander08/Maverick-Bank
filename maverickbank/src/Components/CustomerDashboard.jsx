import React, { useEffect, useState } from "react";
import CustomerService from "../service/CustomerService";
import "./CustomerDashboard.css";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const CustomerDashboard = () => {
  const [customer, setCustomer] = useState([]);
  const { id } = useParams(0);
  const [account, setAccount] = useState([]);
  const [accountType, setAccountType] = useState("");
  const { token } = useAuth();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(id, typeof id, accountType, typeof accountType);
    CustomerService.addNewAccount(id, accountType, token).then((response) => {
      console.log("Response received :", response.data);
      toast.success(response.data);
      fetchAllAccounts(id);
    });
  };
  console.log("use params vlue", id);
  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
    console.log(e.target.value);
  };

  // Fetch customer data when the component mounts.
  const fetchAllAccounts = (id) => {
    CustomerService.allAccountsOfCustomer(id, token)
      .then((response) => {
        console.log(token);
        console.log("Response Received from API:- ", response.data);
        setAccount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    CustomerService.getCustomerDetails(id, token).then((response) => {
      setCustomer(response.data);
      console.log("Customer Details :", response.data);

      fetchAllAccounts(id);
    });
  }, []);
  return (
    <div className="full-background">
      <div className="right-aligned"></div>
      <div
        className="card-container"
        style={{ height: "30vh", backgroundColor: "#566822" }}
      >
        <div className="card-content">
          <p>Customer Name : {customer.customerName}</p>
          <p>Customer Id : {customer.customerId}</p>
          <p>Phone Number : {customer.phoneNumber}</p>
          <p>Email : {customer.email}</p>
        </div>
        <div className="button-container">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="uil uil-user-plus"></i>
            Open New Account
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className=" table  table-striped table-hover table-dark">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#566822", color: "white" }}>
                Account Number
              </th>
              <th style={{ backgroundColor: "#566822", color: "white" }}>
                Account Type
              </th>
              <th style={{ backgroundColor: "#566822", color: "white" }}>
                Account Status
              </th>
              <th style={{ backgroundColor: "#566822", color: "white" }}>
                Go To
              </th>
            </tr>
          </thead>
          <tbody>
            {account.map((acc, key) => (
              <tr key={key}>
                <td className="td-content">{acc.accountNumber}</td>
                <td className="td-content">{acc.accountType}</td>
                <td className="td-content">{acc.accountStatus}</td>
                {acc.accountStatus === "ACTIVE" && (
                  <td>
                    {" "}
                    <Link
                      to={`account/${acc.accountNumber}`}
                      className="btn btn-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                      </svg>
                    </Link>
                  </td>
                )}
                {/* <td>{acc.accountBalance}</td>
                <td>{acc.accountStatus}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade "
        id="exampleModal"
        // tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New Account
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                style={{
                  display: "flex",
                  float: "left",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <label>
                  Customer ID:
                  <input
                    style={{ margin: "15px" }}
                    value={customer.customerId}
                    disabled="true"
                    id="input"
                  ></input>
                </label>
                <label>
                  Customer Name:
                  <input
                    style={{ margin: "15px" }}
                    value={customer.customerName}
                    disabled="true"
                    id="input"
                  ></input>
                </label>
                <label>
                  Customer PanCard:
                  <input
                    style={{ margin: "15px" }}
                    value={customer.panNumber}
                    disabled="true"
                    id="input"
                  ></input>
                </label>
                <label>
                  Customer Aadhar Number:
                  <input
                    style={{ margin: "15px" }}
                    value={customer.aadharNumber}
                    disabled="true"
                    id="input"
                  ></input>
                </label>
                <label>
                  Account Type:
                  <select
                    value={accountType}
                    style={{ margin: "15px" }}
                    onChange={handleAccountTypeChange}
                    required
                  >
                    <option value="">Select account type</option>
                    <option value="SAVINGS">Savings</option>
                    <option value="CURRENT">Current</option>
                  </select>
                </label>

                {/* Add more form fields as needed */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFormSubmit}
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
