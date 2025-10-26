import React from "react";

const SwapPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-8 px-4 relative min-h-screen py-16 flex flex-col items-center overflow-x-hidden hide-scrollbar">
      {children}
    </div>
  );
};

export default SwapPageLayout;
