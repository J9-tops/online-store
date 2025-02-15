"use client";
import { useEffect, useState } from "react";

type Props = {
  prev: number;
  current: number;
};

const ProgressBar = ({ prev, current }: Props) => {
  const [width, setWidth] = useState<number>(prev);

  useEffect(() => {
    const timeout = setTimeout(() => setWidth(current), 100);
    return () => clearTimeout(timeout);
  }, [current]);
  return (
    <span className="bg-bgGreen h-1 w-full overflow-hidden">
      <span
        className="bg-subGreen block h-full transition-all duration-500"
        style={{ width: `${width}%` }}
      ></span>
    </span>
  );
};

export default ProgressBar;
