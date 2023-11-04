import React, { SyntheticEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { onClickOutside } from '../../../utils';
import { COMPONENT_PORTAL_ID, MODAL_ID } from '../../../constants/modal-window';

interface ComponentPortalProps {
  children: JSX.Element;
  closeFunc?: (event?: SyntheticEvent) => void;
  setOpenPanel?: (isOpen: boolean) => void;
}

export const ComponentPortal: React.FC<ComponentPortalProps> = ({
  children,
  closeFunc = () => undefined,
  setOpenPanel = () => undefined,
}: ComponentPortalProps): JSX.Element | null => {
  let instance = document.getElementById(MODAL_ID);

  if (instance == null) {
    instance = document.createElement('div');
    instance.setAttribute('id', MODAL_ID);
    document.body.appendChild(instance);
  }

  const [isOpenMenu, setIsOpenMenu] = useState(true);

  const setMenuState = (newState: boolean): void => {
    setIsOpenMenu(newState);
    setOpenPanel(newState);
  };
  const ref = onClickOutside(COMPONENT_PORTAL_ID, setMenuState);

  useEffect(() => {
    if (!isOpenMenu) {
      closeFunc();
    }
  }, [isOpenMenu]);

  return isOpenMenu ? <div ref={ref}>{ReactDOM.createPortal(children, instance)}</div> : null;
};
