"use client";
import { useEffect, useState } from "react";

type Props = {
  prev: number;
  current: number;
};

const ProgressBar = ({ prev, current }: Props) => {
  const [width, setWidth] = useState<number>(prev);

  useEffect(() => {
    setTimeout(() => setWidth(current), 50);
  }, [current]);

  return (
    <span className="bg-red-500 h-2 w-full overflow-hidden">
      <span
        className="bg-blue-500 block h-full transition-all duration-500"
        style={{ width: `${width}%` }}
      ></span>
    </span>
  );
};

export default ProgressBar;
