import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import TestSocket from './src/Screens/TestSocket';
import { store } from './src/store';
export default function App() {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				{/* <Counter /> */}
				{/* <Users /> */}
				<View style={styles.center}>
					<Text>App</Text>
					<TestSocket />
				</View>
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
	center: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
