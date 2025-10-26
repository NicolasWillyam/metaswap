import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useWindowSize } from "../hooks/useWindowSize";
import { getStaggeredRandomPositions } from "../helpers/getStaggeredRandomPositions";
import { TOKENS } from "../constants/tokens";
import { setSelectedToken } from "../store/tokenSlice";

const Background = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  const positions = useMemo(() => {
    if (width && height)
      return getStaggeredRandomPositions(TOKENS.length, width, height);
    return [];
  }, [width, height]);

  if (!width || !height) return null;

  return (
    <div>
      {TOKENS.map((token, i) => {
        const pos = positions[i];
        if (!pos) return null;

        const delay = `${Math.random() * 3}s`;
        const duration = `${3 + Math.random() * 3}s`;
        const floatType =
          Math.random() > 0.5 ? "fadeInFloat" : "fadeInFloatAlt";

        return (
          <div
            key={token.symbol}
            className="absolute flex transition-all duration-500 ease-out group cursor-pointer"
            style={{
              top: pos.top,
              left: pos.left,
              animationName: floatType,
              animationDuration: duration,
              animationDelay: delay,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          >
            <div className="w-fit h-fit p-2 group-hover:border rounded-full group-hover:border-muted-foreground/20">
              <div className="w-fit h-fit p-3 group-hover:border rounded-full group-hover:border-muted-foreground/30">
                <img
                  onClick={() => dispatch(setSelectedToken(token as any))}
                  src={token.image}
                  alt={token.symbol}
                  className="size-16 sm:size-20 md:size-22 lg:size-24 opacity-40 blur-sm rounded-full group-hover:blur-none group-hover:opacity-100 group-hover:rotate-30 group-hover:scale-110 transition-all duration-300 ease-out"
                />
              </div>
            </div>

            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-center">
              <p className="font-semibold">{token.symbol}</p>
              <div className="flex gap-1 text-sm font-semibold">
                <p
                  className={
                    token.changePercent >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  ${token.priceUsd.toLocaleString()}
                </p>
                <p
                  className={
                    token.changePercent >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  ({token.changePercent}%)
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Background;
