import { Button, Paper } from "@mui/material";
import { useState } from "react";
import Popup from "../reusable/Popup";
import EditProfile from "./EditProfile";
import "../styles/user_settings.css";

const UserSettings = () => {
  const [member, setMember] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [errors, setErrors] = useState({
    firstName: { error: false, message: "" },
    lastName: { error: false, message: "" },
    email: { error: false, message: "" },
    username: { error: false, message: "" },
    password: { error: false, message: "" },
  });

  const [data, setData] = useState(member);
  const [openEdit, setOpenEdit] = useState(false);

  const handleChange = (name, value) => {
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const capitalizeFirstLetter = (gender) => {
    if (gender === "MALE") {
      return "Male";
    } else if (gender === "FEMALE") {
      return "Female";
    } else {
      return gender;
    }
  };

  const handleReset = () => {
    setData(member);
  };

  return (
    // <div
    //   style={{
    //     padding: "20px",
    //     marginTop: "50px",
    //     width: "50%",
    //     marginTop: "100px",
    //     marginLeft: "auto",
    //     marginRight: "auto",
    //   }}
    // >
    //   <Paper sx={{ padding: 3 }}>
    //     <div
    //       style={{
    //         marginTop: "30px",
    //         display: "flex",
    //         flexDirection: "column",
    //         rowGap: 20,
    //         alignItems: "center",
    //       }}
    //     >
    //       <Input
    //         name="firstName"
    //         label="First Name"
    //         error={errors.firstName}
    //         value={data.firstName}
    //         onChange={handleChange}
    //         {...commonInputProps}
    //       />
    //       <Input
    //         name="lastName"
    //         label="Last Name"
    //         error={errors.lastName}
    //         onChange={handleChange}
    //         value={data.lastName}
    //         {...commonInputProps}
    //       />
    //       <Input
    //         name="email"
    //         label="Email"
    //         error={errors.email}
    //         value={data.email}
    //         onChange={handleChange}
    //         {...commonInputProps}
    //       />
    //       <Input
    //         name="username"
    //         label="Username"
    //         error={errors.username}
    //         onChange={handleChange}
    //         value={data.username}
    //         {...commonInputProps}
    //       />
    //       <div style={{ display: "flex", columnGap: 30 }}>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           onClick={() => setEditable(true)}
    //         >
    //           Edit Profile
    //         </Button>
    //         <Button variant="contained" color="primary">
    //           Change Password
    //         </Button>
    //       </div>
    //       <Button variant="outlined" color="primary" onClick={handleReset}>
    //         Reset
    //       </Button>
    //     </div>
    //   </Paper>
    //   <Popup>
    //     <ChangePassword />
    //   </Popup>
    // </div>
    <div class="user_card">
      <div class="user_content">
        <div class="user_title">User profile</div>
        <div class="user_fullname">{data.firstName + " " + data.lastName}</div>
        <div class="user_description">
          <p>Gender: {capitalizeFirstLetter(data.gender)}</p>
          <p>Email: {data.email}</p>
          <p>Username: {data.username}</p>
          <p>Birthdate: {data.birthDate}</p>
          <p>Username: {data.username}</p>
        </div>
        <div class="user-events">
          <button class="blue-btn" onClick={() => setOpenEdit(true)}>
            Edit profile
          </button>
          <button class="red-btn">Delete profile</button>
        </div>
      </div>
      <Popup openPopup={openEdit} setOpen={setOpenEdit}>
        <EditProfile />
      </Popup>
    </div>
  );
};

export default UserSettings;
