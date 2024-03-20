import axios from "axios";

const BASE_API_URL = "http://localhost:8080/api/bank/emp";

class EmployeeService {
  activateAccount(accountNumber, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "/activate/" + accountNumber,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  closeAccount(accountNumber, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "/close/" + accountNumber,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  allTransactionsOfAccount(accountNumber) {
    return axios.get(BASE_API_URL + "/transactionofaccount/" + accountNumber);
  }

  allLoanApplications(token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "/allloanapplication",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  approveLoan(loanId, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "/loanapproval/" + loanId,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  rejectLoan(loanId, token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "/loanreject/" + loanId,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  allTransactions(token) {
    return axios({
      method: "GET",
      url: BASE_API_URL + "/alltransaction",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new EmployeeService();
