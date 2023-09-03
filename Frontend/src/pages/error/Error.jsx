import React from "react";
import "./Error.css"; // Import the CSS file
import { Link } from "react-router-dom";

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
