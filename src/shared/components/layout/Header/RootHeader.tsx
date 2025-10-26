import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import type { RootState } from "@/shared/store";
import { logout } from "@/shared/store/authSlice";
import WalletSection from "./WalletSection";

const RootHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { wallet } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Close dropdown on route change
    setOpen(false);
  }, [location.pathname]);

  const handleDisconnect = () => {
    setOpen(false);
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className="w-full fixed top-0 z-10 p-4 h-16 flex justify-between items-center bg- backdrop-blur-lg">
      {/* Logo section */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img src="/meta-logo.png" alt="logo" className="h-6" />
        <p className="text-xl font-semibold">METASWAP</p>
      </div>

      {/* Wallet + Settings Section */}
      <WalletSection
        wallet={wallet}
        open={open}
        setOpen={setOpen}
        onDisconnect={handleDisconnect}
      />
    </div>
  );
};

export default RootHeader;
