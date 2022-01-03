import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Counter from './src/Screens/Counter';
import Users from './src/Screens/Users';
import { store } from './src/store';

export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				{/* <Counter /> */}
				<Users />
				<StatusBar style='auto' />
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
});
