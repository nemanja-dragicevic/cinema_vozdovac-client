const GradientHeader = ({ title }) => {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: 30,
        marginTop: 30,
        fontWeight: "bold",
      }}
    >
      <span className="gradient-text">{title}</span>
    </div>
  );
};

export default GradientHeader;
