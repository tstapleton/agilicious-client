import React from 'react';
import Router from './Router';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { connectToServer } from './web-socket/actions';
import { selectIsOpen } from './web-socket/selectors';

const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
const socketUrl = `${protocol}://${process.env.REACT_APP_BASE_URL}`;

export default function App() {
	const isOpen = useSelector(selectIsOpen);
	const dispatch = useDispatch();

	// this was added to try to remove double event dispatches, but that turned out
	// to be caused by React.StrictMode in index.js - so maybe this can be removed
	if (!isOpen) {
		dispatch(connectToServer(socketUrl));
		console.log('Not open yet');
		return <h1>Loading...</h1>;
	}

	return <Router />;
}
