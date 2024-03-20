import axios from "axios";
import { Withdraw } from "../Components/Withdraw";

const BASE_API_URL = "http://localhost:8080/api/bank/transaction/";

class TransactionService {
  deposit(id, amount, token) {
    return axios({
      method: "POST",
      url: BASE_API_URL + "deposit/" + id,
      data: amount,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  withdraw(id, amount, token) {
    return axios({
      method: "POST",
      url: BASE_API_URL + "withdraw/" + id,
      data: amount,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  transfer(id, amount, token) {
    return axios({
      method: "POST",
      url: BASE_API_URL + "transfer/" + id,
      data: amount,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  view10Transactions(id) {
    return axios.get(BASE_API_URL + "view10transaction/" + id);
  }
  viewLastMonth(id) {
    return axios.get(BASE_API_URL + "transactionforlastmonth/" + id);
  }
  viewBetweenDates(id, startdate, enddate) {
    return axios.get(
      BASE_API_URL +
        "transactionbetween/" +
        id +
        "/" +
        startdate +
        "/" +
        enddate
    );
  }
}
export default new TransactionService();
