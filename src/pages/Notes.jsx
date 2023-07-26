import React from "react";

import { FireBase } from "../API/firebase";

const Notes = () => {
  // FireBase.logout();
  console.log(FireBase.user);
  return (
    <div className="wrapper">
      <div className="Main">Главная Страница</div>
      <div className="">{FireBase.user.uid}</div>
    </div>
  );
};

export default Notes;
