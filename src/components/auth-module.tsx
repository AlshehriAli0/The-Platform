"use client";

import React, { useState } from "react";
import { SignModule } from "./component/signup-module";
import { LoginModule } from "./component/login-module";

export default function AuthModule() {
  const [logIn, setLogIn] = useState<boolean>(false);
  return (
    <div className="flex h-full w-full items-center justify-center">
      {logIn ? (
        <LoginModule setLogIn={setLogIn} />
      ) : (
        <SignModule setLogIn={setLogIn} />
      )}
    </div>
  );
}
