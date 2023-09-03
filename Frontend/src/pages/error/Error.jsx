import React from "react";
import { Link } from "react-router-dom";
import "@/pages/error/Error.css";

const Error = () => {
  return (
    <main className="error-page">
      <div id="errorText">Oops, something went wrong!</div>
      <Link id="errorLink" to="/">
        Go back to home
      </Link>
      <div id="g6219" />
    </main>
  );
};

export default Error;
