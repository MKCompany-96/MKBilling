import React from "react";

function ResultBox({ pdfUrl, billId, total }) {
  return (
    <div className="result-box">
      <h3>✅ Bill Generated</h3>
      <p><strong>Bill ID:</strong> {billId}</p>
      <p><strong>Total:</strong> ₹{total}</p>
      <a href={pdfUrl} target="_blank" rel="noopener noreferrer">📄 View PDF</a>
    </div>
  );
}

export default ResultBox;
