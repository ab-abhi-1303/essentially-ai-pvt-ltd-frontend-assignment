import React, { useState } from "react";
import "./Form.css";
const FormComponent = () => {
  const [formData, setFormData] = useState({
    stockSymbol: "",
    date: "",
  });

  const [stockDetails, setStockDetails] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStockDetails(null);
    const apiUrl = "http://localhost:5000/api/fetchStockData";
    const dataToSend = {
      stockSymbol: formData.stockSymbol.toUpperCase(),
      date: formData.date,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(
          "Unable to load response, Please try with different input."
        );
      } else if (response.ok) {
        const responseData = await response.json();
        setStockDetails(responseData);
      }
    } catch (error) {
      console.error("API error:", error);
      alert(error.message);
    }
  };

  const isSubmitButtonDisabled = !formData.stockSymbol.trim() || !formData.date;

  const today = new Date();
  today.setDate(today.getDate() - 1);
  const yesterdayFormatted = today.toISOString().split("T")[0];

  return (
    <div className="form-container">
      <h2>Form Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="stockSymbol">Stock Symbol:</label>
          <input
            type="text"
            id="stockSymbol"
            name="stockSymbol"
            value={formData.stockSymbol}
            onChange={handleChange}
            placeholder="Enter your text"
            maxLength="6"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date :</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={yesterdayFormatted}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitButtonDisabled}>
          Submit
        </button>
      </form>
      {stockDetails && (
        <div className="stock-data">
          <h3>API Data:</h3>
          <p>Open: {stockDetails.open}</p>
          <p>Close: {stockDetails.close}</p>
          <p>High: {stockDetails.high}</p>
          <p>Low: {stockDetails.low}</p>
          <p>Volume: {stockDetails.volume}</p>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
