import { ArrowDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedToken, setSwappedToken } from "@/shared/store/tokenSlice";
import { motion, useAnimation } from "framer-motion";
import type { RootState } from "@/shared/store";

const SwapButton = () => {
  const dispatch = useDispatch();
  const controls = useAnimation();

  const selectedToken = useSelector(
    (state: RootState) => state.token.selectedToken
  );
  const swappedToken = useSelector(
    (state: RootState) => state.token.swappedToken
  );

  const handleSwap = async () => {
    // Animation before swap
    await controls.start({
      rotate: 360,
      transition: { duration: 0.4, ease: "easeInOut" },
    });

    // Reset rotation to 0
    controls.set({ rotate: 0 });

    // Swap tokens in Redux
    if (selectedToken && swappedToken) {
      dispatch(setSelectedToken(swappedToken as any));
      dispatch(setSwappedToken(selectedToken as any));
    }
  };

  return (
    <div className="flex items-center justify-center -mt-3 mb-1 relative">
      <motion.div
        animate={controls}
        whileHover={{ scale: 1.1, rotate: -180 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSwap}
        className="h-12 w-12 cursor-pointer rounded-full bg-muted border-[#0a0a0a] border-5 absolute  z-1 mx-auto  flex items-center justify-center"
      >
        <ArrowDown size={20} className="text-foreground" />
      </motion.div>
    </div>
  );
};

export default SwapButton;
