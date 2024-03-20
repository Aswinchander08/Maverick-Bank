import React, { useState, useEffect } from "react";
import TransactionService from "../service/TransactionService";

export const TransactionBetweenDate = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  console.log("Application Rendered");
  const handle = (e) => {
    e.preventDefault();
    getTransactionsBetweenDates(props.children);
  };
  const getTransactionsBetweenDates = () => {
    TransactionService.viewBetweenDates(
      props.children,
      startdate,
      enddate
    ).then((response) => {
      setTransactions(response.data);
      console.log(" Transactions are:- ", response.data);
    });
  };
  return (
    <div>
      <div
        className="card"
        style={{ marginLeft: "45%", backgroundColor: "black", color: "white" }}
      >
        <div className="card-body">
          <h5 className="card-title">Transactions Between Dates</h5>
          <div className="card-text">
            <div>
              <label>
                Enter Start Date:-
                <input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                ></input>
              </label>
              <label>
                Enter End Date:-
                <input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                ></input>
              </label>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#Modal7"
                onClick={(e) => {
                  handle(e);
                }}
              >
                Submit
              </button>
            </div>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="Modal7"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel6"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5"
                      id="Modal7"
                      style={{ color: "black" }}
                    >
                      Transaction
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="table-container">
                      <table className="table table-striped table-dark">
                        <thead>
                          <tr>
                            <td
                              style={{
                                backgroundColor: "#78941b",
                                color: "white",
                              }}
                            >
                              Transaction ID
                            </td>
                            <td
                              style={{
                                backgroundColor: "#78941b",
                                color: "white",
                              }}
                            >
                              Beneficiary Account Number
                            </td>
                            <td
                              style={{
                                backgroundColor: "#78941b",
                                color: "white",
                              }}
                            >
                              Date
                            </td>
                            <td
                              style={{
                                backgroundColor: "#78941b",
                                color: "white",
                              }}
                            >
                              Amount
                            </td>
                            <td
                              style={{
                                backgroundColor: "#78941b",
                                color: "white",
                              }}
                            >
                              Type
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((tran, key) => (
                            <tr key={key}>
                              <td className="td-content">
                                {" "}
                                {tran.transactionID}
                              </td>
                              <td className="td-content">
                                {" "}
                                {tran.beneficiaryAccountNumber}
                              </td>
                              <td className="td-content"> {tran.date}</td>
                              <td className="td-content">
                                {" "}
                                {tran.transactionAmount}
                              </td>
                              <td className="td-content">
                                {" "}
                                {tran.transactionType}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
