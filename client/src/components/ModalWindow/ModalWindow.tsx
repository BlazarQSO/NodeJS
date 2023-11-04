import React from 'react';
import { InputText } from '../InputText/InputText';
import { FormLayout } from '../../layouts/FormLayout/FormLayout';
import { ModalWrapper } from './ModalWrapper/ModalWindow';
import './ModalWindow.scss';
import { InputValues } from '../InputText/InputText.types';

interface ModalWindowProps {
  isOpenWindow: boolean;
  modalTitle: string;
  CloseIcon?: React.FC;
  inputsValues?: InputValues[];
  disabled?: boolean;
  onClose: () => void;
  onOk: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  isOpenWindow,
  modalTitle,
  CloseIcon,
  inputsValues,
  disabled,
  onClose,
  onOk,
  onChange,
}): JSX.Element => {
  const isContent = inputsValues.length > 0;

  return (
    <>
      {
      isOpenWindow && (
        <ModalWrapper onClose={onClose}>
          <FormLayout
            CloseIcon={CloseIcon}
            title={modalTitle}
            onCancel={onClose}
            onOk={onOk}
            isContent={isContent}
          >
            {
              inputsValues.map(({ label, value, isDisabled }, index) => (
                <InputText
                  key={index}
                  label={label}
                  placeholder={label}
                  onChange={onChange}
                  formValue={value}
                  isDisabled={disabled || isDisabled}
                />
              ))
            }
          </FormLayout>
        </ModalWrapper>
      )
    }
    </>
  );
};
