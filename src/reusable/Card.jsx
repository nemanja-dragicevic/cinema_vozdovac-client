import "../styles/card.css";

const Card = ({ projection, onSeatSelection }) => {
  const timeDisplay = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return <span>{`${formattedTime}`}</span>;
  };

  const dateDisplay = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return <span>{formattedDate}</span>;
  };

  return (
    <div className="card">
      <div className="header"></div>
      <div className="info">
        <p className="title">{projection.movie.name}</p>
        <p>
          Date: {dateDisplay(projection.projectTime)} <br />
          Time: {timeDisplay(projection.projectTime)}-{" "}
          {timeDisplay(projection.projectEnd)} <br />
          Hall: {projection.hall.hallName} <br />
          Price: {projection.price} RSD
        </p>
      </div>
      <div className="footer">
        <p className="tag">PDV included </p>
        <button
          type="button"
          className="action"
          onClick={() => onSeatSelection(projection)}
        >
          Select your seat(s){" "}
        </button>
      </div>
    </div>
  );
};

export default Card;
