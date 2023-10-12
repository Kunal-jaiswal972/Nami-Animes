import React from "react";

import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
  return (
    <div  className="mb-10">
      <Navbar />
      <main className="mt-14">{children}</main>
    </div>
  );
};

export default Layout;
