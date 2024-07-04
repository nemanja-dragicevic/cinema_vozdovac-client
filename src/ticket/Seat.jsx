import ChairIcon from "@mui/icons-material/Chair";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";

const Seat = ({ row, seat, seatId, isBooked, isSelected, toggleSeat }) => {
  const handleSeatClick = () => {
    toggleSeat(row, seat, seatId);
  };

  const SeatIcon = isBooked || isSelected ? ChairIcon : ChairOutlinedIcon;

  return <SeatIcon onClick={handleSeatClick} fontSize="large" />;
};

export default Seat;
