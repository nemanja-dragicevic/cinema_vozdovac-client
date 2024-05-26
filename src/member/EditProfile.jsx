import AddHeader from "./../reusable/AddHeader";
import PersonIcon from "@mui/icons-material/Person";

const EditProfile = () => {
  return (
    <div style={{ display: "flex", marginTop: 20, marginBottom: 30, gap: 20 }}>
      <AddHeader title="User Settings" icon={<PersonIcon />} />
      <h1>Edit Profile</h1>
    </div>
  );
};

export default EditProfile;
