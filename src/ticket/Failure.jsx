import { Link } from "react-router-dom";
import { useEffect } from "react";
import { error } from "../utils/notification";
import "../styles/gradient.css";

const Failure = () => {
  useEffect(() => {
    error("Payment cancelled! Redirecting to home page...");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 className="gradient-text">Payment Cancelled</h1>
      <p>
        Your ticket payment was cancelled. You will be redirected to the home
        page shortly.
      </p>
      <p>
        If you are not redirected, click{" "}
        <Link to="/" style={{ color: "blue" }}>
          here
        </Link>{" "}
        to go to the home page.
      </p>
    </div>
  );
};

export default Failure;
