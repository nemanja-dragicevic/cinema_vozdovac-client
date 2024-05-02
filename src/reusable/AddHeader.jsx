import { Card, Paper, Typography } from "@mui/material";

const AddHeader = ({ title, icon, subtitle }) => {
  return (
    <Paper elevation={0} square sx={{ backgroundColor: "#fdfdff" }}>
      <div style={{ display: "flex", mb: 30 }}>
        <Card sx={{ display: "inline-block", padding: 2, color: "#3c44b1" }}>
          {icon}
        </Card>
        <div style={{ paddingTop: 20, paddingLeft: 15 }}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div" sx={{ opacity: 0.6 }}>
            {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default AddHeader;
