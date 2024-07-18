import React, { useState } from "react";
import ConformDialog from "../components/ConformDialog";

const LogoutPage = () => {
  const message = "Are you sure want to logout!";
  const [open, setOpen] =useState(true)
  return (
    <div>
      <ConformDialog message={message} setOpen={setOpen} />
    </div>
  );
};

export default LogoutPage;
