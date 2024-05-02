import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as hallActions from "../actions/hall";

const HallPage = () => {
  const dispatch = useDispatch();

  const { halls } = useSelector((state) => state.hallReducer);

  useEffect(() => {
    dispatch(hallActions.getHalls());
  }, [dispatch]);

  console.log(halls);

  return (
    <div>
      <h1>Hall Page</h1>
    </div>
  );
};

export default HallPage;
