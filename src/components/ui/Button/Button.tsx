import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface PropTypes {
  type: 'submit' | 'button',
  children: ReactNode,
  className?: string,
  fullWidth?: boolean
}

const Button = (props: PropTypes) => {
  const {type = 'submit', children, className = '', fullWidth = false} = props;
  const combinedClassName = `${styles.button} ${fullWidth ? styles.fullWidth : ''} ${className}`.trim();
  return (
    <button type={type} className={combinedClassName} >
      {children}
    </button>
  )
};

export default Button;