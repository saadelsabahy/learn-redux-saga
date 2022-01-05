import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { io, Socket } from 'socket.io-client';
interface useSocketProps {
	url: string;
}

const useSocket = ({ url }: useSocketProps) => {
	const socket: Socket = io(url, {
		// transports: ['websocket'],
	});

	useEffect(() => {
		socket.on('connection', () => {
			//socket.connect();
			console.log('chat socket connected');
		});
		socket.on('disconnect', () => {
			socket.connect();
			console.log('chat socket disconnected');
		});
		return () => {};
	}, [socket]);
	return socket;
};

export default useSocket;
