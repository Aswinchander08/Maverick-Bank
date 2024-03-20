import React, { useEffect, useState } from "react";
import BeneficiaryService from "../service/BeneficiaryService";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BankNameInput from "./Bankname";
import { useAuth } from "./AuthContext";

const AddBeneficiary = () => {
  const [bankbranch, setBankBranch] = useState([""]);
  const [ifsc, setIFSC] = useState("");
  const [bankName, setbankName] = useState();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState();
  const [beneficiaryName, setBeneficiaryName] = useState();
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleBankNameChange = (newBankName) => {
    setbankName(newBankName);
    console.log("Received data:", newBankName);
    fetchingBankBranch(newBankName);
  };

  const fetchingBankBranch = (bankName) => {
    BeneficiaryService.findBankBranch(bankName)
      .then((response) => {
        console.log("Bank branch from api:- ", response.data);
        setBankBranch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchIFSC = (selectedBranch) => {
    BeneficiaryService.findBankIFSC(bankName, selectedBranch)
      .then((response) => {
        console.log("Bank IFSC from api:- ", response.data);
        setIFSC(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("bank name", bankName);

  const handleSubmit = (e) => {
    e.preventDefault();
    let Beneficiary = { beneficiaryAccountNumber, beneficiaryName };
    BeneficiaryService.addNewBeneficiary(
      id,
      bankName,
      selectedBranch,
      ifsc,
      Beneficiary,
      token
    )
      .then((response) => {
        console.log("Response from api:- ", response.data);
        toast.success(response.data, {
          style: {
            borderRadius: "10px",
            background: "#566822",
            color: "#fff",
          },
        });
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const goBack = () => {
    navigate(-1);
  };

  // handleCallback = (childData) => {
  //   this.setbankName({ childData });
  // };

  return (
    <div className="full-background1">
      <div>
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
        <div
          className="card card-md text-bg-dark"
          style={{
            width: "35rem",
            height: "auto",
            padding: "35px",
            marginLeft: "30%",
            marginTop: "3%",
            display: "flex",
            float: "left",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <div className="card-Header">
            <h4>Add Beneficiary</h4>
          </div>
          <div className="card-body">
            <BankNameInput onBankNameChange={handleBankNameChange} />
            <label>
              Choose Bank Branch:
              <select
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  fetchIFSC(e.target.value);
                }}
              >
                <option value="">Select Branch</option>
                {bankbranch.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </label>
            {/* {fetchIFSC(selectedBranch)} */}
            <label>
              IFSC:
              <input
                type="text"
                value={ifsc}
                placeholder="IFSC Code"
                style={{ marginLeft: "100px" }}
              ></input>
            </label>
            <label>
              Enter Beneficiary Account Number:
              <input
                type="number"
                min={0}
                placeholder="Account Number"
                onChange={(e) => {
                  setBeneficiaryAccountNumber(e.target.value);
                }}
              ></input>
            </label>
            <label>
              Enter Beneficiary Name:
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setBeneficiaryName(e.target.value);
                }}
              ></input>
            </label>
            <br />
            <br />
            <button
              className="btn btn-primary"
              type="button"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBeneficiary;
