import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface PropTypes {
  type: 'submit' | 'button',
  children: ReactNode,
  className?: string,
  fullWidth?: boolean,
  onClick?: () => void
}

const Button = (props: PropTypes) => {
  const {type = 'submit', children, className = '', fullWidth = false, onClick} = props;
  const combinedClassName = `${styles.button} ${fullWidth ? styles.fullWidth : ''} ${className}`.trim();
  return (
    <button type={type} className={combinedClassName}  onClick={onClick}>
      {children}
    </button>
  )
};

export default Button;