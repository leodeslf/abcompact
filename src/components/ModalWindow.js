import { useContext } from "react";
import { ModalWindowContext } from "../ABChoose";

export default function ModalWindow() {
  const { modalWindow, updateModalWindow } = useContext(ModalWindowContext)
  return (
    <div
      className="modal-window"
      onClick={e => {
        if (e.target === e.currentTarget) updateModalWindow(false);
      }}>
      {modalWindow}
    </div>
  );
}
