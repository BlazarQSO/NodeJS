import React, { FC } from 'react';
import './Button.scss';

interface ButtonProps {
  title?: string;
  buttonType?: 'submit' | 'button' | 'reset';
  className?: string;
  Icon?: React.FC;
  disabled?: boolean;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
  title = '',
  buttonType = 'button',
  className = 'primary',
  Icon,
  disabled,
  onClick,
}: ButtonProps): JSX.Element => (
  <button
    type={buttonType}
    onClick={disabled ? null : onClick}
    className={`button ${className} ${Icon ? 'button__with-icon' : ''} ${disabled ? 'button__disabled' : '' }`}
  >
    {!!Icon && <Icon />}
    {title}
  </button>
);
