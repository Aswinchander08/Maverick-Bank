import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerService from "../service/CustomerService";
import { useAuth } from "./AuthContext";

export const Calculation = () => {
  const [totaltransaction, setTotalTransaction] = useState([]);
  const { id } = useParams();
  const { token } = useAuth();
  useEffect(() => {
    console.log("useparams", id, "Token", token);
    CustomerService.getInoutBound(id, token).then((response) => {
      console.log("In Out Bound :", response.data);
      setTotalTransaction(response.data);
    });
  }, []);
  return (
    <div
      className="card  text-bg-primary "
      style={{ width: "35rem", marginLeft: "35%", marginTop: "10%" }}
    >
      <div className="card-Header">
        Transaction
        <div className="card-body">
          <p>Total Inbound : {totaltransaction.totalInBound}</p>
          <p>Total Outbound : {totaltransaction.totalOutBound}</p>
          <p>Total Loan Availed : {totaltransaction.loan}</p>
        </div>
      </div>
    </div>
  );
};
