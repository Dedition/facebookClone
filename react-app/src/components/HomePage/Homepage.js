import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { io } from "socket.io-client";

import { getPosts } from "../../store/post";
import { getAllFriends } from "../../store/friend";
