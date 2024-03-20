import React, { useState, useEffect } from "react";
import axios from "axios";

const BankNameInput = (props) => {
  const [bankName, setBankName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Function to fetch suggestions from the API
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/otherbank/bankname/" + bankName
        );
        setSuggestions(response.data); // Assuming the API response is an array of suggestions
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    // Fetch suggestions only if the bankName is not empty
    if (bankName.trim() !== "") {
      fetchSuggestions();
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  }, [bankName]);

  const handleInputChange = (e) => {
    setBankName(e.target.value);
    setShow(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setBankName(suggestion);
    setSuggestions([]);
    props.onBankNameChange(suggestion);
    setShow(false);
    // Clear suggestions after selecting one
  };

  return (
    <div>
      <label htmlFor="bankName">Bank Name:</label>
      <input
        type="text"
        id="bankName"
        value={bankName}
        placeholder="Enter Bank name..."
        style={{ marginLeft: "50px" }}
        onChange={handleInputChange}
      />

      {show && (
        <div className="dropdown">
          <ul
            style={{
              backgroundColor: "white",
              marginLeft: "30%",
              marginRight: "30%",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BankNameInput;
