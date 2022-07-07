import { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

function SignUpModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className="create__button" onClick={() => setIsOpen(true)}>Create new account</button>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)} >
                    <SignUpForm isOpen={isOpen} setIsOpen={setIsOpen} />
                </Modal>
            )}
        </div>
    )
}

export default SignUpModal;
