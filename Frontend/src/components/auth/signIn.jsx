import { SignIn } from "@clerk/clerk-react";
import React from "react";

const SignInComponent = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
};

export default SignInComponent;
