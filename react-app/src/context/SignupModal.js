import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./SignupModal.css";

const ModalContext = React.createContext();

export function SignupModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function SignModal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="signup-modal">
            <div id="signupModal-background" onClick={onClose} />
            <div id="signupModal-content">{children}</div>
        </div>,
        modalNode
    );
}
