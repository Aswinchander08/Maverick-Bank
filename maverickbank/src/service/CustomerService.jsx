// import axios from 'axios'
// const BASE_REST_API_URL="http://localhost:8080/api/bank"
// class CustomerService{
//     addCustomer(customer){
//         return axios.post(BASE_REST_API_URL+"/addCustomer",customer)
//     }

// }
// export default new CustomerService()
import axios from "axios";
// import { useAuth } from "../Components/AuthContext";

// let jwtToken = sessionStorage.getItem("jwtToken");

const BASE_API_URL = "http://localhost:8080/api/bank/";
// const { token } = useAuth();
class CustomerService {
  addNewCustomer(customer) {
    return axios.post(BASE_API_URL + "customer/add", customer);
  }

  allAccountsOfCustomer(customer_id, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "account/findaccount/" + customer_id,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  accountDetails(accountNumber, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "account/" + accountNumber,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addNewAccount(customer_id, accountType, token) {
    return axios({
      method: "POST",
      url: BASE_API_URL + "account/add/" + customer_id + "/" + accountType,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  applyForLoan(accountNumber, loanname, interest, loan, token) {
    return axios({
      method: "POST",
      url:
        BASE_API_URL +
        "account/" +
        accountNumber +
        "/applyloan/" +
        loanname +
        "/" +
        interest,
      data: loan,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  viewAppliedLoan(accountNumber, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "account/" + accountNumber + "/getloan",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteAccountRequest(accountNumber, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "account/deleterequest/" + accountNumber,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getCustomerDetails(id, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "customer/searchbyid/" + id,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getInoutBound(id, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "emp/inoutbound/" + id,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  deleteCustomer(id) {
    return axios({
      method: "DELETE",
      url: BASE_API_URL + "customer/deletebyid/" + id,
    });
  }
}
export default new CustomerService();
