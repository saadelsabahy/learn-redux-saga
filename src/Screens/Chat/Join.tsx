import Icon from '@expo/vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	Dimensions,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { disbatch } from 'redux-act';
import { login } from '../../actions/chat';
import { useAppDispatch } from '../../hooks';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
	Dimensions.get('screen');

const Join = ({ navigation }) => {
	const [userName, setUserName] = useState('');
	const [roomName, setRoomName] = useState('');
	const isFocused = useIsFocused();

	const dispatch = useAppDispatch();

	useEffect(() => {
		// socket.on('roomData', ({ room, users }) => {
		// 	console.log('new room');

		// 	navigation.navigate('Chat', { userName, roomName });
		// });
		return () => {
			setUserName('');
			setRoomName('');
		};
	}, [isFocused]);

	const onLoginPressed = async () => {
		dispatch(login({ userName }));
		navigation.navigate('Chat', { userName });
		// socket.emit('join', { username: userName, room: roomName }, (error) => {
		// 	if (error) {
		// 		// alert(error);
		// 		console.log(error);
		// 	}
		// });
	};
	return (
		<View style={styles.container}>
			{/* <Text>Login</Text> */}
			<TextInput
				placeholder='User name'
				style={styles.input}
				value={userName}
				onChangeText={(text) => setUserName(text)}
				autoCapitalize='none'
				autoCorrect={false}
			/>
			{/* <TextInput
				placeholder='Room Name'
				style={styles.input}
				value={roomName}
				onChangeText={(text) => setRoomName(text)}
				autoCapitalize='none'
				autoCorrect={false}
			/> */}
			<View style={styles.buttonContainer}>
				<Pressable
					onPress={onLoginPressed}
					style={({ pressed }) => [
						{
							backgroundColor: pressed ? '#dcf8c6' : '#075e54',
						},
						styles.wrapperCustom,
					]}
				>
					<Icon name='keyboard-arrow-right' color='#fff' size={25} />
				</Pressable>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	buttonContainer: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		width: '90%',
		alignSelf: 'center',
	},
	wrapperCustom: {
		width: 50,
		height: 50,
		borderRadius: 50 / 2,
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: '95%',
		height: SCREEN_HEIGHT / 17,
		borderWidth: 0.5,
		borderRadius: Math.round(SCREEN_WIDTH / 2 + SCREEN_HEIGHT / 2),
		paddingHorizontal: 10,
		borderColor: '#075e54',
		alignSelf: 'center',
		marginBottom: 10,
	},
});

export default Join;
