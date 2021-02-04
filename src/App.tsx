import React from 'react';
import Router from './Router';
import './App.css';
import { useDispatch } from 'react-redux';
import { connectToServer } from './web-socket/actions';

const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
const socketUrl = `${protocol}://localhost:8000`;

export default function App() {
	const dispatch = useDispatch();
	dispatch(connectToServer(socketUrl));

	return <Router />;
}
