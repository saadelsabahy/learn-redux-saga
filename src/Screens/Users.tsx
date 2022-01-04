import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { onGetUserRequest } from '../actions/users';
import { useAppDispatch, useAppSelector } from '../hooks';

interface Props {}

const Users = (props: Props) => {
	const { users, loading, errorMessage } = useAppSelector(
		(state) => state.users
	);
	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	dispatch(onGetUserRequest());
	// 	return () => {};
	// }, []);
	// console.log({ users });

	return (
		<View style={styles.container}>
			{loading && <Text>loading..</Text>}
			{!!errorMessage && <Text>{errorMessage}</Text>}
			{users?.map((user) => {
				return <Text key={user.id}>{user.name}</Text>;
			})}
			<Button
				title='get users'
				onPress={() => dispatch(onGetUserRequest())}
			/>
		</View>
	);
};

export default Users;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
