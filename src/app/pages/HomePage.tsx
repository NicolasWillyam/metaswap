import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/shared/store";
import Background from "@/shared/components/Background";
import HeroSection from "@/shared/components/home/HeroSection";
import SwapSection from "@/shared/components/home/SwapSection";

const HomePage = () => {
  const { wallet } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (wallet) setOpen(false);
  }, [wallet]);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 px-4 py-20 relative overflow-y-auto sm:overflow-hidden overflow-x-hidden">
      <Background />
      <HeroSection />
      <SwapSection
        isHasWallet={!!wallet}
        open={open}
        setOpen={setOpen}
        navigate={navigate}
      />
    </div>
  );
};

export default HomePage;
