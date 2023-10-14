import { ChangeEvent, useState } from 'react';

export const useForm = <T>(defaultState: T): [
  T,
  (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<T>>,
] => {
  const [form, setForm] = useState(defaultState);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log('form: ', { ...form, [event.target.name]: event.target.value });
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return [form, changeHandler, setForm];
};
