import React, { useState } from "react";
import ResultBox from "./ResultBox";

// ✅ Your current Web App URL
const BACKEND_URL = "https://script.google.com/macros/s/AKfycbyY5Si4NeCNYjIIfkqKtFvhpE9fJqwKBVgQHdVHhuoBCqTA0rwJGLbMSLWDINUWX57j/exec";

function BillForm() {
  const [formData, setFormData] = useState({
    name: "",
    district: "",
    mandal: "",
    ant_qty: 0,
    floor_qty: 0,
    bleach_qty: 0,
    payment: "Cash",
    upi_id: ""
  });

  const [pdfUrl, setPdfUrl] = useState("");
  const [billId, setBillId] = useState("");
  const [total, setTotal] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.payment === "Cash") {
      formData.upi_id = "";
    }

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (result.success) {
        setPdfUrl(result.pdfUrl);
        setBillId(result.billId);
        setTotal(result.total);
      } else {
        alert("❌ Bill generation failed. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Something went wrong. Check the console.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Customer Details */}
        <h2>Customer Details</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>District:</label>
            <input type="text" name="district" value={formData.district} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Mandal:</label>
            <input type="text" name="mandal" value={formData.mandal} onChange={handleChange} required />
          </div>
        </div>

        {/* Product Quantities */}
        <h2>Product Quantities</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Ant Medicine (kg):</label>
            <input type="number" name="ant_qty" min="0" value={formData.ant_qty} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Floor Cleaner (L):</label>
            <input type="number" name="floor_qty" min="0" value={formData.floor_qty} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Bleaching Powder (kg):</label>
            <input type="number" name="bleach_qty" min="0" value={formData.bleach_qty} onChange={handleChange} />
          </div>
        </div>

        {/* Payment Mode */}
        <h2>Payment Mode</h2>
        <div className="form-row">
          <div className="form-group">
            <label>
              <input
                type="radio"
                name="payment"
                value="Cash"
                checked={formData.payment === "Cash"}
                onChange={handleChange}
              />
              Cash
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={formData.payment === "UPI"}
                onChange={handleChange}
              />
              UPI
            </label>
          </div>

          {formData.payment === "UPI" && (
            <div className="form-group">
              <label>UPI ID:</label>
              <input
                type="text"
                name="upi_id"
                value={formData.upi_id}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit">✅ Submit</button>

          <button
            type="button"
            onClick={() => window.open(pdfUrl, "_blank")}
            disabled={!pdfUrl}
          >
            ⬇️ Download
          </button>

          <button
            type="button"
            onClick={() => {
              const win = window.open(pdfUrl, "_blank");
              if (win) win.onload = () => win.print();
            }}
            disabled={!pdfUrl}
          >
            🖨️ Print
          </button>
        </div>
      </form>

      {/* Show result if PDF generated */}
      {pdfUrl && <ResultBox pdfUrl={pdfUrl} billId={billId} total={total} />}
    </div>
  );
}

export default BillForm;
