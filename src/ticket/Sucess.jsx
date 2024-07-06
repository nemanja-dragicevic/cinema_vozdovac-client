import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as ticketActions from "../actions/tickets";

const Success = () => {
  const dispatch = useDispatch();

  const sessionID = JSON.parse(sessionStorage.getItem("sessionID"));

  useEffect(() => {
    if (sessionID) {
      dispatch(ticketActions.saveCheckoutTicket(sessionID));
    }
  }, [sessionID]);

  return (
    <div>
      <h1>Success</h1>
    </div>
  );
};

export default Success;
