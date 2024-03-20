import React, { useEffect, useState } from "react";
import "./EmployeeDashboard.css";
import AdminService from "../service/AdminService";
import EmployeeService from "../service/EmployeeService";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerService from "../service/CustomerService";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const EmployeeDashboard = () => {
  const [customerArray, setCustomerArray] = useState([]);
  const { id } = useParams();
  const Navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [customer, setCustomer] = useState({});
  const { token } = useAuth();

  const fetchAllAccounts = () => {
    AdminService.displayAllAccounts(token)
      .then((response) => {
        console.log("Response Received from API:- ", response.data);
        setCustomerArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("Application Rendered");

  const handleActivate = (e, number) => {
    e.preventDefault();
    console.log("Id is:- ", number);
    EmployeeService.activateAccount(number, token)
      .then((response) => {
        console.log("response from api:- ", response.data);
        toast.success(response.data);
        fetchAllAccounts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllTransactions = () => {
    EmployeeService.allTransactions(token).then((response) => {
      setTransactions(response.data);
      console.log("All Transactions are:- ", response.data);
    });
  };

  const handleClose = (e, number) => {
    e.preventDefault();
    console.log("Id is:- ", number);
    EmployeeService.closeAccount(number, token)
      .then((response) => {
        console.log("response from api:- ", response.data);
        toast.success(response.data);
        fetchAllAccounts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCustomer = (customer_id) => {
    CustomerService.getCustomerDetails(customer_id, token).then((response) => {
      console.log("Customer Data", response.data);
      setCustomer(response.data);
    });
  };

  const handleCustomerCheck = (e, customer_id) => {
    e.preventDefault();
    console.log("Customer Id", customer_id);
    getCustomer(customer_id);
  };

  useEffect(() => {
    console.log("use effect entered");
    fetchAllAccounts();
    getAllTransactions();
  }, []);

  return (
    <div className="full-background1">
      <div className="employee-dash">
        <div>
          <Link to={`/employeeloandashboard/${id}`}>
            <button
              className="btn btn-primary float-lg-start"
              style={{ marginTop: "20px" }}
            >
              <i className="uil uil-coins"></i>
              Loans
            </button>
          </Link>
        </div>
        <br />

        <h2>Employee Dashboard</h2>
        {/*Account Details */}
        <div className="account-details">
          <h5>Account Details</h5>
          <br />
          <div className=" table table-dark  table-striped table-hover ">
            <table style={{ padding: "10px" }}>
              <thead>
                <tr>
                  <td>Customer ID</td>
                  <td>Customer Name</td>
                  <td>Account Number</td>
                  <td>Account Type</td>
                  <td>Account Balance</td>
                  <td>Account Status</td>
                  <td>Activate</td>
                  <td>Close</td>
                  <td>Check Account</td>
                  <td>Check Customer</td>
                </tr>
              </thead>
              <tbody>
                {customerArray.map((c, k) => (
                  <tr key={k}>
                    <td>{c.customerId}</td>
                    <td>{c.customerName}</td>
                    <td>{c.accountNumber}</td>
                    <td>{c.accountType}</td>
                    <td>{c.accountBalance}</td>
                    <td>{c.accountStatus}</td>
                    <td>
                      <button
                        disabled={
                          c.accountStatus === "CLOSED" ||
                          c.accountStatus === "CLOSE_REQUEST" ||
                          c.accountStatus === "ACTIVE"
                        }
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleActivate(e, c.accountNumber);
                        }}
                      >
                        Activate
                      </button>
                    </td>
                    <td>
                      <button
                        disabled={
                          c.accountStatus === "CLOSED" ||
                          c.accountStatus === "INACTIVE"
                        }
                        className="btn btn-danger"
                        onClick={(e) => {
                          handleClose(e, c.accountNumber);
                        }}
                      >
                        Close
                      </button>
                    </td>
                    <td>
                      <Link to={`/employeeaccountdashboard/${c.accountNumber}`}>
                        <button className="btn btn-info">Check</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        // type="button"
                        className="btn btn-light"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={(e) => {
                          handleCustomerCheck(e, c.customerId);
                        }}
                        style={{ margin: "20px" }}
                      >
                        Check
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        {/* <!-- Modal --> */}
        <div
          className="modal fade "
          id="exampleModal"
          // tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id="exampleModalLabel"
                  style={{ color: "black" }}
                >
                  Customer Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <table className="table  ">
                  <thead>
                    <tr>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Customer Id
                      </th>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Customer Name
                      </th>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Phone Number
                      </th>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Gender
                      </th>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Email
                      </th>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Pan Number
                      </th>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Aadhar Number
                      </th>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Address
                      </th>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Date Of Birth
                      </th>
                      <th
                        style={{ backgroundColor: "#566822", color: "white" }}
                      >
                        Age
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{customer.customerId}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.gender}</td>
                      <td>{customer.email}</td>
                      <td>{customer.panNumber}</td>
                      <td>{customer.aadharNumber}</td>
                      <td>{customer.address}</td>
                      <td>{customer.dateOfBirth}</td>
                      <td>{customer.age}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="transactions-details">
          <h5>All Transactions</h5>
          <div className="table">
            <table className="table-dark table-striped">
              <thead>
                <tr>
                  <td>Transaction ID</td>
                  <td>Beneficiary Account Number</td>
                  <td>Date</td>
                  <td>Amount</td>
                  <td>Type</td>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tran, key) => (
                  <tr key={key}>
                    <td className="td-content"> {tran.transactionID}</td>
                    <td className="td-content">
                      {" "}
                      {tran.beneficiaryAccountNumber}
                    </td>
                    <td className="td-content"> {tran.date}</td>
                    <td className="td-content"> {tran.transactionAmount}</td>
                    <td className="td-content"> {tran.transactionType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
