import React, { useEffect, useState } from "react";
import BeneficiaryService from "../service/BeneficiaryService";
import TransactionService from "../service/TransactionService";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import "./TransactionDashboard.css";

export const Transafer = (props) => {
  console.log("Application Rendered");

  const [transactionAmount, setTransactionAmount] = useState(0);
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState("");
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  const { token } = useAuth();
  console.log("selectedbeneficiaryAccountNumber", beneficiaryAccountNumber);

  const handleBeneficiary = (e) => {
    setBeneficiaryAccountNumber(e.target.value);
    // const selectedBeneficiary = beneficiaryList.find(
    //   (beneficiary) =>
    //     beneficiary.beneficiaryAccountNumber ===
    //     selectedbeneficiaryAccountNumber
    // );
    // setSelectedBeneficiary(selectedBeneficiary);
    // console.log(selectedBeneficiary);
  };

  useEffect(() => {
    BeneficiaryService.getBeneficiary(props.children).then((response) => {
      console.log("Beneficiary List:", response.data);
      setBeneficiaryList(response.data);
    });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const amount = { transactionAmount, beneficiaryAccountNumber };
    console.log(
      "Amount",
      transactionAmount,
      "id",
      props.children,
      "beneficiary account number",
      beneficiaryAccountNumber
    );
    TransactionService.transfer(props.children, amount, token)
      .then((response) => {
        console.log("Transaction Successfull", response.data);
        toast.success(response.data);
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
      {/* TRANSFER */}

      <div>
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          style={{ margin: "10px" }}
        >
          <i className="uil uil-money-withdraw"></i>
          TRANSFER
        </button>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel2">
                  Transfer
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
                <label>
                  Beneficiary:
                  <select onChange={handleBeneficiary} required>
                    <option value="" id="input">
                      Select Beneficiary
                    </option>
                    {beneficiaryList.map((beneficiary) => (
                      <option
                        key={beneficiary.beneficiaryAccountNumber}
                        value={beneficiary.beneficiaryAccountNumber}
                      >
                        {beneficiary.beneficiaryName} -
                        {beneficiary.beneficiaryAccountNumber}
                      </option>
                    ))}
                  </select>
                </label>
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
