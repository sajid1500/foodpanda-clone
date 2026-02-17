"use client";

import { motion, Variants } from "framer-motion";

function LoadingThreeDotsJumping({
  size = 2,
  className,
}: {
  size: number;
  className: string;
}) {
  const dotVariants: Variants = {
    jump: {
      transform: "translateY(-10px)",
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  };

  const dotStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    backgroundColor: "#ff0088",
    willChange: "transform",
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      style={containerStyle}
      className={className}
    >
      <motion.div style={dotStyle} variants={dotVariants} />
      <motion.div style={dotStyle} variants={dotVariants} />
      <motion.div style={dotStyle} variants={dotVariants} />
    </motion.div>
  );
}

export default LoadingThreeDotsJumping;
