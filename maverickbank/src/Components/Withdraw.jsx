import React, { useState, useParams } from "react";
import TransactionService from "../service/TransactionService";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import "./TransactionDashboard.css";

export const Withdraw = (props) => {
  console.log("Application Rendered");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const { token } = useAuth();

  //   const { id } = useParams();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const amount = { transactionAmount };
    console.log("Amount", transactionAmount, "id", props.children);

    TransactionService.withdraw(props.children, amount, token)
      .then((response) => {
        console.log("Withdrawn Successfully", response.data);
        toast.success("Withdrawn Successfully");
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.transactionAmount) {
          toast.error(error.response.data.transactionAmount);
        }
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div>
      {/* WITHDRAW */}

      <div>
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          style={{ margin: "10px" }}
        >
          <i className="uil uil-money-withdraw"></i>
          WITHDRAW
        </button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal1"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel1">
                  Withdraw
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
    </div>
  );
};
