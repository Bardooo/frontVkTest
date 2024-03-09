import React from 'react';
import { Transition } from 'react-transition-group';
import closeImg from '../assets/img/close.svg';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void,
  info: User[];
};

interface User {
  first_name: string;
  last_name: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, info }) => {
  const onWrapperClick = (event) => {
    if (event.target.classList.contains('modal-wrapper')) onClose();
  };

  return (
    <>
      <Transition in={isOpen} timeout={350} unmountOnExit={true}>
        {(state) => (
          <div className={`modal modal--${state}`}>
            <div className="modal-wrapper" onClick={onWrapperClick}>
              <div className="modal-content">
                <button className="modal-close-btn" onClick={() => onClose()}>
                  <img src={closeImg} alt="close-img" />
                </button>
                <h4 className="users-friends">Друзья</h4>
                {info.map((item, index) => (
                  <div className="user" key={index}>
                    <p className="user-name">{item.first_name}</p>
                    <p className="user-name">{item.last_name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

export default Modal;
