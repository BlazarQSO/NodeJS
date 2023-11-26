import React, { ChangeEvent, FC } from 'react';
import './RadioButtons.scss';
import { RadioButton, RadioType } from './RadioButton/RadioButton';

interface RadioButtonsProps {
  radioButtons: string[];
  checkedValue: string;
  title?: string;
  name?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButtons: FC<RadioButtonsProps> = ({
  radioButtons,
  checkedValue,
  title = '',
  name = '',
  onChange,
}: RadioButtonsProps): JSX.Element => (
  <div className="radio-buttons">
    <div className="radio-buttons__title">{title}</div>
    {
      radioButtons.map((radioButton: string, index: number) => (
        <RadioButton
          key={index}
          radioButton={radioButton}
          checked={radioButton === checkedValue}
          onChange={onChange}
          name={name}
        />
      ))
    }
  </div>
);
