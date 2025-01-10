// src/components/common/Text.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export const Text = ({ tag: Tag, className, style, animateProps, onClick, children }) => {
  const defaultAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.5 },
  };

  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      initial={animateProps?.initial || defaultAnimation.initial}
      animate={animateProps?.animate || defaultAnimation.animate}
      exit={animateProps?.exit || defaultAnimation.exit}
      transition={animateProps?.transition || defaultAnimation.transition}
      onClick={onClick}
    >
      {children}
    </MotionTag>
  );
};

Text.propTypes = {
  tag: PropTypes.string, 
  className: PropTypes.string,
  style: PropTypes.object,
  animateProps: PropTypes.shape({
    initial: PropTypes.object,
    animate: PropTypes.object,
    exit: PropTypes.object,
    transition: PropTypes.object,
  }),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  tag: 'div', 
  className: '',
  style: {},
  animateProps: {},
  onClick: () => {},
};

