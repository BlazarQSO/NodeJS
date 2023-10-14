import React, { FC } from 'react';
import './Button.scss';

interface ButtonProps {
  title?: string;
  buttonType?: 'submit' | 'button' | 'reset';
  className?: string;
  Icon?: React.FC;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
  title = '',
  buttonType = 'button',
  className = 'primary',
  Icon,
  onClick,
}: ButtonProps): JSX.Element => (
  <button
    type={buttonType}
    onClick={onClick}
    className={`button ${className} ${Icon ? 'button__with-icon' : ''}`}
  >
    {!!Icon && <Icon />}
    {title}
  </button>
);
