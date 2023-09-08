import type { ReactNode } from "react";

type ModalProps = {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({
  title,
  children,
  isOpen,
  onClose,
}: ModalProps) {
  return (
    <div className={"modal-container" + (isOpen ? "" : " modal-close")}>
      <div className="modal">
        <div className="flex w-full justify-between">
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
          <button className="modal-close-button" onClick={onClose}>
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
