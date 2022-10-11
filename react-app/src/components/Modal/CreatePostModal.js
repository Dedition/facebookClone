import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";

import CreatePostModal from "./CreatePostModal";

function CreatePostButton({ socket }) {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.session.user);

    return (
        <>
            <button className="create__post__button" onClick={() => setShowModal(true)}>
                Create Post
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePostModal socket={socket} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}
