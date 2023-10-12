import { SignUp } from "@clerk/clerk-react";
import React from "react";

const SignUpComponent = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
};

export default SignUpComponent;
