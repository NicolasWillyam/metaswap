import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-8 px-4 max-w-md mx-auto">{children}</div>;
};

export default MainLayout;
