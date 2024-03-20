import React, { useEffect, useState } from "react";
import TransactionService from "../service/TransactionService";

export const LastMonthTransaction = (props) => {
  const [transactions, setTransactions] = useState([]);
  console.log("Application Rendered");

  useEffect(() => {
    getLastMonthTransactions(props.children);
  }, []);

  const getLastMonthTransactions = () => {
    TransactionService.viewLastMonth(props.children).then((response) => {
      setTransactions(response.data);
      console.log("Last 10 Transactions are:- ", response.data);
    });
  };
  return (
    <div>
      <div>
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#Modal6"
          style={{ margin: "10px" }}
        >
          <i className="uil uil-file"></i>
          One Month Transaction
        </button>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="Modal6"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel6"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="Modal6">
                  Last One Month Transaction
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h5>Last Month Transaction</h5>
                <div className="table-container" style={{ marginLeft: "25%" }}>
                  <table className="table table-striped table-dark">
                    <thead>
                      <tr>
                        <td
                          style={{ backgroundColor: "#78941b", color: "white" }}
                        >
                          Transaction ID
                        </td>
                        <td
                          style={{ backgroundColor: "#78941b", color: "white" }}
                        >
                          Beneficiary Account Number
                        </td>
                        <td
                          style={{ backgroundColor: "#78941b", color: "white" }}
                        >
                          Date
                        </td>
                        <td
                          style={{ backgroundColor: "#78941b", color: "white" }}
                        >
                          Amount
                        </td>
                        <td
                          style={{ backgroundColor: "#78941b", color: "white" }}
                        >
                          Type
                        </td>
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
  );
};
