import React, { ChangeEvent, FC, useState } from 'react';
import './InputText.scss';
import { InputTextProps } from './InputText.types';

export const InputText: FC<InputTextProps> = ({
  placeholder = '',
  defaultValue = '',
  formValue,
  label = '',
  className = '',
  isDisabled = false,
  name = '',
  onChange,
}: InputTextProps): JSX.Element => {
  const [value, setValue] = useState(defaultValue);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="input-text">
      <div className="input-text__label">
        {label}
        :
        {' '}
      </div>
      <input
        className={`input-text__input ${className} ${isDisabled ? 'input-text__input_disabled' : ''}`}
        placeholder={placeholder}
        value={formValue === undefined ? value : formValue}
        onChange={onChange || changeHandler}
        name={name || label.toLowerCase()}
        disabled={isDisabled}
      />
    </div>
  );
};
