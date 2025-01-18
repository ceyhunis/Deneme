import React from "react";
import ProfileForm from "@/components/components/profile-page/ProfileForm";

const ProfilePage: React.FC = () => {
  return (
    <div
      style={{
        paddingLeft: "60px",
        paddingBottom: "60px",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
