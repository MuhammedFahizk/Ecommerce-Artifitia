import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export const Button = ({
  className,
  style,
  animateProps,
  onClick,
  disabled,
  type,
  loading,
  children,
}) => {
  const defaultAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.button
      className={`flex items-center justify-center ${className} ${
        loading ? 'cursor-not-allowed' : ''
      }`}
      style={style}
      type={type}
      disabled={disabled || loading}
      initial={animateProps?.initial || defaultAnimation.initial}
      animate={animateProps?.animate || defaultAnimation.animate}
      exit={animateProps?.exit || defaultAnimation.exit}
      transition={animateProps?.transition || defaultAnimation.transition}
      onClick={onClick}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            ease: 'linear',
          }}
          className="w-4 h-4 border-2 border-t-transparent border-white rounded-full"
        />
      ) : (
        children
      )}
    </motion.button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  animateProps: PropTypes.shape({
    initial: PropTypes.object,
    animate: PropTypes.object,
    exit: PropTypes.object,
    transition: PropTypes.object,
  }),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  loading: PropTypes.bool, 
  children: PropTypes.node.isRequired, 
};

Button.defaultProps = {
  className: '',
  style: {},
  animateProps: {},
  onClick: () => {},
  disabled: false,
  type: 'button',
  loading: false,
};
