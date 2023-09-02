import { PropsWithChildren, useEffect, useLayoutEffect, useRef } from "react";

export const Modal: React.FC<
  PropsWithChildren<{ isOpen: boolean; onClose: () => void }>
> = ({ children, isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target === dialogRef.current) {
        dialogRef.current?.close();
      }
    };

    dialogRef.current?.addEventListener("click", onClick);
    return () => dialogRef.current?.removeEventListener("click", onClick);
  }, [dialogRef]);

  return (
    <dialog
      className="max-w-md rounded bg-black bg-opacity-90 backdrop-blur-sm"
      onClose={onClose}
      ref={dialogRef}
    >
      <div className="p-8">{children}</div>
    </dialog>
  );
};
