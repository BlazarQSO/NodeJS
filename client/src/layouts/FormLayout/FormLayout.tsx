import React, { FC, ReactNode } from 'react';
import './FormLayout.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

interface FormLayoutProps {
  title: string;
  isContent: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  onAdditional?: () => void;
  children: ReactNode;
  titleClick?: string;
  titleCancel?: string;
  titleAdditional?: string;
  CloseIcon?: React.FC;
}

export const FormLayout: FC<FormLayoutProps> = ({
  title,
  isContent,
  onCancel,
  onOk,
  onAdditional,
  children,
  titleClick = 'Ok',
  titleCancel = 'Cancel',
  titleAdditional = '',
  CloseIcon,
}: FormLayoutProps): JSX.Element => {
  const classContent = isContent ? '' : 'form-layout__no-content';

  return (
    <form className="form-layout">
      <div className={`
        form-layout__header
        ${onCancel ? 'form-layout__with-cancel' : ''}
        ${classContent}
      `}
      >
        <div className="form-layout__title">{title}</div>
        {onCancel && <Button onClick={onCancel} Icon={CloseIcon} />}
      </div>
      <div className="form-layout__content">
        {children}
      </div>
      <div className={`form-layout__footer ${classContent}`}>
        {onAdditional && (
          <Link to="/register">
            <Button title={titleAdditional} onClick={onAdditional} />
          </Link>
        )}
        {onCancel && <Button title={titleCancel} onClick={onCancel} />}
        {onOk && <Button title={titleClick} onClick={onOk} />}
      </div>
    </form>
  );
};
