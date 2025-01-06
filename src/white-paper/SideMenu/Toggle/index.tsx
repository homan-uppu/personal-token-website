"use client";

import { motion } from "framer-motion";
import styles from "./Toggle.module.css";

type ToggleProps = {
  onClick: () => void;
};

export default function Toggle({ onClick }: ToggleProps) {
  return (
    <div className={styles.container}>
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.09091 2.4091H1.45455V12.5909H5.09091V2.4091ZM6.54545 2.4091V12.5909H14.5455V2.4091H6.54545ZM1.32231 0.954559H14.6777C15.408 0.954559 16 1.60578 16 2.4091V12.5909C16 13.3942 15.408 14.0455 14.6777 14.0455H1.32231C0.59202 14.0455 0 13.3942 0 12.5909V2.4091C0 1.60578 0.59202 0.954559 1.32231 0.954559Z"
          fill="black"
          fillOpacity="0.5"
        />
      </svg>
    </div>
  );
}
