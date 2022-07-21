import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './index.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button className={className ? styles[className] : 'button'} {...props}>
      {children}
    </button>
  );
};

export default Button;
