import React, { useState } from "react";
import TransactionService from "../service/TransactionService";
import { useParams, useNavigate } from "react-router-dom";
import { Withdraw } from "./Withdraw";
import { Transafer } from "./Transafer";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { TransactionLast10History } from "./TransactionLast10History";
import { LastMonthTransaction } from "./LastMonthTransaction";
import { TransactionBetweenDate } from "./TransactionBetweenDate";
import "./TransactionDashboard.css";

export const TransactionDashboard = () => {
  console.log("Application Rendered");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const { id } = useParams();
  let [check1, setCheck1] = useState(false);
  let [check2, setCheck2] = useState(false);
  let [check3, setCheck3] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const handleTransactionButton1 = () => {
    if (check1 == true) {
      setCheck1(false);
    } else {
      setCheck1(true);
    }
  };

  const handleTransactionButton2 = () => {
    if (check2 == true) {
      setCheck2(false);
    } else {
      setCheck2(true);
    }
  };

  const handleTransactionButton3 = () => {
    if (check3 == true) {
      setCheck3(false);
    } else {
      setCheck3(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const amount = { transactionAmount };
    console.log("Amount", transactionAmount, "id", id);

    TransactionService.deposit(id, amount, token)
      .then((response) => {
        console.log("Deposited Successfully", response.data);
        toast.success(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.transactionAmount);
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
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ margin: "10px", marginTop: "100px", marginLeft: "100px" }}
        >
          <i className="uil uil-money-insert"></i>
          DEPOSIT
        </button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Deposit
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label>Enter the amount : </label>&nbsp;&nbsp;
                <input
                  type="number"
                  placeholder="Enter Deposit Amount"
                  name="transactionAmount"
                  value={transactionAmount}
                  id="input"
                  onChange={(e) => {
                    setTransactionAmount(e.target.value);
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Withdraw>{id}</Withdraw>
      <Transafer>{id}</Transafer>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleTransactionButton3}
        style={{ margin: "10px" }}
      >
        <i className="uil uil-file"></i>
        View Transactions Between Dates
      </button>
      {check3 && <TransactionBetweenDate>{id}</TransactionBetweenDate>}
      <LastMonthTransaction>{id}</LastMonthTransaction>
      <TransactionLast10History>{id}</TransactionLast10History>

      {/* <button
        type="button"
        className="btn btn-primary"
        onClick={handleTransactionButton1}
        style={{ margin: "10px" }}
      >
        View 10 Transactions
      </button>
      {check1 && <TransactionHistoryLast10>{id}</TransactionHistoryLast10>}
      <br /> */}
      {/* <button
        type="button"
        className="btn btn-primary"
        onClick={handleTransactionButton2}
      >
        Last Month Transaction
      </button>
      {check2 && <TransactionLastMonth>{id}</TransactionLastMonth>}
      <br /> */}
      {/* <button
        type="button"
        className="btn btn-primary"
        onClick={handleTransactionButton3}
        style={{ margin: "10px" }}
      >
        View Transactions Between Dates
      </button>
      {check3 && <TransactionBetweenDates>{id}</TransactionBetweenDates>} */}
    </div>
  );
};
