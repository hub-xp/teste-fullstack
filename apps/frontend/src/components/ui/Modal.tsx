"use client";

import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-transparent bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 w-full max-w-md rounded-xl shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
