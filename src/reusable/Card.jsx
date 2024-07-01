import "../styles/card.css";

const Card = ({ projection }) => {
  const timeDisplay = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // const formattedDate = date.toLocaleDateString("en-US", {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    // });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // const formattedDateTime = `${formattedDate} ${formattedTime}`;

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
          {timeDisplay(projection.projectEnd)}
        </p>
      </div>
      <div className="footer">
        <p className="tag">PDV included </p>
        <button type="button" className="action">
          Choose your seat(s){" "}
        </button>
      </div>
    </div>
  );
};

export default Card;
