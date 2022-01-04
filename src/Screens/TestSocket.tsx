import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';
import { onGetSocketRequest } from '../actions/users';
import { useAppDispatch, useAppSelector } from '../hooks';

// Replace this URL with your own socket-io host, or start the backend locally
// const socketEndpoint = 'http://localhost:3000';
const SOCKET_URL = 'http://localhost:3000';
export default function TestSocket() {
	const [hasConnection, setConnection] = useState(false);
	const { data, loading, connected, errorMessage } = useAppSelector(
		(state) => state.socket
	);

	const dispatch = useAppDispatch();
	//console.log({ errorMessage });

	//const [time, setTime] = useState(null);

	// useEffect(function didMount() {
	// 	const socket = io(SOCKET_URL, {
	// 		transports: ['websocket'],
	// 	});

	// 	socket.io.on('open', () => setConnection(true));
	// 	socket.io.on('close', () => setConnection(false));

	// 	socket.on('time-msg', (data) => {
	// 		setTime(new Date(data.time).toString());
	// 	});

	// 	return function didUnmount() {
	// 		socket.disconnect();
	// 		socket.removeAllListeners();
	// 	};
	// }, []);
	useEffect(() => {
		dispatch(onGetSocketRequest());
		return () => {};
	}, []);
	return (
		<View style={styles.container}>
			{!hasConnection && (
				<>
					<Text style={styles.paragraph}>
						Connecting to {SOCKET_URL}...
					</Text>
					<Text style={styles.footnote}>
						Make sure the backend is started and reachable
					</Text>
				</>
			)}

			{connected && (
				<>
					<Text style={[styles.paragraph, { fontWeight: 'bold' }]}>
						Server time
					</Text>
					<Text style={styles.paragraph}>{data}</Text>
				</>
			)}
			{!!errorMessage && <Text>{errorMessage}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paragraph: {
		fontSize: 16,
	},
	footnote: {
		fontSize: 14,
		fontStyle: 'italic',
	},
});
