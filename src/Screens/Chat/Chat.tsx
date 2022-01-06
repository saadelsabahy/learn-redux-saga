import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { sendMessage } from '../../actions/chat';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeDoublicate } from '../../utils/functions';
import { SCREEN_HEIGHT } from './Join';

const Chat = ({ route, navigation }) => {
	const dispatch = useAppDispatch();
	const { userName } = route.params;
	const user = {
		name: userName,
		_id: userName + Math.random().toString(16).slice(2),
	};
	const messages = useAppSelector((state) => state.messages);

	const onSend = useCallback((messages = []) => {
		Keyboard.dismiss();
		dispatch(
			sendMessage({
				value: messages[0].text,
				user: { name: user.name, id: user._id },
			})
		);
	}, []);
	const onLongPress = (_, message) => {
		dispatch();
	};
	const GIFTEDCHAT = (
		<GiftedChat
			messages={removeDoublicate(messages)}
			onSend={onSend}
			user={{ _id: user._id }}
			placeholder='type message here...'
			showUserAvatar
			alwaysShowSend
			scrollToBottom
			onLongPress={onLongPress}
			renderBubble={(props) => {
				return (
					<Bubble
						{...props}
						textStyle={{
							right: {
								color: '#000',
							},
							left: {
								color: '#fff',
							},
						}}
						wrapperStyle={{
							left: {
								backgroundColor: '#234765',
							},
							right: {
								backgroundColor: '#ccc',
							},
						}}
					/>
				);
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
