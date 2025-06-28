import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BillForm from "./components/BillForm";
import "./App.css";

function App() {
  const handleSearch = (billId) => {
    const backendUrl = "https://script.google.com/macros/s/AKfycbz1DUVAcpx5NXK1ldyFh8Gb_miBz08XgGzs3dI0mypohFESvY35xL4ZdiqzJD9-e7xc/exec";
    fetch(`${backendUrl}?billId=${billId}`)
      .then(res => res.text())
      .then(link => {
        if (link.startsWith("http")) window.open(link, "_blank");
        else alert("❌ Bill not found.");
      });
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <main>
        <BillForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
