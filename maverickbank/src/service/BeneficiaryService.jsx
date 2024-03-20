import axios from "axios";

const BASE_API_URL = "http://localhost:8080/api/bank/beneficiary/";
class BeneficiaryService {
  getBeneficiary(id) {
    return axios.get(BASE_API_URL + id);
  }
  addNewBeneficiary(id, bankname, bankbranch, ifsc, beneficiary, token) {
    return axios({
      method: "POST",
      url: BASE_API_URL + id + "/" + bankname + "/" + bankbranch + "/" + ifsc,
      data: beneficiary,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getBankName(bankname) {
    return axios.get(
      "http://localhost:8080/api/otherbank/bankname/" + bankname
    );
  }

  findBankBranch(bankname) {
    return axios.get("http://localhost:8080/api/otherbank/branch/" + bankname);
  }

  findBankIFSC(bankname, bankbranch) {
    return axios.get(
      "http://localhost:8080/api/otherbank/" + bankname + "/" + bankbranch
    );
  }
}
export default new BeneficiaryService();
