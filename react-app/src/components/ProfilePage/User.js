import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import { getUserProfile, cleanUserProfile } from '../../store/userprofile';

import { getPosts, cleanPost } from '../../store/post';

import { getAllFriends, getAllSentFQ, getAllReceivedFQ, cleanFriends } from '../../store/friend';

import { getAllUsers, cleanUsers } from '../../store/users';
