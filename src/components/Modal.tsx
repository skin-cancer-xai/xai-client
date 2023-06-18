import React, { Dispatch, SetStateAction, ReactNode } from "react";
import { AiFillFrown, AiFillSmile, AiOutlineClose } from "react-icons/ai";

interface ModalPropsType {
  setModalOpen: Dispatch<SetStateAction<Number>>;
  children: ReactNode;
}

const Modal = ({ setModalOpen, children }: ModalPropsType) => {
  const onModalClose = () => {
    setModalOpen(0);
  };

  return (
    <div className="Modal flex-center">
      <div className="Modal-wrapper">
        <div className="Modal-close" onClick={onModalClose}>
          <AiOutlineClose size={20} color="black" />
        </div>
        {children === "아직 지원하지 않는 기능입니다." ? (
          <AiFillFrown size={80} color="#B5B5B5" />
        ) : (
          <AiFillSmile size={80} color="#B5B5B5" />
        )}
        <div style={{ marginTop: "15px", fontSize: "15px", fontWeight: 700 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
