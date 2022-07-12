import { useState } from "react";
import SignUpForm from "./SignUpForm";
import { SignModal } from '../../context/SignupModal';

function SignUpModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className="create__button" onClick={() => setIsOpen(true)}>Create new account</button>
            {isOpen && (
                <SignModal onClose={() => setIsOpen(false)} >
                    <SignUpForm isOpen={isOpen} setIsOpen={setIsOpen} />
                </SignModal>
            )}
        </div>
    )
}

export default SignUpModal;
