import * as React from "react";
import { LuUser } from "react-icons/lu";

function UserMenuButton({ ...props }) {
  return (
    <button {...props}>
      <LuUser color="black" size={24} />
    </button>
  );
}

export default UserMenuButton;
