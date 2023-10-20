import { ChangeEvent } from 'react';

export interface InputTextProps {
  placeholder?: string;
  defaultValue?: string;
  formValue?: string;
  label?: string;
  className?: string;
  isDisabled?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface InputValues {
  label: string;
  value: string;
  isDisabled?: boolean;
}
