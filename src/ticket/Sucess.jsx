import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as ticketActions from "../actions/tickets";
import "../styles/gradient.css";
import { Link } from "react-router-dom";

const Success = () => {
  const dispatch = useDispatch();

  const sessionID = JSON.parse(sessionStorage.getItem("sessionID"));

  useEffect(() => {
    if (sessionID) {
      dispatch(ticketActions.saveCheckoutTicket(sessionID));
    } else {
      window.location.href = "/";
    }
  }, [sessionID]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 className="gradient-text">Payment Successfull</h1>
      <p>
        Your ticket payment will be processed. You will be redirected to the
        home page shortly.
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

export default Success;
