import React from "react";
import Navbar from "../_components/shared/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <Navbar />
      <main className="h-full pt-32">{children}</main>
    </div>
  );
};

export default MarketingLayout;