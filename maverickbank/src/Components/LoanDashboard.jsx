import React, { useState, useEffect } from "react";
import CustomerService from "../service/CustomerService";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const LoanDashboard = () => {
  const [loanArray, setLoanArray] = useState([]);
  let [loan, setLoan] = useState({});
  const { id } = useParams();
  const [loanType, setLoanType] = useState("");
  const [tenure, setLoanTenure] = useState(0.0);
  const [loanAmount, setLoanAmount] = useState();
  const { token } = useAuth();
  let interest = 0;
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (loanType === "Home") {
      interest = 10;
    } else if (loanType === "Car") {
      interest = 8;
    } else if (loanType === "Bike") {
      interest = 7;
    } else {
      interest = 12;
    }

    loan = { loanAmount, tenure };
    if (loanAmount < 50000) {
      toast.error("Loan Amount should be greater than 50,000");
    } else if (tenure < 2 || tenure > 15) {
      toast.error("Tenure should be between min 2 yr and max 15 yrs");
    } else {
      console.log("Interset value", interest, typeof interest);
      console.log("Loan details value:", loan);
      CustomerService.applyForLoan(id, loanType, interest, loan, token)
        .then((response) => {
          console.log("Response Received from API:- ", response.data);
          toast.success(response.data);
          fetchAllAppliedLoan(id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAccountTypeChange = (e) => {
    console.log(e.target.value);
    setLoanType(e.target.value);
  };

  const fetchAllAppliedLoan = (id) => {
    console.log("Getting account details for Account Number:-", id);
    CustomerService.viewAppliedLoan(id, token)
      .then((response) => {
        console.log("Response Received from API:- ", response.data);
        setLoanArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchAllAppliedLoan(id);
  }, []);
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
        <h3 style={{ color: "white", textAlign: "center" }}>Loan Dashboard</h3>
      </div>
      <div className="table-container">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <td style={{ backgroundColor: "#78941b", color: "white" }}>
                Loan Number
              </td>
              <td style={{ backgroundColor: "#78941b", color: "white" }}>
                Loan Name
              </td>
              <td style={{ backgroundColor: "#78941b", color: "white" }}>
                Loan Amount
              </td>
              <td style={{ backgroundColor: "#78941b", color: "white" }}>
                Interest Rate
              </td>
              <td style={{ backgroundColor: "#78941b", color: "white" }}>
                Tenure
              </td>
              <td style={{ backgroundColor: "#78941b", color: "white" }}>
                Loan Status
              </td>
            </tr>
          </thead>
          <tbody>
            {loanArray.map((loan, key) => (
              <tr key={key}>
                <td className="td-content"> {loan.loanID}</td>
                <td className="td-content"> {loan.loanName}</td>
                <td className="td-content"> {loan.loanAmount}</td>
                <td className="td-content"> {loan.interestRate}</td>
                <td className="td-content"> {loan.tenure}</td>
                <td className="td-content"> {loan.loanStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Apply for Loan
        </button>
      </div>

      <div>
        <div className="card-container">
          <div className="card-content">
            <h4>Loans Offered</h4>
            <p>Home Loan @10% Interest</p>
            <p>Car Loan @8% Interest</p>
            <p>Bike Loan @7% Interest</p>
            <p>Personal Loan @12% Interest</p>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade "
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New Loan Application
              </h1>
            </div>
            <div className="modal-body">
              <form className="form-container-body">
                <label style={{ margin: "7px" }}>
                  Loan Type:-
                  <select
                    value={loanType}
                    onChange={handleAccountTypeChange}
                    required
                  >
                    <option value="" disabled={true}>
                      Select Loan Type
                    </option>
                    <option value="HOME">Home</option>
                    <option value="CAR">Car</option>
                    <option value="BIKE">Bike</option>
                    <option value="PERSONAL">Personal</option>
                  </select>
                </label>
                <label style={{ margin: "15px" }}>
                  Enter Loan Amount:-
                  <input
                    type="number"
                    min={0}
                    placeholder="Loan Amount"
                    onChange={(e) => {
                      {
                        setLoanAmount(e.target.value);
                      }
                    }}
                  ></input>
                </label>
                <label>
                  Enter Tenure:-
                  <input
                    type="number"
                    min={0}
                    placeholder="Tenure (in years)"
                    onChange={(e) => {
                      {
                        setLoanTenure(e.target.value);
                      }
                    }}
                  ></input>
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
