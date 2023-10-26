import React, { ChangeEvent, FC } from 'react';
import './RadioButton.scss';

export interface RadioType {
  name: string;
  id: string;
  value: string;
  label: string;
}

interface RadioButtonProps {
  radioButton: string;
  checked: boolean;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButton: FC<RadioButtonProps> = ({
  radioButton,
  checked,
  name = '',
  onChange,
}: RadioButtonProps): JSX.Element => (
  <label htmlFor={radioButton} className="radio">
    <input
      type="radio"
      className="radio__input"
      id={radioButton}
      value={radioButton}
      onChange={onChange}
      checked={checked}
      name={name}
    />
    <span className="radio__custom" />
    <span className="radio__label">{radioButton}</span>
  </label>
);
