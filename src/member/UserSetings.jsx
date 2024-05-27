import { useState } from "react";
import { useDispatch } from "react-redux";
import Joi from "joi";
import EditProfile from "./EditProfile";
import ConfirmDialog from "../reusable/ConfirmDialog";
import Popup from "../reusable/Popup";
import { error } from "../utils/notification";
import "../styles/user_settings.css";
import * as userActions from "../actions/members";
import ChangePassword from "./ChangePassword";

const schema = Joi.object({
  memberID: Joi.number().integer().required(),
  firstName: Joi.string().min(2).max(30).required().label("First Name"),
  lastName: Joi.string().min(3).max(30).required().label("Last Name"),
  birthDate: Joi.string().required().label("Birth Date"),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  gender: Joi.string().required(),
  role: Joi.string().required(),
  username: Joi.string().min(3).max(30).required().label("Username"),
});

const UserSettings = () => {
  const dispatch = useDispatch();

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
  const [changePassword, setChangePassword] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleChange = (name, value) => {
    resetErrors();
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDateChange = (date) => {
    resetErrors();
    console.log(date);

    if (date === null) {
      setData((prevData) => ({
        ...prevData,
        birthDate: "",
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        birthDate: new Date(date["$d"])
          .toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .split("/")
          .reverse()
          .join("-"),
      }));
    }
  };

  const handleGenderChange = (e) => {
    resetErrors();
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const resetErrors = () => {
    setErrors({
      firstName: { error: false, message: "" },
      lastName: { error: false, message: "" },
      email: { error: false, message: "" },
      username: { error: false, message: "" },
      password: { error: false, message: "" },
    });
  };

  const handleReset = () => {
    setOpenEdit(false);
    resetErrors();
    setData(member);
  };

  const handleDelete = () => {
    console.log("Delete profile");
    // sessionStorage.removeItem("user");
    // localStorage.removeItem("token");
    // window.location = "/register";
    setMember(member);
  };

  const handleSave = () => {
    const { password, token, ...dataWithoutPassword } = data;
    const validate = schema.validate(dataWithoutPassword, {
      abortEarly: false,
    });

    if (validate.error) {
      const { details } = validate.error;
      if (details[0].path[0] === "birthDate") {
        error(details[0].message);
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [details[0].path[0]]: { error: true, message: details[0].message },
      }));
    } else {
      setConfirmDialog({
        isOpen: true,
        title: "Are you sure you want to save changes?",
        subTitle: "You can't undo this operation",
        onConfirm: () => {
          setConfirmDialog({ ...confirmDialog, isOpen: false });
          dispatch(userActions.updateProfile(dataWithoutPassword));
          setOpenEdit(false);
        },
      });
    }
  };

  return (
    <div className="user_card">
      <div className="user_content">
        <div className="user_title">User profile</div>
        <div className="user_fullname">
          {data.firstName + " " + data.lastName}
        </div>
        <div className="user_description">
          <p>Gender: {capitalizeFirstLetter(data.gender)}</p>
          <p>Email: {data.email}</p>
          <p>Username: {data.username}</p>
          <p>Birthdate: {data.birthDate}</p>
          <p>Username: {data.username}</p>
        </div>
        <div className="user-events">
          <button className="blue-btn" onClick={() => setOpenEdit(true)}>
            Edit profile
          </button>
          <button className="blue-btn" onClick={() => setChangePassword(true)}>
            Change password
          </button>
          <button
            className="red-btn"
            onClick={() =>
              setConfirmDialog({
                isOpen: true,
                title: "Are you sure you want to delete your profile?",
                subTitle: "You can't undo this operation",
                onConfirm: () => {
                  handleDelete();
                },
              })
            }
          >
            Delete profile
          </button>
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirm={setConfirmDialog}
      />
      <Popup openPopup={openEdit} setOpen={setOpenEdit} title="Edit Profile">
        <EditProfile
          data={data}
          errors={errors}
          handleChange={handleChange}
          onCancel={handleReset}
          onSave={handleSave}
          onDateChange={handleDateChange}
          onGenderChange={handleGenderChange}
        />
      </Popup>
      <Popup
        openPopup={changePassword}
        setOpen={setChangePassword}
        title="Change password"
      >
        <ChangePassword />
      </Popup>
    </div>
  );
};

export default UserSettings;
