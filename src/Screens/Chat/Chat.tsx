import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { SOCKET_URL } from '../../constants';
import useSocket from '../../hooks/useSocket';
import { SCREEN_HEIGHT } from './Join';
const message = 'test';
const Chat = ({ route, navigation }) => {
	const { userName } = route.params;
	const isFocused = useIsFocused();
	const [messages, setmessages] = useState([]);
	const socket = useSocket({ url: SOCKET_URL });
	useEffect(() => {
		if (isFocused) {
			socket.emit('sendMessage', message, (error) => {
				if (error) {
					return console.log(error);
				} else {
					console.log('Message delivered!');
				}
			});
			// HandleMessages.get((message) =>
			// 	setmessages((prev) => GiftedChat.append(prev, message))
			// );
		}
		return () => {
			// HandleMessages.off();
		};
	}, [isFocused]);
	const onSend = () => {
		console.log('hello from on send');
	};
	const GIFTEDCHAT = (
		<GiftedChat
			messages={messages}
			onSend={onSend}
			user={{
				name: userName,
				_id: 1,
			}}
		/>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text>{userName}</Text>
			</View>
			{GIFTEDCHAT}
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: '#fff',
	},
	header: {
		height: SCREEN_HEIGHT / 10,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 1,
		borderBottomWidth: 0.5,
		borderBottomColor: '#888',
	},
});
export default Chat;
