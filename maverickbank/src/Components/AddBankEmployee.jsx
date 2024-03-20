import React, { useState } from "react";
import AdminService from "../service/AdminService";
export const AddBankEmployee = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [panCardNumber, setPanCardNumber] = useState("");
  const saveEmployee = (e) => {
    e.preventDefault();
    const employee = {
      employeeName,
      dateOfBirth,
      address,
      phoneNumber,
      panCardNumber,
    };
    console.log("Details From the form : ", employee);
    AdminService.addEmployee(employee)
      .then((response) => {
        console.log("respone data :", response.data);
        //   alert("Event added Successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <h2>Add Employee</h2>
          <div className="card-body">
            <form onSubmit={saveEmployee}>
              <div className="form-group mb-2">
                {/* Customer name */}
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="employeeName"
                  value={employeeName}
                  className="form-control"
                  onChange={(e) => {
                    setEmployeeName(e.target.value);
                  }}
                />
                {/* Date Of Birth */}

                <label className="form-label">Date Of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  className="form-control"
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }}
                />
                {/* address */}

                <label className="form-label">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  className="form-control"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                {/* Phone Number */}
                <br />

                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                  value={phoneNumber}
                  className="form-control"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
                {/* Pan Number */}

                <label className="form-label">Pan Card Number</label>
                <input
                  type="text"
                  placeholder="Enter your pan card number"
                  name="panCardNumber"
                  value={panCardNumber}
                  className="form-control"
                  onChange={(e) => {
                    setPanCardNumber(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-dark"
                // onClick={(e) => saveCustomer(e)}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
