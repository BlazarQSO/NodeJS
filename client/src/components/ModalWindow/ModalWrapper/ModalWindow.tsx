import React, { SyntheticEvent } from 'react';
import { ComponentPortal } from '../ComponentPortal/ComponentPortal';
import { COMPONENT_PORTAL_ID } from '../../../constants/modal-window';
import './ModalWrapper.scss';

interface ModalWrapperProps {
  children: JSX.Element;
  onClose: () => void;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  onClose,
  children,
}): JSX.Element => (
  <ComponentPortal
    closeFunc={(event: SyntheticEvent) => {
      event?.stopPropagation();
    }}
    setOpenPanel={onClose}
  >
    <div className="modal-window">
      <div id={COMPONENT_PORTAL_ID} className="modal-window__wrapper">
        {children}
      </div>
    </div>
  </ComponentPortal>
);
