import axios from "axios";
const BASE_REST_API_URL = "http://localhost:8080/api/bank/emp";
class AdminService {
  addEmployee(employee, token) {
    return axios({
      method: "POST",
      url: BASE_REST_API_URL + "/addemp/" + 1,
      data: employee,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  registerEmployee(details) {
    return axios.post(
      "http://localhost:8080/api/authenticate/registeremp",
      details
    );
  }
  fetchAllTransaction() {
    return axios.get(BASE_REST_API_URL + "/alltransaction");
  }
  fetchTransactionOfAccount(id) {
    console.log("id=", id);
    return axios.get(BASE_REST_API_URL + "/transactionofaccount/" + id);
  }
  displayAllAccounts(token) {
    return axios({
      method: "GET",
      url: "http://localhost:8080/api/bank/account/displayallaccount",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  deleteEmployee(employeeId, token) {
    return axios({
      method: "DELETE",
      url: "http://localhost:8080/api/bank/deleteemp/" + employeeId,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  viewAllEmployee(token) {
    return axios({
      method: "GET",
      url: "http://localhost:8080/api/bank/viewallemployees",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
export default new AdminService();
