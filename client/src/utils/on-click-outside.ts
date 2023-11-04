import useOnclickOutside from 'react-cool-onclickoutside';

export const onClickOutside = (modalId: string, setOpenMenu: (newState: boolean) => void) => useOnclickOutside((event: Event) => {
  let shouldModalClose = true;
  let node = event.target as HTMLElement;

  while (node.parentNode != null) {
    if (node.id === modalId) {
      shouldModalClose = false;
    }

    node = node.parentNode as HTMLElement;
  }

  if (shouldModalClose) {
    setOpenMenu(false);
  }
});
