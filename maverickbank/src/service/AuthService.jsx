import axios from "axios";
const BASE_API_URL = "/api/authenticate";
class AuthService {
  loginTo(login) {
    return axios.post("http://localhost:8080/api/authenticate/login", login);
  }
  registeringCustomer(details) {
    return axios.post(
      "http://localhost:8080/api/authenticate/register",
      details
    );
  }
}
export default new AuthService();
