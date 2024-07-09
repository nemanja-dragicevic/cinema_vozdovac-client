import ChairIcon from "@mui/icons-material/Chair";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import CloseIcon from "@mui/icons-material/Close";

const Seat = ({ row, seat, seatId, isBooked, isSelected, toggleSeat }) => {
  const handleSeatClick = () => {
    toggleSeat(row, seat, seatId, isBooked);
  };

  const SeatIcon = isBooked
    ? CloseIcon
    : isSelected
    ? ChairIcon
    : ChairOutlinedIcon;

  return <SeatIcon onClick={handleSeatClick} fontSize="large" />;
};

export default Seat;
