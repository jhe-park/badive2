'use client';

import { motion } from 'framer-motion';
import React from 'react';

const SlideUp = ({ children, id = 1, className = '' }) => {
  const slideLeftVariants = {
    offscreen: {
      y: 80,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: id === 1 ? 0 : 0.1 * id,
      },
    },
  };
  return (
    <motion.div variants={slideLeftVariants} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0 }} className={`w-full ${className}`}>
      {children}
    </motion.div>
  );
};

export default SlideUp;
