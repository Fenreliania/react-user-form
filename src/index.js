import React from "react";
import { render } from "react-dom";
import UserForm from "./UserDetails";

render(
  <UserForm className="col-6 offset-3" />,
  document.getElementById("root")
);
