export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const dateDisplay = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",

    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedDate;
};
