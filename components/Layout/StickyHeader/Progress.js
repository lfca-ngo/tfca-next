import React from "react";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0 },
  visible: (i) => {
    return {
      pathLength: i,
    };
  },
};

const Progress = (props) => {
  const pathStep = props.step / props.total;
  if (props.step === 0) return null;
  return (
    <div className="progress-element">
      <svg width="27px" height="27px" viewBox="0 0 27 27" version="1.1">
        <title>Progress</title>
        <g
          id="Initial-Flow"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="energy-2-copy"
            transform="translate(-292.000000, -56.000000)"
            strokeWidth="2.4"
          >
            <g id="Group-2" transform="translate(294.000000, 58.000000)">
              <path
                d="M11.5,23 C17.8512746,23 23,17.8512746 23,11.5 C23,5.14872538 17.8512746,0 11.5,0 C5.14872538,0 0,5.14872538 0,11.5 C0,17.8419032 5.13354244,22.9848032 11.4718935,22.9999664 C17.8166972,23.0152122 5.15517806,23 11.5,23 Z"
                id="Oval"
                stroke="#D4D4D4"
              ></path>
              <motion.path
                initial="hidden"
                animate={"visible"}
                variants={draw}
                custom={pathStep}
                d="M11.5,23 C17.8512746,23 23,17.8512746 23,11.5 C23,5.14872538 17.8512746,0 11.5,0 C5.14872538,0 0,5.14872538 0,11.5 C0,17.8419032 5.13354244,22.9848032 11.4718935,23"
                id="Oval"
                stroke="#1F335E"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Progress;
