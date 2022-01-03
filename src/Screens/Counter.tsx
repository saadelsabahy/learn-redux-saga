import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { onDecrement, onIncrement } from '../actions/counter';
import { useAppDispatch, useAppSelector } from '../hooks';

interface Props {}

const Counter = (props: Props) => {
	const { counter } = useAppSelector((state) => state.counter);
	const dispatch = useAppDispatch();

	return (
		<View style={styles.container}>
			<Text>{counter}</Text>
			<View style={styles.buttonsContainer}>
				<Pressable
					style={styles.button}
					onPress={() => dispatch(onIncrement())}
				>
					<Text>increment</Text>
				</Pressable>
				<Pressable
					style={styles.button}
					onPress={() => dispatch(onDecrement())}
				>
					<Text>decrement</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Counter;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonsContainer: {
		//flex: 1,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	button: {
		backgroundColor: '#cdc',
		padding: 10,
	},
});
