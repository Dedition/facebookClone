import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "../../store/post";

function CreatePostForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    let roomUrl = window.location.pathname;
    // let room = roomUrl.split("/")[2];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const validationErrors = [];

        if (roomUrl === "/home") roomUrl = `profile/${user.id}`;

        if (!content.length || content.trim().length === 0) {
            validationErrors.push("Please write something!");
        }
    };
}
